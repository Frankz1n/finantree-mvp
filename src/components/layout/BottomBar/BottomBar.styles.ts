import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  height: 5rem;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid #f1f5f9;
  background-color: #ffffff;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 0.5rem;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -4px 6px -1px rgba(0,0,0,0.05);

  @media (min-width: 768px) {
    display: none;
  }
`;

export const ItemButton = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.25rem;
  transition: all 0.2s;
  flex: 1;
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
  height: 2rem;
  width: 3rem;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 14px;
  background-color: ${({ $active }) => ($active ? '#f0fdf4' : 'transparent')};
`;

export const ItemLabel = styled.span<{ $active?: boolean }>`
  font-size: 9px;
  letter-spacing: -0.025em;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
`;
