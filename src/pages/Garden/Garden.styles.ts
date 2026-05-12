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
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
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

export const AddGoalButton = styled.button`
  border: 1px solid #dbe4ef;
  background: #ffffff;
  color: #0f172a;
  padding: 0.65rem 1rem;
  border-radius: 0.8rem;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
  transition: all 0.2s ease;
  width: 100%;

  ${media.sm} {
    width: auto;
  }

  &:hover {
    background: #f8fafc;
    transform: translateY(-1px);
  }
`

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const GoalCard = styled.button<{ $completed?: boolean }>`
  text-align: left;
  border: 1px solid ${({ $completed }) => ($completed ? '#bbf7d0' : '#edf2f7')};
  background: ${({ $completed }) => ($completed ? 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 55%)' : '#ffffff')};
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.04);
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(15, 23, 42, 0.08);
  }
`

export const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
`

export const CardName = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.01em;
  line-height: 1.25;
`

export const CompletedBadge = styled.span`
  flex-shrink: 0;
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #166534;
  background: #dcfce7;
  border: 1px solid #bbf7d0;
  padding: 0.2rem 0.45rem;
  border-radius: 9999px;
`

export const ProgressTrack = styled.div`
  width: 100%;
  height: 0.55rem;
  border-radius: 9999px;
  background: #eef2f7;
  overflow: hidden;
`

export const ProgressFill = styled.div`
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #16a34a 0%, #22c55e 100%);
  transition: width 0.35s ease;
`

export const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`

export const AmountRow = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  color: #475569;
`

export const PercentRow = styled.span`
  font-size: 0.78rem;
  font-weight: 800;
  color: #0f172a;
`

export const DeadlineRow = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
`

export const TapHint = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: #94a3b8;
`

export const EmptyCard = styled.div`
  border: 1px dashed #cbd5e1;
  background: #f8fafc;
  border-radius: 1rem;
  padding: 2rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  grid-column: 1 / -1;
`

export const EmptyEmoji = styled.span`
  font-size: 2.25rem;
  line-height: 1;
`

export const EmptyTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
`

export const EmptyHint = styled.p`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 600;
  color: #64748b;
  max-width: 22rem;
`

export const EmptyCta = styled.button`
  border: none;
  background: #16a34a;
  color: #ffffff;
  font-weight: 800;
  font-size: 0.9rem;
  padding: 0.7rem 1.25rem;
  border-radius: 0.85rem;
  cursor: pointer;
  margin-top: 0.25rem;

  &:hover {
    background: #15803d;
  }
`

export const LoadingText = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 0.88rem;
  font-weight: 600;
  grid-column: 1 / -1;
`
