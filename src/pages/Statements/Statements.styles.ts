import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
  max-width: 1152px;
  margin: 0 auto;
  min-height: 100vh;

  @media (min-width: 1024px) {
    padding: 2.5rem;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.025em;
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  background: white;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
  }
`;

export const KPIGrid = styled.div`
  display: grid;
  grid-template-cols: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-cols: repeat(3, 1fr);
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
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ $color }) => $color};
`;

export const Toolbar = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(8px);
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  
  @media (min-width: 768px) {
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
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    border-color: #cbd5e1;
  }

  @media (min-width: 768px) {
    width: auto;
  }
`;

export const DateFilterText = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
`;

export const FilterPills = styled.div`
  display: flex;
  padding: 0.25rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 0.5rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
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

  @media (min-width: 768px) {
    flex: initial;
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
  border-radius: 2rem;
  overflow: hidden;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  transition: background-color 0.2s;
  cursor: pointer;

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
  gap: 1rem;
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
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
`;

export const ItemCategory = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
`;

export const ItemAmount = styled.div<{ $type: 'income' | 'expense' }>`
  font-size: 1.125rem;
  font-weight: 900;
  color: ${({ $type }) => $type === 'income' ? '#059669' : '#0f172a'};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  items-center: center;
  justify-content: center;
  padding: 5rem 0;
  text-align: center;
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
