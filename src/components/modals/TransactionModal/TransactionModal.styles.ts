import styled, { css, keyframes } from 'styled-components';

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
  max-width: 28rem;
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

export const TopBar = styled.div<{ $isIncome?: boolean }>`
  height: 0.375rem;
  width: 100%;
  ${({ $isIncome }) => $isIncome ? 'background-color: #10b981;' : 'background-color: #ef4444;'}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0.5rem;
`;

export const Title = styled.h2<{ $isIncome?: boolean }>`
  font-size: 1.25rem;
  font-weight: 700;
  ${({ $isIncome }) => $isIncome ? 'color: #059669;' : 'color: #dc2626;'}
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

export const TextInput = styled.input`
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

export const LoaderContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const CategoriesContainer = styled.div`
  margin-top: 0.5rem;
  max-height: 12rem;
  overflow-y: auto;
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
`;

export const CategoryButton = styled.button<{ $isSelected?: boolean; $isIncome?: boolean }>`
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

  ${({ $isSelected, $isIncome }) => {
    if ($isSelected) {
      const color = $isIncome ? '#10b981' : '#ef4444';
      return css`
        background-color: ${color};
        color: white;
        border-color: ${color};
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      `;
    }
    return css`
      background-color: #ffffff;
      color: #64748b;
      border-color: #f1f5f9;

      &:hover {
        background-color: #f8fafc;
        border-color: #e2e8f0;
      }
    `;
  }}
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

export const EmptyCategories = styled.div`
  grid-column: span 3 / span 3;
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: #94a3b8;
`;

export const DateIcon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  color: #94a3b8;
`;

export const DateInputContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1rem;
  background-color: #f8fafc;
  padding: 0.75rem 1rem;
`;

export const DatePickerWrapper = styled.div`
  width: 100%;
  
  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .custom-datepicker {
    width: 100%;
    background-color: transparent;
    font-size: 0.875rem;
    font-weight: 700;
    color: #0f172a;
    outline: none;
    border: none;
    cursor: pointer;
  }
  
  .react-datepicker {
    font-family: inherit;
    border: 1px solid #e2e8f0;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .react-datepicker__header {
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .react-datepicker__day--selected {
    background-color: #10b981;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: #34d399;
  }
`;

export const SaveButton = styled.button<{ $isIncome?: boolean }>`
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

  ${({ $isIncome }) => $isIncome ? css`
    background-color: #10b981;
    box-shadow: 0 10px 15px -3px rgba(167, 243, 208, 1);

    &:hover:not(:disabled) {
      transform: scale(1.02);
      background-color: #059669;
    }
  ` : css`
    background-color: #ef4444;
    box-shadow: 0 10px 15px -3px rgba(254, 202, 202, 1);

    &:hover:not(:disabled) {
      transform: scale(1.02);
      background-color: #dc2626;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const NewCategoryForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  padding: 0.75rem;
  border: 1px dashed #cbd5e1;
  background-color: #f8fafc;
  min-height: 5.5rem;
`;

export const NewCategoryInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0f172a;
  outline: none;
  text-align: center;
  
  &::placeholder {
    color: #94a3b8;
  }
`;

export const CheckboxContainer = styled.label<{ $isIncome?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background-color: #f8fafc;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #cbd5e1;
  border-radius: 0.375rem;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;

  &:checked {
    background-color: #0f172a;
    border-color: #0f172a;

    &::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 1px;
      width: 4px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
`;

export const CheckboxLabelText = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
`;
