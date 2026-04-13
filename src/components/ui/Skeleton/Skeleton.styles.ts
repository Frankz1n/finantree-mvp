import styled from 'styled-components';

export const StyledSkeleton = styled.div`
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  border-radius: 0.375rem;
  background-color: rgba(226, 232, 240, 0.6);
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;
