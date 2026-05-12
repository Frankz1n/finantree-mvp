import styled from 'styled-components';
import { media } from '@/styles/media';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.25rem 0 0.5rem;
  max-width: 1200px;
  width: 100%;

  ${media.md} {
    gap: 2rem;
    padding: 0.5rem 0 1rem;
  }

  ${media.lg} {
    gap: 2.5rem;
  }
`;

export const HeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  width: 100%;

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.25rem;
  }
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

export const Title = styled.h1`
  font-size: clamp(1.25rem, 4vw + 0.35rem, 2rem);
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

export const Subtitle = styled.p`
  font-size: clamp(0.8125rem, 2vw, 1rem);
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
  gap: 1.5rem;

  ${media.lg} {
    grid-template-columns: 2fr 1fr;
    gap: 2.5rem;
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
  border-radius: 1.25rem;
  padding: 1.15rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 10px 15px -3px rgba(0, 0, 0, 0.02);
  border: 1px solid #f8fafc;

  ${media.md} {
    border-radius: 1.5rem;
    padding: 1.5rem;
  }
`;

export const AvailableFundsCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.25rem 1rem;
  gap: 1.25rem;
  border-radius: 1.25rem;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.03);

  ${media.sm} {
    flex-direction: row;
    text-align: left;
    align-items: center;
    padding: 1.5rem 1.25rem;
    gap: 1.5rem;
    border-radius: 1.5rem;
  }

  ${media.md} {
    padding: 2rem 1.75rem;
    gap: 2rem;
    border-radius: 2rem;
  }
`;

export const TreeIconWrapper = styled.div`
  width: clamp(4.5rem, 22vw, 7rem);
  height: clamp(4.5rem, 22vw, 7rem);
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(2rem, 10vw, 3.5rem);
  flex-shrink: 0;
`;

export const FundsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  min-width: 0;

  ${media.sm} {
    align-items: flex-start;
    width: auto;
  }
`;

export const FundsLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const FundsAmount = styled.h2<{ $isNegative?: boolean }>`
  font-size: clamp(1.75rem, 7vw + 0.5rem, 3.5rem);
  font-weight: 800;
  color: ${({ $isNegative }) => $isNegative ? '#ef4444' : '#0f172a'};
  margin: 0;
  line-height: 1.05;
  letter-spacing: -0.02em;
  word-break: break-word;
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
  font-size: clamp(1rem, 3vw, 1.125rem);
  font-weight: 800;
  color: #334155;
  margin: 0;
  line-height: 1.25;
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
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
  width: 100%;

  ${media.sm} {
    gap: 0.75rem;
  }

  ${media.md} {
    gap: 1rem;
  }
`;

export const QuickActionButton = styled.button<{ $colorVariant: 'dark' | 'green' | 'purple' }>`
  aspect-ratio: 1;
  width: 100%;
  max-height: 10rem;
  min-height: 0;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, filter 0.2s;
  padding: 0.5rem;

  ${media.sm} {
    border-radius: 1.5rem;
    gap: 0.75rem;
    padding: 0.65rem;
  }

  ${media.md} {
    border-radius: 2rem;
    gap: 1rem;
    max-height: 11rem;
    padding: 0.75rem;
  }
  
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
  padding: 0.65rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.sm} {
    padding: 0.85rem;
  }

  ${media.md} {
    padding: 1.25rem;
  }

  svg {
    width: clamp(1.25rem, 5vw, 1.75rem);
    height: clamp(1.25rem, 5vw, 1.75rem);
  }
`;

export const ActionLabel = styled.span`
  font-size: clamp(0.65rem, 2.5vw, 0.875rem);
  font-weight: 800;
  text-align: center;
  line-height: 1.2;
  padding: 0 0.15rem;
`;

export const RecentActivityCard = styled(Card)`
  padding: 1.25rem;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${media.md} {
    padding: 1.75rem;
    border-radius: 1.75rem;
    gap: 1.25rem;
  }

  ${media.lg} {
    padding: 2rem;
    border-radius: 2rem;
    gap: 1.5rem;
  }
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
