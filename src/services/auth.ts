import { supabase } from '@/lib/supabase';
import { getSiteOrigin } from '@/lib/site-origin';

function authRedirectBase(): string {
    const origin = getSiteOrigin();
    if (!origin) {
        throw new Error('Não foi possível determinar a URL do app. Defina VITE_SITE_URL ou abra o app no navegador.');
    }
    return origin;
}

export const AuthService = {
    signInWithGoogle: async () => {
        const origin = authRedirectBase();
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${origin}/dashboard`,
            },
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
        const origin = authRedirectBase();
        const { data, error } = await supabase.auth.signUp({
            email,
            password: pass,
            options: {
                emailRedirectTo: `${origin}/login`,
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
        const origin = authRedirectBase();
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${origin}/login`,
        });
        if (error) throw error;
        return data;
    }
};
