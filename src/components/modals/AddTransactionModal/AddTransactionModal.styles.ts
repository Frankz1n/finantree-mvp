import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const SpinnerIcon = styled.span`
  display: inline-flex;
  animation: ${spin} 1s linear infinite;
`;

export const MutedSpinnerIcon = styled.span`
  display: inline-flex;
  animation: ${spin} 1s linear infinite;
  color: #94a3b8;
`;

export const MutedIcon = styled.span`
  display: inline-flex;
  color: #94a3b8;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(15, 23, 42, 0.5);
  padding: 1rem;
  backdrop-filter: blur(4px);
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 28rem; /* 448px */
  overflow: hidden;
  border-radius: 32px;
  background-color: #ffffff;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: fadeInZoom 0.2s ease-out;

  @keyframes fadeInZoom {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0.5rem;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
`;

export const CloseButton = styled.button`
  border-radius: 9999px;
  background-color: #f1f5f9;
  padding: 0.5rem;
  color: #94a3b8;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;

  &:hover {
    background-color: #e2e8f0;
    color: #475569;
  }
`;

export const Body = styled.div`
  padding: 1.5rem;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TypeSelectorWrapper = styled.div`
  display: flex;
  border-radius: 9999px;
  background-color: #f1f5f9;
  padding: 0.25rem;
`;

export const TypeButton = styled.button<{ $active?: boolean, $type: 'expense' | 'income' }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  padding: 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  ${({ $active, $type }) => $active ? `
    background-color: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
    color: ${$type === 'expense' ? '#ef4444' : '#10b981'};
  ` : `
    background-color: transparent;
    color: #94a3b8;
  `}
`;

export const LabelGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  margin-left: 0.5rem;
`;

export const CurrencyInputWrapper = styled.div`
  margin-top: 0.5rem;

  input {
    border: none;
    background-color: transparent;
    font-size: 1.875rem;
    font-weight: 700;
    color: #0f172a;
    box-shadow: none;
    outline: none;
    padding-left: 0;
    padding-right: 0;

    &::placeholder {
      color: #e2e8f0;
    }

    &:focus-visible {
      box-shadow: none;
    }
  }
`;

export const DescriptionInput = styled.input`
  margin-top: 0.5rem;
  width: 100%;
  border-radius: 1rem;
  background-color: #f8fafc;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  outline: none;
  border: none;
  transition: all 0.2s;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    background-color: #ffffff;
    box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.1);
  }
`;

export const CenteredContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

export const CategoryListWrapper = styled.div`
  margin-top: 0.5rem;
  max-height: 12rem;
  overflow-y: auto;
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
`;

export const CategoryButton = styled.button<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 1rem;
  padding: 0.75rem;
  transition: all 0.2s;
  border: 1px solid;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }

  ${({ $selected }) => $selected ? `
    background-color: #0f172a;
    color: #ffffff;
    border-color: #0f172a;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  ` : `
    background-color: #ffffff;
    color: #64748b;
    border-color: #f1f5f9;
    
    &:hover {
      background-color: #f8fafc;
      border-color: #e2e8f0;
    }
  `}
`;

export const CategoryIcon = styled.span`
  font-size: 1.5rem;
`;

export const CategoryName = styled.span`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
`;

export const EmptyCategoryMessage = styled.div`
  grid-column: span 3 / span 3;
  padding: 2rem 0;
  text-align: center;
  font-size: 0.875rem;
  color: #94a3b8;
`;

export const TwoColsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
`;

export const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1rem;
  background-color: #f8fafc;
  padding: 0.75rem 1rem;
  color: #0f172a;
  margin-top: 0.5rem;
`;

export const InfoBoxText = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
`;

export const SaveButton = styled.button<{ $type: 'expense' | 'income' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3.5rem;
  width: 100%;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 10px 15px -3px ${({ $type }) => $type === 'expense' ? 'rgba(254, 202, 202, 0.5)' : 'rgba(167, 243, 208, 0.5)'};

  background-color: ${({ $type }) => $type === 'expense' ? '#ef4444' : '#10b981'};

  &:hover:not(:disabled) {
    transform: scale(1.02);
    background-color: ${({ $type }) => $type === 'expense' ? '#dc2626' : '#059669'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
