import { supabase } from '@/lib/supabase';

function normalizeTransactionType(value: unknown): 'income' | 'expense' {
    const raw =
        typeof value === 'string' ? value.trim().toLowerCase() : String(value ?? '').trim().toLowerCase();
    if (raw === 'income' || raw === 'receita' || raw === 'entrada') return 'income';
    if (raw === 'expense' || raw === 'despesa' || raw === 'saida' || raw === 'saída') return 'expense';
    throw new Error(`Tipo de transação inválido: "${raw}"`);
}

export const TransactionService = {
    getCategories: async (type: 'income' | 'expense', userId: string) => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('type', type)
            .eq('user_id', userId);

        if (error) throw error;

        return (data || []).map((c) => ({ ...c, icon: '🏷️' }));
    },

    createCategory: async (userId: string, name: string, type: 'income' | 'expense') => {
        const { data, error } = await supabase
            .from('categories')
            .insert([{ user_id: userId, name, type, color: '#64748b' }])
            .select()
            .single();

        if (error) throw error;
        return { ...data, icon: '🏷️' };
    },

    getTransactions: async (userId: string, targetMonth: Date) => {
        const startOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1).toISOString();
        const endOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0, 23, 59, 59, 999).toISOString();

        const { data, error } = await supabase
            .from('transactions')
            .select('*, categories(name)')
            .eq('user_id', userId)
            .gte('date', startOfMonth)
            .lte('date', endOfMonth)
            .order('date', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    createTransaction: async (payload: Record<string, unknown>) => {
        const row = { ...payload };
        if ('type' in row) {
            row.type = normalizeTransactionType(row.type);
        }
        const { data, error } = await supabase.from('transactions').insert([row]).select();

        if (error) throw error;
        return data;
    },

    updateTransaction: async (id: string, payload: Record<string, unknown>) => {
        const row = { ...payload };
        if ('type' in row) {
            row.type = normalizeTransactionType(row.type);
        }
        const { data, error } = await supabase.from('transactions').update(row).eq('id', id).select();

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
