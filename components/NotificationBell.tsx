"use client";

import { useEffect, useState } from "react";
import { Bell, Check, ExternalLink, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Notification } from "@/types";
import Link from "next/link";

export function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(10);

            if (!error && data) {
                setNotifications(data);
                setUnreadCount(data.filter(n => !n.is_read).length);
            }
            setLoading(false);
        };

        fetchNotifications();

        // Real-time subscription
        const subscribeToNotifications = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const channel = supabase
                .channel('realtime_notifications')
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'notifications',
                        filter: `user_id=eq.${user.id}`
                    },
                    (payload) => {
                        const newNotification = payload.new as Notification;
                        setNotifications(prev => [newNotification, ...prev].slice(0, 10));
                        setUnreadCount(prev => prev + 1);
                    }
                )
                .on(
                    'postgres_changes',
                    {
                        event: 'UPDATE',
                        schema: 'public',
                        table: 'notifications',
                        filter: `user_id=eq.${user.id}`
                    },
                    (payload) => {
                        const updatedNotification = payload.new as Notification;
                        setNotifications(prev => prev.map(n => n.id === updatedNotification.id ? updatedNotification : n));
                        // Re-calculate unread count properly if status changes
                        setUnreadCount(prev => {
                            if (updatedNotification.is_read) return Math.max(0, prev - 1);
                            return prev;
                        });
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        };

        const unsubscribe = subscribeToNotifications();
        return () => {
            unsubscribe.then(fn => fn?.());
        };
    }, []);

    const markAsRead = async (id: string) => {
        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', id);

        if (!error) {
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        }
    };

    const markAllAsRead = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', user.id)
            .eq('is_read', false);

        if (!error) {
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            setUnreadCount(0);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative rounded-full border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-colors"
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-4 w-4 -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-lg shadow-primary/20">
                        {unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-80 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 z-50"
                        >
                            <div className="flex items-center justify-between border-b border-zinc-100 p-4 dark:border-zinc-900">
                                <h3 className="text-sm font-bold">Notifications</h3>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-xs font-bold text-primary hover:text-primary/90"
                                    >
                                        Mark all as read
                                    </button>
                                )}
                            </div>

                            <div className="max-h-[400px] overflow-y-auto">
                                {loading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
                                    </div>
                                ) : notifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-500">
                                        <Bell className="mb-2 h-8 w-8 opacity-20" />
                                        <p className="text-sm">No notifications yet</p>
                                    </div>
                                ) : (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`group relative flex flex-col gap-1 border-b border-zinc-50 p-4 transition-colors last:border-0 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-900/50 ${!notification.is_read ? "bg-primary/5 dark:bg-primary/10" : ""
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                                                    {notification.title}
                                                </h4>
                                                {!notification.is_read && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="rounded-full bg-primary/10 p-1 text-primary opacity-0 transition-opacity group-hover:opacity-100 dark:text-primary"
                                                    >
                                                        <Check className="h-3 w-3" />
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                                {notification.message}
                                            </p>
                                            <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400">
                                                <span>{new Date(notification.created_at).toLocaleDateString()}</span>
                                                {notification.link && (
                                                    <Link
                                                        href={notification.link}
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            markAsRead(notification.id);
                                                        }}
                                                        className="flex items-center gap-1 font-bold text-primary hover:underline"
                                                    >
                                                        View <ExternalLink className="h-2 w-2" />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
