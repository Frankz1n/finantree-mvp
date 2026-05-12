import styled from 'styled-components'
import { media } from '@/styles/media'

export const SummaryRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.85rem 1rem;
  border-radius: 0.85rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border: 1px solid #bbf7d0;
`

export const SummaryLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #166534;
  text-transform: uppercase;
`

export const SummaryAmount = styled.span`
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
`

export const ChipsLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: #334155;
`

export const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const ChipButton = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ $active }) => ($active ? '#0f172a' : '#e2e8f0')};
  background: ${({ $active }) => ($active ? '#0f172a' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#f8fafc' : '#334155')};
  font-size: 0.85rem;
  font-weight: 800;
  padding: 0.45rem 0.75rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #0f172a;
    color: #0f172a;
    background: ${({ $active }) => ($active ? '#0f172a' : '#f8fafc')};
  }
`

export const ActionsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  ${media.sm} {
    flex-direction: row;
    align-items: stretch;
  }
`

export const ActionButton = styled.button<{ $variant: 'in' | 'out' }>`
  flex: 1;
  border: none;
  border-radius: 0.85rem;
  font-weight: 800;
  font-size: 0.9rem;
  height: 2.75rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: opacity 0.2s ease, transform 0.15s ease;

  ${({ $variant }) =>
    $variant === 'in'
      ? `
    background: #16a34a;
    color: #ffffff;
    &:hover:not(:disabled) { background: #15803d; }
  `
      : `
    background: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fecaca;
    &:hover:not(:disabled) { background: #fee2e2; }
  `}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #f1f5f9;
  margin: 0.25rem 0 0;
`

export const DangerZone = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.25rem;
`

export const DeleteButton = styled.button`
  border: 1px solid #fecaca;
  background: #ffffff;
  color: #b91c1c;
  font-weight: 700;
  font-size: 0.82rem;
  height: 2.35rem;
  border-radius: 0.65rem;
  cursor: pointer;

  &:hover {
    background: #fef2f2;
  }
`
