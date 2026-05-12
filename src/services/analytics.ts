import { supabase } from '@/lib/supabase'

export type CategorySlice = {
  name: string
  value: number
  color: string
}

const DONUT_PALETTE = [
  '#00C980',
  '#6366f1',
  '#f59e0b',
  '#ef4444',
  '#06b6d4',
  '#8b5cf6',
  '#ec4899',
  '#84cc16',
  '#14b8a6',
  '#f97316',
]

type TxRow = {
  amount: number
  type: 'income' | 'expense'
  category_id: string | null
  categories: { name?: string | null; color?: string | null } | null
}

function monthBounds(month: Date): { start: string; end: string } {
  const start = new Date(month.getFullYear(), month.getMonth(), 1).toISOString()
  const end = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999).toISOString()
  return { start, end }
}

function aggregateByCategory(
  rows: TxRow[],
  transactionType: 'income' | 'expense',
  unlabeledName: string,
): CategorySlice[] {
  const map = new Map<string, { label: string; total: number; color: string | null }>()
  let paletteIdx = 0

  for (const row of rows) {
    if (row.type !== transactionType) continue
    const amount = Math.abs(Number(row.amount) || 0)
    if (amount <= 0) continue

    const key = row.category_id ?? '__uncategorized__'
    const label =
      row.categories?.name?.trim() || (row.category_id == null ? unlabeledName : unlabeledName)
    const catColor = row.categories?.color?.trim() || null

    const prev = map.get(key)
    if (prev) {
      map.set(key, {
        label: prev.label,
        total: prev.total + amount,
        color: prev.color ?? catColor,
      })
    } else {
      map.set(key, { label, total: amount, color: catColor })
    }
  }

  return Array.from(map.values())
    .filter((v) => v.total > 0)
    .map((v) => {
      const fill =
        v.color && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v.color)
          ? v.color
          : DONUT_PALETTE[paletteIdx++ % DONUT_PALETTE.length]
      return {
        name: v.label,
        value: v.total,
        color: fill,
      }
    })
    .sort((a, b) => b.value - a.value)
}

export async function getMonthlyCategoryBreakdown(
  userId: string,
  month: Date,
  unlabeledCategoryLabel: string,
): Promise<{ expenses: CategorySlice[]; incomes: CategorySlice[] }> {
  const { start, end } = monthBounds(month)

  const { data, error } = await supabase
    .from('transactions')
    .select('amount, type, category_id, categories(name, color)')
    .eq('user_id', userId)
    .gte('date', start)
    .lte('date', end)

  if (error) throw error

  const rows = (data ?? []) as TxRow[]
  return {
    expenses: aggregateByCategory(rows, 'expense', unlabeledCategoryLabel),
    incomes: aggregateByCategory(rows, 'income', unlabeledCategoryLabel),
  }
}
