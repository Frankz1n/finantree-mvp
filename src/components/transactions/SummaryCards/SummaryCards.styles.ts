import styled from 'styled-components';
import { media } from '@/styles/media';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  ${media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const CardWrapper = styled.div`
  border-radius: 1.25rem;
  background-color: #ffffff;
  padding: 1.15rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  min-width: 0;

  ${media.md} {
    border-radius: 32px;
    padding: 1.5rem;
  }
`;

export const CardLabel = styled.p<{ $color?: string }>`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
  color: ${({ $color }) => $color || '#64748b'};
`;

export const CardValue = styled.h3`
  font-size: clamp(1.125rem, 4vw, 1.75rem);
  font-weight: 700;
  color: #0f172a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`;
