import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type PublicUserProfileRow = {
  full_name?: string | null;
  name?: string | null;
  display_name?: string | null;
};

function pickFirstNonEmpty(...candidates: (string | null | undefined)[]): string | null {
  for (const candidate of candidates) {
    if (typeof candidate !== 'string') continue;
    const trimmed = candidate.trim();
    if (trimmed.length > 0) return trimmed;
  }
  return null;
}

export async function getCurrentUserProfile(userId: string): Promise<PublicUserProfileRow | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('getCurrentUserProfile:', error);
    return null;
  }
  if (!data || typeof data !== 'object') return null;
  return data as PublicUserProfileRow;
}

export function buildGreetingDisplayName(
  user: User,
  profile: PublicUserProfileRow | null,
  fallbackLabel: string,
): string {
  const meta = user.user_metadata ?? {};
  return (
    pickFirstNonEmpty(
      profile?.full_name,
      profile?.name,
      profile?.display_name,
      meta.full_name as string | undefined,
      meta.name as string | undefined,
      meta.first_name as string | undefined,
      user.email?.split('@')[0],
    ) ?? fallbackLabel
  );
}
