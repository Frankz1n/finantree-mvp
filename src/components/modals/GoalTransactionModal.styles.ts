import styled, { css } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;

  @media (min-width: 640px) {
    align-items: center;
    padding: 0;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  transition: opacity 0.3s;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 32rem;
  transform: translateY(0);
  overflow: hidden;
  border-radius: 32px;
  background-color: #ffffff;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: all 0.3s;

  animation: slideInFromBottom 0.3s ease-out;

  @media (min-width: 640px) {
    padding: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    animation: zoomIn95 0.3s ease-out;
  }

  @keyframes slideInFromBottom {
    from { opacity: 0; transform: translateY(1rem); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes zoomIn95 {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  border-radius: 9999px;
  padding: 0.5rem;
  color: #94a3b8;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background-color: #f1f5f9;
    color: #475569;
  }
`;

export const Header = styled.div`
  margin-bottom: 2rem;
`;

export const HeaderFlexData = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const IconContainer = styled.div<{ $isDeposit?: boolean }>`
  display: flex;
  height: 3rem;
  width: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  
  ${({ $isDeposit }) => $isDeposit ? css`
    background-color: #d1fae5;
    color: #059669;
  ` : css`
    background-color: #ffe4e6;
    color: #e11d48;
  `}
`;

export const IconEmoji = styled.span`
  font-size: 1.5rem;
`;

export const TitleContainer = styled.div``;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
`;

export const SubTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  margin-top: 0.25rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const LabelGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 0.5rem;
`;

export const ActionButton = styled.button<{ $isDeposit?: boolean }>`
  width: 100%;
  border-radius: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  @media (min-width: 768px) {
    padding-top: 1.75rem;
    padding-bottom: 1.75rem;
    font-size: 1.125rem;
  }

  ${({ $isDeposit }) => $isDeposit ? css`
    background-color: #10b981;
    box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.25);
    &:hover:not(:disabled) {
      background-color: #059669;
      transform: translateY(-0.25rem);
    }
  ` : css`
    background-color: #f43f5e;
    box-shadow: 0 10px 15px -3px rgba(244, 63, 94, 0.25);
    &:hover:not(:disabled) {
      background-color: #e11d48;
      transform: translateY(-0.25rem);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
