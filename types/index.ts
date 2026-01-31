export type Job = {
    id: string;
    title: string;
    description: string;
    budget: number;
    category: string;
    status: 'open' | 'in-progress' | 'completed';
    created_at: string;
    client_id: string;
    location?: string;
    skills_required?: string[];
    deadline?: string;
};

export type Profile = {
    id: string;
    username: string;
    full_name: string;
    avatar_url?: string;
    bio?: string;
    university?: string;
    role: 'student' | 'client' | 'admin';
    created_at: string;
};

export type Proposal = {
    id: string;
    job_id: string;
    freelancer_id: string;
    cover_letter: string;
    bid_amount: number;
    estimated_days: number;
    status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
    created_at: string;
    profiles?: Profile;
};

export type Notification = {
    id: string;
    user_id: string;
    title: string;
    message: string;
    link?: string;
    is_read: boolean;
    created_at: string;
};
