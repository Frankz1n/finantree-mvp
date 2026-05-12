import styled from 'styled-components'
import { media } from '@/styles/media'

export const PageContainer = styled.div`
  max-width: min(61.25rem, 100%);
  margin: 0 auto;
  padding: 0.75rem 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;

  ${media.md} {
    padding: 1.25rem 1.25rem 1.5rem;
    gap: 1.5rem;
  }
`

export const TopBar = styled.header`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;

  ${media.sm} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
`

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const PageTitle = styled.h1`
  margin: 0;
  color: #0f172a;
  font-size: clamp(1.35rem, 4vw, 1.9rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
`

export const PageSubtitle = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 0.88rem;
  font-weight: 600;
  max-width: 36rem;
`

export const Card = styled.section`
  background: #ffffff;
  border: 1px solid #e8eef5;
  border-radius: 1rem;
  padding: 1rem 0.9rem;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${media.md} {
    padding: 1.15rem 1.1rem;
  }
`

export const CardTitle = styled.h2<{ $variant?: 'expense' | 'income' }>`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ $variant }) => ($variant === 'income' ? '#0d9668' : '#1e293b')};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const ChartWrap = styled.div`
  width: 100%;
  height: 14rem;
  position: relative;

  ${media.sm} {
    height: 15.5rem;
  }
`

export const CenterLabel = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  max-width: 42%;
`

export const CenterLabelSmall = styled.div`
  font-size: 0.65rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`

export const CenterLabelAmount = styled.div`
  font-size: clamp(0.85rem, 3.5vw, 1.05rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.25;
  word-break: break-word;
`

export const LegendList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`

export const LegendRow = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.8125rem;
`

export const LegendLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
  flex: 1;
`

export const LegendSwatch = styled.span<{ $color: string }>`
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  flex-shrink: 0;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 0 2px #fff, 0 0 0 3px ${({ $color }) => $color}33;
`

export const LegendName = styled.span`
  font-weight: 700;
  color: #334155;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const LegendValue = styled.span`
  font-weight: 800;
  color: #0f172a;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`

export const EmptyHint = styled.p`
  margin: 0;
  padding: 1.25rem 0.5rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 600;
`

export const LoadingText = styled.p`
  margin: 0;
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-weight: 600;
`
