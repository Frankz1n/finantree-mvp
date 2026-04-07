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

export const TopBar = styled.div`
  height: 0.375rem;
  width: 100%;
  background-color: #8b5cf6;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0.5rem;
`;

export const HeaderTitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const IconContainer = styled.div`
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #ede9fe;
  color: #7c3aed;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #7c3aed;
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
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
`;

export const CurrencyInputWrapper = styled.div`
  margin-top: 0.5rem;
`;

export const InfoBox = styled.div`
  border-radius: 1rem;
  background-color: #f5f3ff;
  padding: 0.75rem 1rem;
  border: 1px solid #ede9fe;
`;

export const InfoText = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: #7c3aed;
`;

export const SaveButton = styled.button`
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
  box-shadow: 0 10px 15px -3px rgba(167, 139, 250, 0.5);

  background-color: #8b5cf6;

  &:hover:not(:disabled) {
    transform: scale(1.02);
    background-color: #7c3aed;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
