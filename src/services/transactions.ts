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

    getTransactions: async (userId: string, targetMonth: Date) => {
        try {
            const startOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1).toISOString();
            const endOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0, 23, 59, 59, 999).toISOString();

            const { data, error } = await supabase
                .from('transactions')
                .select('*, categories(name, color)')
                .eq('user_id', userId)
                .gte('date', startOfMonth)
                .lte('date', endOfMonth)
                .order('date', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (err) {
            console.error('Error fetching transactions:', err);
            return [];
        }
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
    },

    deleteTransaction: async (id: string) => {
        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
