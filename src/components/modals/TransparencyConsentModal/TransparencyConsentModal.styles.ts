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
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: fadeInZoom 0.2s ease-out;

  @keyframes fadeInZoom {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  color: #94a3b8;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #475569;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const IconContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  height: 4rem;
  width: 4rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #f0fdf4;
  color: #00C980;
`;

export const Title = styled.h2`
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
`;

export const Description = styled.p`
  margin-bottom: 2rem;
  font-size: 0.875rem;
  line-height: 1.625;
  color: #64748b;
`;

export const HighlightText = styled.span`
  font-weight: 700;
  color: #00C980;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ConfirmButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3rem;
  width: 100%;
  border-radius: 9999px;
  background-color: #00C980;
  font-size: 0.875rem;
  font-weight: 700;
  color: #ffffff;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(167, 243, 208, 0.5);
  transition: all 0.2s;

  &:hover {
    background-color: #00b372;
  }
`;

export const DeclineButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3rem;
  width: 100%;
  border-radius: 9999px;
  background-color: #f8fafc;
  font-size: 0.875rem;
  font-weight: 700;
  color: #475569;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a;
  }
`;
