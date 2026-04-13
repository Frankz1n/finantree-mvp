import styled from 'styled-components';

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
  background-color: #0f172a;
  color: #ffffff;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
`;

export const SubTitle = styled.p`
  margin-top: 0.5rem;
  color: #64748b;
`;

export const StrongText = styled.strong`
  color: #0f172a;
  font-weight: 700;
`;

export const Description = styled.p`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #94a3b8;
`;

export const ButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  width: 100%;
  gap: 0.75rem;
`;

export const RejectButton = styled.button`
  flex: 1;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  height: 3rem;
  font-weight: 700;
  color: #64748b;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    color: #ef4444;
    border-color: #fecaca;
    background-color: #fef2f2;
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const AcceptButton = styled.button`
  flex: 1;
  border-radius: 9999px;
  background-color: #0f172a;
  height: 3rem;
  font-weight: 700;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #1e293b;
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: 9999px;
  background-color: #f1f5f9;
  padding: 0.5rem;
  color: #94a3b8;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e2e8f0;
  }
`;
