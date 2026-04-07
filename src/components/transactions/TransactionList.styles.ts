import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  background-color: #ffffff;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const EmptyStateIcon = styled.div`
  margin-bottom: 1rem;
  display: flex;
  height: 4rem;
  width: 4rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #f8fafc;
  font-size: 1.875rem;
  line-height: 2.25rem;
`;

export const EmptyStateTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
`;

export const EmptyStateText = styled.p`
  font-size: 0.875rem;
  color: #64748b;
`;

export const DateGroupWrapper = styled.div`
  border-radius: 32px;
  background-color: #ffffff;
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const DateGroupHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const DateGroupTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
`;

export const DateGroupCount = styled.span`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  background-color: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;

export const TransactionsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  
  &:hover .actions-group {
    opacity: 1;
  }
`;

export const TransactionIconWrapper = styled.div<{ $type: 'income' | 'expense' }>`
  display: flex;
  height: 3rem;
  width: 3rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  
  background-color: ${({ $type }) => $type === 'income' ? '#ecfdf5' : '#fef2f2'};
  color: ${({ $type }) => $type === 'income' ? '#10b981' : '#ef4444'};
`;

export const TransactionIconText = styled.span`
  font-size: 1.25rem;
`;

export const TransactionDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TransactionDescription = styled.h4`
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TransactionMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TransactionStatus = styled.p`
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  color: #94a3b8;
`;

export const TransactionDot = styled.span`
  height: 0.25rem;
  width: 0.25rem;
  border-radius: 9999px;
  background-color: #cbd5e1;
`;

export const TransactionCategory = styled.p`
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TransactionActionsArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  margin-left: 0.5rem;
  gap: 0.375rem;
`;

export const TransactionAmount = styled.div<{ $type: 'income' | 'expense' }>`
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
  color: ${({ $type }) => $type === 'income' ? '#10b981' : '#0f172a'};
`;

export const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  opacity: 1;
  transition: opacity 0.2s;

  @media (min-width: 768px) {
    opacity: 0;
  }
`;

export const IconButton = styled.button<{ $variant: 'edit' | 'delete' }>`
  padding: 0.375rem;
  color: #94a3b8;
  border-radius: 0.375rem;
  transition: background-color 0.2s, color 0.2s;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ $variant }) => $variant === 'edit' ? '#eef2ff' : '#fef2f2'};
    color: ${({ $variant }) => $variant === 'edit' ? '#6366f1' : '#ef4444'};
  }
`;
