import { supabase } from '@/lib/supabase';
import type { Job, Product } from '@/types';

export const jobService = {
    async getAll(category?: string, query?: string): Promise<Job[]> {
        let supabaseQuery = supabase
            .from('jobs')
            .select('*')
            .order('created_at', { ascending: false });

        if (category && category !== 'All') {
            supabaseQuery = supabaseQuery.eq('category', category);
        }

        if (query) {
            supabaseQuery = supabaseQuery.ilike('title', `%${query}%`);
        }

        const { data, error } = await supabaseQuery;
        if (error) throw error;
        return data || [];
    },

    async getById(id: string): Promise<Job | null> {
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async create(job: Omit<Job, 'id' | 'created_at' | 'status'>): Promise<Job> {
        const { data, error } = await supabase
            .from('jobs')
            .insert([{ ...job, status: 'open' }])
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};

export const productService = {
    async getAll(category?: string, query?: string): Promise<Product[]> {
        let supabaseQuery = supabase
            .from('products')
            .select('*, profiles(*)')
            .order('created_at', { ascending: false });

        if (category && category !== 'All') {
            supabaseQuery = supabaseQuery.eq('category', category);
        }

        if (query) {
            supabaseQuery = supabaseQuery.ilike('title', `%${query}%`);
        }

        const { data, error } = await supabaseQuery;
        if (error) throw error;
        return data || [];
    },

    async getById(id: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from('products')
            .select('*, profiles(*)')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }
};
