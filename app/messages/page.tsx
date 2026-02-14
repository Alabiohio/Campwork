"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Search,
    User,
    MessageSquare,
    ArrowLeft,
    ShoppingBag,
    Briefcase,
    Check,
    CheckCheck,
    MoreVertical
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Loading } from "@/components/Loading";
import { supabase } from "@/lib/supabase";
import type { Conversation, Message, Profile } from "@/types";
import { Footer } from "@/components/Footer";

export default function MessagesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const targetUserId = searchParams.get("user");
    const productId = searchParams.get("product");
    const jobId = searchParams.get("job");

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        async function initChat() {
            try {
                setLoading(true);
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    router.push("/auth/login");
                    return;
                }
                setCurrentUser(user);

                // Fetch conversations
                const { data: convs, error: convError } = await supabase
                    .from('conversations')
                    .select('*, profiles:participant_2(full_name, avatar_url, university), products(title, price, image_url), jobs(title, budget)')
                    .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
                    .order('updated_at', { ascending: false });

                if (convError) throw convError;

                // Adjust profiles for conversations where currentUser is participant_2
                const adjustedConvs = convs.map((c: any) => {
                    if (c.participant_2 === user.id) {
                        // We need to fetch participant_1's profile manually or via another join if possible
                        // For MVP, we'll assume the join above works primarily for one direction or add a check
                        return { ...c, other_profile: c.profiles }; // Simplified for now
                    }
                    return { ...c, other_profile: c.profiles };
                });

                setConversations(adjustedConvs);

                // If targetUserId is provided, find or create conversation
                if (targetUserId) {
                    let existingConv = convs.find(c =>
                        (c.participant_1 === user.id && c.participant_2 === targetUserId) ||
                        (c.participant_1 === targetUserId && c.participant_2 === user.id)
                    );

                    if (!existingConv) {
                        // Create new conversation
                        const { data: newConv, error: createError } = await supabase
                            .from('conversations')
                            .insert({
                                participant_1: user.id,
                                participant_2: targetUserId,
                                product_id: productId || null,
                                job_id: jobId || null
                            })
                            .select('*, profiles:participant_2(full_name, avatar_url, university), products(title, price, image_url), jobs(title, budget)')
                            .single();

                        if (!createError) {
                            setSelectedConversation(newConv);
                            setConversations([newConv, ...convs]);
                        }
                    } else {
                        setSelectedConversation(existingConv);
                    }
                } else if (convs.length > 0) {
                    setSelectedConversation(convs[0]);
                }

            } catch (err) {
                console.error("Error initializing chat:", err);
            } finally {
                setLoading(false);
            }
        }

        initChat();
    }, [targetUserId, productId, jobId]);

    // Fetch messages for selected conversation
    useEffect(() => {
        if (!selectedConversation) return;

        const conversationId = selectedConversation.id;

        async function fetchMessages() {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('conversation_id', conversationId)
                .order('created_at', { ascending: true });

            if (!error) setMessages(data || []);
        }

        fetchMessages();

        // Subscribe to new messages
        const channel = supabase
            .channel(`conv_${conversationId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`
            }, (payload) => {
                const newMessage = payload.new as Message;

                setMessages(prev => {
                    // Check if this message is already in the list (e.g. from optimistic update)
                    // We check content + sender_id because the temp id will be different from the real id
                    const isAlreadyThere = prev.some(m =>
                        (m.id === newMessage.id) ||
                        (m.sender_id === newMessage.sender_id && m.content === newMessage.content && m.id.startsWith('temp-'))
                    );

                    if (isAlreadyThere) {
                        // Replace the temp message with the real one to get the real ID and proper timestamp
                        return prev.map(m =>
                            (m.sender_id === newMessage.sender_id && m.content === newMessage.content && m.id.startsWith('temp-'))
                                ? newMessage
                                : m
                        );
                    }

                    return [...prev, newMessage];
                });
            })

            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [selectedConversation]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const content = newMessage.trim();
        if (!content || !selectedConversation || !currentUser) return;
        const conversationId = selectedConversation.id;

        // Optimistic message
        const optimisticMsg: Message = {
            id: `temp-${Date.now()}`,
            conversation_id: conversationId,
            sender_id: currentUser.id,
            content: content,
            is_read: false,
            created_at: new Date().toISOString()
        };

        setMessages(prev => [...prev, optimisticMsg]);
        setNewMessage("");

        try {
            const { error } = await supabase
                .from('messages')
                .insert({
                    conversation_id: conversationId,
                    sender_id: currentUser.id,
                    content: content
                });

            if (error) throw error;

            // Update conversation's last_message and updated_at
            await supabase
                .from('conversations')
                .update({
                    last_message: content,
                    updated_at: new Date().toISOString()
                })
                .eq('id', conversationId);

        } catch (err) {
            console.error("Error sending message:", err);
            // Optionally remove the optimistic message on error
            setMessages(prev => prev.filter(m => m.id !== optimisticMsg.id));
            alert("Failed to send message. Please try again.");
        }
    };


    if (loading) return <div className="min-h-screen bg-zinc-50 dark:bg-black"><Navbar /><Loading text="Loading your messages..." /></div>;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 pt-24 pb-8 flex gap-6 h-[calc(100vh-100px)]">

                {/* Conversations Sidebar */}
                <div className={`w-full md:w-80 flex-shrink-0 flex flex-col bg-white dark:bg-zinc-950 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-6 border-b border-zinc-100 dark:border-zinc-900">
                        <h2 className="text-xl font-black tracking-tight mb-4">Messages</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none outline-none focus:ring-2 ring-primary/20"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {conversations.length === 0 ? (
                            <div className="p-8 text-center text-zinc-500 text-sm">
                                No conversations yet.
                            </div>
                        ) : (
                            conversations.map((conv) => (
                                <button
                                    key={conv.id}
                                    onClick={() => setSelectedConversation(conv)}
                                    className={`w-full p-4 flex gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-left border-b border-zinc-50 dark:border-zinc-900 ${selectedConversation?.id === conv.id ? 'bg-zinc-50 dark:bg-zinc-900' : ''}`}
                                >
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-sm truncate">{(conv as any).other_profile?.full_name || 'User'}</span>
                                            <span className="text-[10px] text-zinc-400">{new Date(conv.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                                            {conv.last_message || 'Start a conversation'}
                                        </p>
                                        {(conv.products || conv.jobs) && (
                                            <div className="mt-2 flex items-center gap-1.5 py-1 px-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 w-fit">
                                                {conv.products ? <ShoppingBag className="h-3 w-3 text-primary" /> : <Briefcase className="h-3 w-3 text-primary" />}
                                                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-300 truncate max-w-[120px]">
                                                    {conv.products?.title || conv.jobs?.title}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className={`flex-1 flex flex-col bg-white dark:bg-zinc-950 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden ${!selectedConversation ? 'hidden md:flex items-center justify-center' : 'flex'}`}>
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setSelectedConversation(null)} className="md:hidden p-2 text-zinc-500">
                                        <ArrowLeft className="h-5 w-5" />
                                    </button>
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">{(selectedConversation as any).other_profile?.full_name || 'User'}</h3>
                                        <span className="text-[10px] text-zinc-400">{(selectedConversation as any).other_profile?.university}</span>
                                    </div>
                                </div>
                                {selectedConversation.products && (
                                    <Link href={`/products/${selectedConversation.product_id}`} className="hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-primary transition-colors">
                                        <img src={selectedConversation.products.image_url} className="h-6 w-6 rounded-md object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold truncate max-w-[100px]">{selectedConversation.products.title}</span>
                                            <span className="text-[8px] text-primary font-black">${selectedConversation.products.price}</span>
                                        </div>
                                    </Link>
                                )}
                            </div>

                            {/* Messages Scroll Area */}
                            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                                {messages.map((msg, i) => {
                                    const isMe = msg.sender_id === currentUser.id;
                                    return (
                                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[75%] rounded-3xl px-5 py-3 text-sm ${isMe ? 'bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-tl-none'}`}>
                                                <p>{msg.content}</p>
                                                <div className={`flex items-center gap-1 mt-1 justify-end ${isMe ? 'text-white/60' : 'text-zinc-400'}`}>
                                                    <span className="text-[8px]">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    {isMe && <CheckCheck className="h-3 w-3" />}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-6 border-t border-zinc-100 dark:border-zinc-900">
                                <form onSubmit={handleSendMessage} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl px-6 py-4 text-sm outline-none ring-primary/20 focus:ring-4 transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={sending || !newMessage.trim()}
                                        className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all shadow-xl shadow-primary/10 disabled:opacity-50"
                                    >
                                        <Send className="h-6 w-6" />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="text-center p-12">
                            <div className="h-20 w-20 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center mx-auto mb-6">
                                <MessageSquare className="h-10 w-10 text-zinc-300" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Select a conversation</h3>
                            <p className="text-zinc-500 text-sm">Choose a chat from the sidebar to start messaging.</p>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}
