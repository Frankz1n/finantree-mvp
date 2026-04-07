import { supabase } from '@/lib/supabase';

export const AuthService = {
    signInWithGoogle: async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) throw error;
        return data;
    },
    signIn: async (email: string, pass: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: pass,
        });
        if (error) throw error;
        return data;
    },
    signUp: async (email: string, pass: string, fullName: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password: pass,
            options: {
                data: {
                    full_name: fullName,
                }
            }
        });
        if (error) throw error;
        return data;
    },
    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },
    resetPassword: async (email: string) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        return data;
    }
};
