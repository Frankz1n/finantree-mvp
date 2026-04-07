import styled from 'styled-components';

export const LabelGroup = styled.label`
  display: block;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

export const ComboboxButton = styled.button`
  width: 100%;
  height: 3rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  font-size: 0.875rem;
  font-weight: 700;
  color: #334155;
  outline: none;
  transition: all 0.2s;
  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 2px #00C980;
  }
`;

export const ComboboxContentWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  padding-right: 0.5rem;
  width: 100%;
`;

export const ComboboxFlag = styled.span`
  font-size: 1.25rem;
  line-height: 1;
  flex-shrink: 0;
`;

export const ComboboxText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  width: 100%;
`;

export const ComboboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
`;

export const ComboboxDropdown = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  margin-top: 0.5rem;
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
  overflow: hidden;
  transform-origin: top;
  transition: all 0.2s;
`;

export const SearchWrapper = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f8fafc;
`;

export const SearchInput = styled.input`
  width: 100%;
  font-size: 0.875rem;
  outline: none;
  background-color: transparent;
  color: #334155;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border: none;

  &::placeholder {
    color: #94a3b8;
  }
`;

export const ListWrapper = styled.div`
  max-height: 14rem;
  overflow-y: auto;
  padding: 0.25rem;

  &::-webkit-scrollbar {
    width: 0.375rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e2e8f0;
    border-radius: 9999px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const ListItemBtn = styled.button<{ $selected?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;

  ${({ $selected }) => $selected ? `
    background-color: #ecfdf5;
    color: #00C980;
    font-weight: 700;
  ` : `
    background-color: transparent;
    color: #475569;
    font-weight: 500;

    &:hover {
      background-color: #f1f5f9;
    }
  `}
`;

export const DialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(15, 23, 42, 0.8);
`;

export const DialogContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);
  width: 95vw;
  max-width: 480px; /* sm:max-w-480px */
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 24px;
  background-color: #ffffff;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

export const HeaderArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.5rem;
  color: #0f172a;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AmountInput = styled.input`
  font-size: 1.5rem;
  font-weight: 700;
  height: 3.5rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  outline: none;

  &::placeholder {
    color: #94a3b8;
  }
`;

export const PairsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

export const FieldWrapper = styled.div`
  width: 100%;
  
  @media (min-width: 640px) {
    width: calc(50% - 1.5rem);
  }
`;

export const SwapButtonWrapper = styled.div`
  flex-shrink: 0;
  margin-top: 0;

  @media (min-width: 640px) {
    margin-top: 1.5rem;
  }
`;

export const SwapButton = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;
  transform: rotate(90deg);

  @media (min-width: 640px) {
    transform: rotate(0deg);
  }

  &:hover {
    color: #00C980;
    border-color: #00C980;
  }
`;

export const ResultBox = styled.div`
  background-color: #f8fafc;
  border-radius: 1rem;
  padding: 1.25rem;
  text-align: center;
  border: 1px solid #f1f5f9;
  width: 100%;
`;

export const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: #00C980;
`;

export const LoadingText = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin-top: 0.5rem;
`;

export const ErrorBox = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 500;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const RetryButton = styled.button`
  color: #00C980;
  padding: 0 0.25rem;
  height: auto;
  margin-top: 0.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
`;

export const ResultContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ResultSubtitle = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.25rem;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

export const ResultValue = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.025em;
  word-wrap: break-word;
  width: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  @media (min-width: 640px) {
    font-size: 2.25rem;
  }
`;

export const ExchangeRateDetail = styled.p`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  margin-top: 0.75rem;
  user-select: none;
`;

export const DoneButton = styled.button`
  width: 100%;
  height: 3.5rem;
  border-radius: 1rem;
  background-color: #00C980;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.125rem;
  box-shadow: 0 10px 15px -3px rgba(167, 243, 208, 0.5);
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background-color: #00b372;
  }
`;
