import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #F8FAFC;
`;

export const MainContent = styled.main`
  min-height: 100vh;
  padding: 1.5rem 1.5rem 6rem;
  
  @media (min-width: 768px) {
    margin-left: 16rem;
    padding: 2rem;
  }
  
  @media (min-width: 1024px) {
    padding: 3rem;
  }
`;

export const ContentWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 80rem;
`;
