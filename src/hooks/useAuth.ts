import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { AuthService } from '@/services/auth';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const initializeAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        initializeAuth();



        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);


    const handleAuthAction = async (action: () => Promise<any>) => {
        setLoading(true);
        setError(null);
        try {
            await action();
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        error,
        signInWithGoogle: () => handleAuthAction(AuthService.signInWithGoogle),
        signUp: (email: string, pass: string, fullName: string) => handleAuthAction(() => AuthService.signUp(email, pass, fullName)),
        signIn: (email: string, pass: string) => handleAuthAction(() => AuthService.signIn(email, pass)),
        signOut: () => handleAuthAction(AuthService.signOut),
        resetPassword: (email: string) => handleAuthAction(() => AuthService.resetPassword(email)),
        isAuthenticated: !!user,
    };
};
