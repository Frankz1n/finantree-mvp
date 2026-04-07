import { supabase } from '@/lib/supabase';

export const TransactionService = {
    getCategories: async (type: 'income' | 'expense', userId: string) => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .eq('type', type)
                .eq('user_id', userId);

            if (error) throw error;

            return (data || []).map(c => ({ ...c, icon: '🏷️' }));
        } catch (err) {
            console.error('Error fetching categories:', err);
            return [];
        }
    },

    createCategory: async (userId: string, name: string, type: 'income' | 'expense') => {
        const { data, error } = await supabase
            .from('categories')
            .insert([{ user_id: userId, name, type }])
            .select()
            .single();

        if (error) throw error;
        return { ...data, icon: '🏷️' };
    },

    createTransaction: async (payload: any) => {
        const { data, error } = await supabase
            .from('transactions')
            .insert([payload])
            .select();

        if (error) throw error;
        return data;
    },

    updateTransaction: async (id: string, payload: any) => {
        const { data, error } = await supabase
            .from('transactions')
            .update(payload)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data;
    }
};
