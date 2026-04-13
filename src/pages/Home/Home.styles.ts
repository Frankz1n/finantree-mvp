import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 1rem 0;
  max-width: 1200px;
  width: 100%;
`;

export const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #94a3b8;
  margin: 0;
  font-weight: 600;
`;

export const StreakPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff7ed;
  color: #f97316;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 800;
  font-size: 0.875rem;
  box-shadow: 0 4px 6px -1px rgba(255, 237, 213, 0.5);
`;

export const MainContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 10px 15px -3px rgba(0, 0, 0, 0.02);
  border: 1px solid #f8fafc;
`;

export const AvailableFundsCard = styled(Card)`
  display: flex;
  align-items: center;
  padding: 2.5rem;
  gap: 2.5rem;
  border-radius: 2rem;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.03);
`;

export const TreeIconWrapper = styled.div`
  width: 7rem;
  height: 7rem;
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  flex-shrink: 0;
`;

export const FundsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FundsLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const FundsAmount = styled.h2<{ $isNegative?: boolean }>`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${({ $isNegative }) => $isNegative ? '#ef4444' : '#0f172a'};
  margin: 0;
  line-height: 1;
  letter-spacing: -0.02em;
`;

export const FundsPillsRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
`;

export const FundPill = styled.div<{ $variant: 'green' | 'purple' }>`
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  
  ${({ $variant }) => $variant === 'green' ? `
    background-color: #f0fdf4;
    color: #10b981;
  ` : `
    background-color: #faf5ff;
    color: #8b5cf6;
  `}
`;

export const SectionOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const SectionTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 800;
  color: #334155;
  margin: 0;
`;

export const SeeAllLink = styled.a`
  font-size: 0.75rem;
  font-weight: 800;
  color: #10b981;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const QuickActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

export const QuickActionButton = styled.button<{ $colorVariant: 'dark' | 'green' | 'purple' }>`
  flex: 1;
  aspect-ratio: 1;
  max-height: 11rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, filter 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }

  ${({ $colorVariant }) => {
    switch ($colorVariant) {
      case 'dark':
        return `
          background-color: #0f172a;
          color: #ffffff;
          box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.2);
        `;
      case 'green':
        return `
          background-color: #10b981;
          color: #ffffff;
          box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2);
        `;
      case 'purple':
        return `
          background-color: #8b5cf6;
          color: #ffffff;
          box-shadow: 0 10px 15px -3px rgba(139, 92, 246, 0.2);
        `;
    }
  }}
`;

export const ActionIconWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 1.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 800;
`;

export const RecentActivityCard = styled(Card)`
  padding: 2rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TransactionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const TransactionIconWrapper = styled.div<{ $bg: string; $color: string }>`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-size: 1.25rem;
`;

export const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const TransactionName = styled.span`
  font-size: 0.875rem;
  font-weight: 800;
  color: #0f172a;
`;

export const TransactionSub = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TransactionAmount = styled.span<{ $isIncome?: boolean }>`
  font-size: 0.875rem;
  font-weight: 800;
  color: ${({ $isIncome }) => $isIncome ? '#10b981' : '#0f172a'};
`;

/* Removed Efficiency Score Styles */
