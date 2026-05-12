import { supabase } from '@/lib/supabase'
import type { Goal, GoalInsert, GoalUpdate } from '@/types/goals'

function toNumber(value: unknown): number {
  if (typeof value === 'number' && !Number.isNaN(value)) return value
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

function mapGoalRow(row: Record<string, unknown>): Goal {
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    name: String(row.name ?? ''),
    target_amount: toNumber(row.target_amount),
    current_amount: toNumber(row.current_amount),
    deadline: row.deadline == null ? null : String(row.deadline),
    is_completed: Boolean(row.is_completed),
    created_at: String(row.created_at ?? ''),
  }
}

function roundMoney(n: number): number {
  return Math.round(n * 100) / 100
}

/** `goals.user_id` = `auth.uid()` (igual a `transactions.user_id` / `useAuth().user.id`). Confirmar na BD que `public.users.id` segue o mesmo UUID. */
export const GoalsService = {
  async listGoalsForUser(userId: string): Promise<Goal[]> {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('GoalsService.listGoalsForUser:', error)
      throw error
    }

    return (data ?? []).map((row) => mapGoalRow(row as Record<string, unknown>))
  },

  async createGoal(payload: GoalInsert): Promise<Goal> {
    const insertRow = {
      user_id: payload.user_id,
      name: payload.name.trim(),
      target_amount: roundMoney(payload.target_amount),
      current_amount: roundMoney(payload.current_amount ?? 0),
      deadline: payload.deadline ?? null,
      is_completed: payload.is_completed ?? false,
    }

    const { data, error } = await supabase.from('goals').insert([insertRow]).select('*').single()

    if (error) {
      console.error('GoalsService.createGoal:', error)
      throw error
    }

    return mapGoalRow(data as Record<string, unknown>)
  },

  async updateGoal(goalId: string, patch: GoalUpdate): Promise<Goal> {
    const row: Record<string, unknown> = {}

    if (patch.name !== undefined) row.name = patch.name.trim()
    if (patch.target_amount !== undefined) row.target_amount = roundMoney(patch.target_amount)
    if (patch.current_amount !== undefined) row.current_amount = roundMoney(patch.current_amount)
    if (patch.deadline !== undefined) row.deadline = patch.deadline
    if (patch.is_completed !== undefined) row.is_completed = patch.is_completed

    if (Object.keys(row).length === 0) {
      const { data: existing, error: fetchErr } = await supabase
        .from('goals')
        .select('*')
        .eq('id', goalId)
        .single()
      if (fetchErr) throw fetchErr
      return mapGoalRow(existing as Record<string, unknown>)
    }

    const { data, error } = await supabase.from('goals').update(row).eq('id', goalId).select('*').single()

    if (error) {
      console.error('GoalsService.updateGoal:', error)
      throw error
    }

    return mapGoalRow(data as Record<string, unknown>)
  },

  /**
   * Soma `delta` ao saldo atual (positivo = depósito, negativo = retirada).
   * Valor mínimo 0. Atualiza `is_completed` quando `current_amount >= target_amount`.
   */
  async adjustCurrentAmount(goal: Goal, delta: number): Promise<Goal> {
    const target = roundMoney(goal.target_amount)
    const nextRaw = roundMoney(goal.current_amount + delta)
    const next = Math.max(0, nextRaw)
    const is_completed = next >= target

    return GoalsService.updateGoal(goal.id, {
      current_amount: next,
      is_completed,
    })
  },

  async deleteGoal(goalId: string): Promise<void> {
    const { error } = await supabase.from('goals').delete().eq('id', goalId)
    if (error) {
      console.error('GoalsService.deleteGoal:', error)
      throw error
    }
  },
}
