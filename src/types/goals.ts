/** Linha da tabela `public.goals` (valores numéricos já normalizados). */
export type Goal = {
  id: string
  user_id: string
  name: string
  target_amount: number
  current_amount: number
  deadline: string | null
  is_completed: boolean
  created_at: string
}

export type GoalInsert = {
  user_id: string
  name: string
  target_amount: number
  current_amount?: number
  deadline?: string | null
  is_completed?: boolean
}

export type GoalUpdate = Partial<
  Pick<Goal, 'name' | 'target_amount' | 'current_amount' | 'deadline' | 'is_completed'>
>
