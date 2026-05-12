import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { PieChart as PieChartIcon } from 'lucide-react'
import { MonthFilter } from '@/components/ui/MonthFilter/MonthFilter'
import { useAuth } from '@/hooks/useAuth'
import { useMoneyFormat } from '@/hooks/useMoneyFormat'
import { getMonthlyCategoryBreakdown, type CategorySlice } from '@/services/analytics'
import { toast } from 'sonner'
import * as S from './Analytics.styles'

type DonutBlockProps = {
  title: React.ReactNode
  variant: 'expense' | 'income'
  data: CategorySlice[]
  formatMoney: (n: number) => string
  totalLabel: string
  emptyLabel: string
}

function DonutBlock({ title, variant, data, formatMoney, totalLabel, emptyLabel }: DonutBlockProps) {
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data])

  if (data.length === 0) {
    return (
      <S.Card>
        <S.CardTitle $variant={variant}>{title}</S.CardTitle>
        <S.EmptyHint>{emptyLabel}</S.EmptyHint>
      </S.Card>
    )
  }

  return (
    <S.Card>
      <S.CardTitle $variant={variant}>{title}</S.CardTitle>
      <S.ChartWrap>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="82%"
              paddingAngle={2}
              stroke="#fff"
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell key={`${entry.name}-${entry.color}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatMoney(typeof value === 'number' ? value : Number(value) || 0)}
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 24px rgba(15,23,42,0.08)',
              }}
              labelStyle={{ fontWeight: 700, color: '#0f172a' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <S.CenterLabel>
          <S.CenterLabelSmall>{totalLabel}</S.CenterLabelSmall>
          <S.CenterLabelAmount>{formatMoney(total)}</S.CenterLabelAmount>
        </S.CenterLabel>
      </S.ChartWrap>
      <S.LegendList>
        {data.map((slice) => (
          <S.LegendRow key={slice.name}>
            <S.LegendLeft>
              <S.LegendSwatch $color={slice.color} aria-hidden />
              <S.LegendName title={slice.name}>{slice.name}</S.LegendName>
            </S.LegendLeft>
            <S.LegendValue>{formatMoney(slice.value)}</S.LegendValue>
          </S.LegendRow>
        ))}
      </S.LegendList>
    </S.Card>
  )
}

export function Analytics() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const formatMoney = useMoneyFormat()
  const [month, setMonth] = useState(() => new Date())
  const [expenses, setExpenses] = useState<CategorySlice[]>([])
  const [incomes, setIncomes] = useState<CategorySlice[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!user) {
      setExpenses([])
      setIncomes([])
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const { expenses: ex, incomes: inc } = await getMonthlyCategoryBreakdown(
        user.id,
        month,
        t('statements.general'),
      )
      setExpenses(ex)
      setIncomes(inc)
    } catch (e: unknown) {
      const detail =
        e && typeof e === 'object' && 'message' in e && typeof (e as { message: unknown }).message === 'string'
          ? (e as { message: string }).message
          : ''
      toast.error(detail ? `${t('analytics.loadError')}: ${detail}` : t('analytics.loadError'))
      setExpenses([])
      setIncomes([])
    } finally {
      setLoading(false)
    }
  }, [user, month, t])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    const onUpdate = () => {
      void load()
    }
    window.addEventListener('transaction_updated', onUpdate)
    return () => window.removeEventListener('transaction_updated', onUpdate)
  }, [load])

  return (
    <S.PageContainer>
      <S.TopBar>
        <S.TitleBlock>
          <S.PageTitle>{t('analytics.title')}</S.PageTitle>
          <S.PageSubtitle>{t('analytics.subtitle')}</S.PageSubtitle>
        </S.TitleBlock>
        <MonthFilter selectedDate={month} onChange={setMonth} />
      </S.TopBar>

      {loading ? (
        <S.LoadingText>{t('common.loading')}</S.LoadingText>
      ) : (
        <>
          <DonutBlock
            variant="expense"
            title={
              <>
                <PieChartIcon size={18} strokeWidth={2.5} aria-hidden />
                {t('analytics.expensesTitle')}
              </>
            }
            data={expenses}
            formatMoney={formatMoney}
            totalLabel={t('analytics.totalExpenses')}
            emptyLabel={t('analytics.emptyExpenses')}
          />
          <DonutBlock
            variant="income"
            title={
              <>
                <PieChartIcon size={18} strokeWidth={2.5} aria-hidden />
                {t('analytics.incomesTitle')}
              </>
            }
            data={incomes}
            formatMoney={formatMoney}
            totalLabel={t('analytics.totalIncomes')}
            emptyLabel={t('analytics.emptyIncomes')}
          />
        </>
      )}
    </S.PageContainer>
  )
}
