import styled from 'styled-components';
import { media } from '@/styles/media';

export const Container = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  max-width: 100vw;
  background-color: #F8FAFC;
`;

export const MainContent = styled.main`
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  min-height: 100dvh;
  /* Espaço para a bottom bar + safe area (mobile first) */
  padding: 0.75rem 0.75rem calc(5.25rem + env(safe-area-inset-bottom, 0px));

  ${media.md} {
    margin-left: 16rem;
    padding: 1.25rem 1.25rem 2rem;
  }

  ${media.lg} {
    padding: 1.75rem 2rem 2.5rem;
  }
`;

export const ContentWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 80rem;
  width: 100%;
`;
