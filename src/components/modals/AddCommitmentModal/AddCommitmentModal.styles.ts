import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/media';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 70;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  padding: 0;

  ${media.md} {
    align-items: center;
    padding: 1rem;
  }
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 100%;
  max-height: min(92dvh, 720px);
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.2);

  ${media.md} {
    max-width: 34rem;
    max-height: none;
    overflow: hidden;
    border-radius: 1.25rem;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 800;
  color: #0f172a;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: #64748b;
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    color: #0f172a;
  }
`;

export const Body = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SegmentedControl = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 0.25rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
`;

export const SegmentButton = styled.button<{ $active: boolean }>`
  height: 2.25rem;
  border: none;
  border-radius: 0.55rem;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $active }) => ($active ? '#0f172a' : 'transparent')};
  color: ${({ $active }) => ($active ? '#f8fafc' : '#475569')};
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 700;
  color: #334155;
`;

export const Input = styled.input`
  width: 100%;
  height: 2.75rem;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  padding: 0 0.85rem;
  font-size: 0.9rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
  }
`;

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  ${media.sm} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Footer = styled.footer`
  padding: 0.85rem 1rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column-reverse;
  align-items: stretch;
  gap: 0.5rem;

  ${media.sm} {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem 1.25rem;
    gap: 0.75rem;
  }
`;

export const CancelButton = styled.button`
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  width: 100%;
  text-align: center;

  ${media.sm} {
    width: auto;
  }

  &:hover {
    color: #0f172a;
  }
`;

export const SaveButton = styled.button`
  border: none;
  border-radius: 0.75rem;
  background: #16a34a;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.9rem;
  height: 2.75rem;
  padding: 0 1rem;
  width: 100%;
  min-width: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s ease;

  ${media.sm} {
    width: auto;
    min-width: 10.5rem;
  }

  &:hover:not(:disabled) {
    background: #15803d;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const SpinnerIcon = styled.span`
  display: inline-flex;
  animation: ${spin} 1s linear infinite;
`;
