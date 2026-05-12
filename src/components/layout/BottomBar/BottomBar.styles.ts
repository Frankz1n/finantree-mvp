import styled from 'styled-components';
import { media } from '@/styles/media';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  min-height: calc(4.5rem + env(safe-area-inset-bottom, 0px));
  align-items: center;
  justify-content: space-around;
  gap: 0.125rem;
  border-top: 1px solid #f1f5f9;
  background-color: #ffffff;
  padding: 0.35rem 0.35rem env(safe-area-inset-bottom, 0px);
  box-shadow: 0 -4px 6px -1px rgba(0,0,0,0.05);

  ${media.sm} {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  ${media.md} {
    display: none;
  }
`;

export const ItemButton = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.125rem;
  padding: 0.35rem 0.15rem;
  min-height: 2.75rem;
  transition: all 0.2s;
  flex: 1;
  min-width: 0;
  color: ${({ $active }) => ($active ? '#00C980' : '#94a3b8')};
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ $active }) => ($active ? '#00C980' : '#475569')};
  }
`;

export const IconWrapper = styled.div<{ $active?: boolean }>`
  display: flex;
  height: 1.85rem;
  width: 100%;
  max-width: 2.75rem;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 12px;
  background-color: ${({ $active }) => ($active ? '#f0fdf4' : 'transparent')};

  ${media.sm} {
    height: 2rem;
    max-width: 3rem;
    border-radius: 14px;
  }
`;

export const ItemLabel = styled.span<{ $active?: boolean }>`
  font-size: clamp(0.5rem, 2.1vw, 0.5625rem);
  letter-spacing: -0.03em;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  text-align: center;
  line-height: 1.15;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.05rem;
`;
