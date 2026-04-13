import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const SpinnerIcon = styled.span`
  display: inline-flex;
  animation: ${spin} 1s linear infinite;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
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
  max-width: 24rem;
  border-radius: 32px;
  background-color: #ffffff;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: fadeInZoom 0.2s ease-out;

  @keyframes fadeInZoom {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
`;

export const IconContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  height: 4rem;
  width: 4rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #fef2f2;
  color: #ef4444;
`;

export const Title = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
`;

export const Description = styled.p`
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.625;
`;

export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ConfirmButton = styled.button`
  height: 3rem;
  width: 100%;
  border-radius: 1rem;
  background-color: #ef4444;
  font-size: 0.875rem;
  font-weight: 700;
  color: #ffffff;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(254, 202, 202, 0.5);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: #dc2626;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  height: 3rem;
  width: 100%;
  border-radius: 1rem;
  background-color: #f1f5f9;
  font-size: 0.875rem;
  font-weight: 700;
  color: #475569;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: #e2e8f0;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
