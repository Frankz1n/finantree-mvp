import styled from 'styled-components';
import { media } from '@/styles/media';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0.75rem 0.75rem 1rem;
  max-width: min(72rem, 100%);
  margin: 0 auto;
  min-height: 100vh;
  width: 100%;

  ${media.md} {
    gap: 1.75rem;
    padding: 1rem 1rem 1.5rem;
  }

  ${media.lg} {
    gap: 2rem;
    padding: 1.5rem 1.5rem 2rem;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 0.75rem;

  ${media.sm} {
    flex-direction: row;
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: clamp(1.35rem, 4vw, 1.875rem);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.025em;
  margin: 0;
  line-height: 1.15;
`;

export const ExportButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0.85rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #475569;
  background: white;
  transition: all 0.2s;
  cursor: pointer;
  width: 100%;

  ${media.sm} {
    width: auto;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
  }
`;

export const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  ${media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }
`;

export const KPICard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

export const KPIHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const KPILabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const KPIIconWrapper = styled.div<{ $color: string }>`
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: ${({ $color }) => `${$color}1A`};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const KPIValue = styled.p<{ $color: string }>`
  font-size: clamp(1.125rem, 3.5vw, 1.5rem);
  font-weight: 900;
  color: ${({ $color }) => $color};
  word-break: break-word;
`;

export const Toolbar = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgba(248, 250, 252, 0.92);
  backdrop-filter: blur(8px);
  padding: 0.65rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  align-items: stretch;
  width: 100%;

  ${media.md} {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;

  ${media.md} {
    flex: 1;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
    border-color: #10b981;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
`;

export const DateFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 0.85rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  cursor: pointer;
  width: 100%;
  min-width: 0;
  transition: all 0.2s;

  &:hover {
    border-color: #cbd5e1;
  }

  ${media.md} {
    width: auto;
    max-width: 14rem;
    padding: 0.75rem 1rem;
  }
`;

export const DateFilterText = styled.span`
  font-size: clamp(0.75rem, 2.5vw, 0.875rem);
  font-weight: 600;
  color: #334155;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FilterPills = styled.div`
  display: flex;
  padding: 0.2rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  width: 100%;
  min-width: 0;

  ${media.md} {
    width: auto;
    padding: 0.25rem;
  }
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  min-width: 0;
  padding: 0.45rem 0.5rem;
  border-radius: 0.65rem;
  font-size: clamp(0.75rem, 2.5vw, 0.875rem);
  font-weight: 700;
  transition: all 0.2s;
  background: ${({ $active }) => $active ? '#0f172a' : 'transparent'};
  color: ${({ $active }) => $active ? 'white' : '#64748b'};
  box-shadow: ${({ $active }) => $active ? '0 10px 15px -3px rgba(15, 23, 42, 0.2)' : 'none'};
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ $active }) => $active ? 'white' : '#0f172a'};
  }

  ${media.md} {
    flex: initial;
    padding: 0.5rem 1.25rem;
  }
`;

export const Ledger = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const DateLabel = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
`;

export const DateDivider = styled.div`
  height: 1px;
  background-color: #e2e8f0;
  flex: 1;
`;

export const TransactionListWrapper = styled.div`
  background: white;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  ${media.md} {
    border-radius: 2rem;
  }
`;

export const TransactionItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 0.75rem;
  padding: 0.85rem 1rem;
  transition: background-color 0.2s;
  cursor: pointer;

  ${media.md} {
    flex-wrap: nowrap;
    padding: 1.25rem;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f8fafc;
  }

  &:hover {
    background-color: #f8fafc;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  flex: 1 1 12rem;

  ${media.md} {
    gap: 1rem;
    flex: initial;
  }
`;

export const ItemIcon = styled.div<{ $type: 'income' | 'expense' }>`
  padding: 0.75rem;
  border-radius: 1rem;
  background-color: ${({ $type }) => $type === 'income' ? '#f0fdf4' : '#f8fafc'};
  color: ${({ $type }) => $type === 'income' ? '#059669' : '#475569'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemDescription = styled.span`
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  font-weight: 700;
  color: #0f172a;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ItemCategory = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
`;

export const ItemAmount = styled.div<{ $type: 'income' | 'expense' }>`
  font-size: clamp(0.95rem, 3vw, 1.125rem);
  font-weight: 900;
  color: ${({ $type }) => $type === 'income' ? '#059669' : '#0f172a'};
  margin-left: auto;
  text-align: right;
  white-space: nowrap;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;

  ${media.md} {
    padding: 5rem 1rem;
  }
`;

export const EmptyIcon = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: #f1f5f9;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #cbd5e1;
`;

export const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
`;

export const EmptyText = styled.p`
  color: #64748b;
  max-width: 20rem;
  margin: 0.5rem auto 0;
`;
