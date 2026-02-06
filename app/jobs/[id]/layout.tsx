import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;

    // Fetch job data from Supabase
    const { data: job } = await supabase
        .from('jobs')
        .select('title, description, category')
        .eq('id', id)
        .single();

    if (!job) {
        return {
            title: 'Job Not Found | Campwork',
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${job.title} | Campwork`,
        description: job.description.slice(0, 160),
        openGraph: {
            title: job.title,
            description: job.description.slice(0, 160),
            images: ['/assets/logo1.png', ...previousImages],
        },
    };
}

export default function JobLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
