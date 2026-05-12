import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/media';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0.75rem 0.75rem 1rem;
  max-width: min(50rem, 100%);
  margin: 0 auto;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;

  ${media.md} {
    gap: 1.5rem;
    padding: 1.25rem 1.25rem 1.5rem;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: clamp(1.35rem, 4vw, 1.875rem);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1.15;
`;

export const Card = styled.section`
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  ${media.md} {
    border-radius: 1.25rem;
    padding: 1.25rem;
    gap: 1rem;
  }
`;

export const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

export const CardSubtitle = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
`;

export const EmailValue = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #0f172a;
  font-weight: 600;
  word-break: break-word;
`;

export const MemberBadge = styled.span`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.75rem;
  border-radius: 9999px;
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  ${media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
`;

export const ActionButton = styled.button<{ $variant?: 'secondary' | 'danger' }>`
  border: 1px solid ${({ $variant }) => ($variant === 'danger' ? '#fecaca' : '#e2e8f0')};
  background: ${({ $variant }) => ($variant === 'danger' ? '#fee2e2' : '#ffffff')};
  color: ${({ $variant }) => ($variant === 'danger' ? '#b91c1c' : '#334155')};
  border-radius: 0.75rem;
  padding: 0.65rem 1rem;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;

  ${media.sm} {
    width: auto;
    min-width: 8.5rem;
  }

  &:hover:not(:disabled) {
    filter: brightness(0.98);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LoadingCard = styled(Card)`
  align-items: center;
  justify-content: center;
  min-height: 148px;
`;

export const LoadingText = styled.p`
  margin: 0;
  color: #64748b;
  font-weight: 600;
`;

export const SpinnerIcon = styled.span`
  display: inline-flex;
  color: #64748b;
  animation: ${spin} 0.9s linear infinite;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
  z-index: 60;

  ${media.sm} {
    align-items: center;
    padding: 1rem;
  }
`;

export const ModalContent = styled.div`
  width: 100%;
  max-width: 100%;
  max-height: min(88dvh, 480px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #ffffff;
  border-radius: 1rem 1rem 0 0;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.2);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${media.sm} {
    width: min(460px, 100%);
    max-height: none;
    overflow: visible;
    border-radius: 1rem;
  }
`;

export const ModalTitle = styled.h3`
  margin: 0;
  color: #0f172a;
  font-size: 1.125rem;
  font-weight: 800;
`;

export const ModalDescription = styled.p`
  margin: 0;
  color: #475569;
  line-height: 1.5;
`;

export const ModalActions = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;

  ${media.sm} {
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.625rem;
  }
`;

export const LanguageField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const LanguageSelect = styled.select`
  width: 100%;
  max-width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
  background: #ffffff;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #94a3b8;
    box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.25);
  }
`;

export const LanguageHint = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
`;
