import { useState } from 'react';
import { Plus, Wallet, TrendingUp, ShoppingCart, Tv, Briefcase, Car } from "lucide-react"
import * as S from "./Home.styles"
import { TransactionModal } from "@/components/modals/TransactionModal";

export function Home() {
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

    return (
        <S.HomeContainer>
            <S.HeaderArea>
                <S.TitleBlock>
                    <S.Title>Hi, Franklyn! 👋</S.Title>
                    <S.Subtitle>Let's grow your wealth.</S.Subtitle>
                </S.TitleBlock>
            </S.HeaderArea>

            <S.MainContentGrid>
                <S.LeftColumn>
                    <S.AvailableFundsCard>
                        <S.TreeIconWrapper>🌳</S.TreeIconWrapper>
                        <S.FundsInfo>
                            <S.FundsLabel>AVAILABLE FUNDS</S.FundsLabel>
                            <S.FundsAmount>$420.00</S.FundsAmount>
                            <S.FundsPillsRow>
                                <S.FundPill $variant="green">On track! +$42.00 today</S.FundPill>
                            </S.FundsPillsRow>
                        </S.FundsInfo>
                    </S.AvailableFundsCard>

                    <S.SectionOverview>
                        <S.SectionTitleWrapper>
                            <S.SectionTitle>Quick Actions</S.SectionTitle>
                        </S.SectionTitleWrapper>
                        <S.QuickActionsContainer>
                            <S.QuickActionButton $colorVariant="dark" onClick={() => setIsExpenseModalOpen(true)}>
                                <S.ActionIconWrapper>
                                    <Plus size={28} strokeWidth={2.5} />
                                </S.ActionIconWrapper>
                                <S.ActionLabel>Add Expense</S.ActionLabel>
                            </S.QuickActionButton>

                            <S.QuickActionButton $colorVariant="green" onClick={() => setIsIncomeModalOpen(true)}>
                                <S.ActionIconWrapper>
                                    <Wallet size={28} strokeWidth={2.5} />
                                </S.ActionIconWrapper>
                                <S.ActionLabel>Add Income</S.ActionLabel>
                            </S.QuickActionButton>

                            <S.QuickActionButton $colorVariant="purple">
                                <S.ActionIconWrapper>
                                    <TrendingUp size={28} strokeWidth={2.5} />
                                </S.ActionIconWrapper>
                                <S.ActionLabel>New Goal</S.ActionLabel>
                            </S.QuickActionButton>
                        </S.QuickActionsContainer>
                    </S.SectionOverview>
                </S.LeftColumn>

                <S.RightColumn>
                    <S.RecentActivityCard>
                        <S.SectionTitleWrapper>
                            <S.SectionTitle>Recent Activity</S.SectionTitle>
                            <S.SeeAllLink>See All</S.SeeAllLink>
                        </S.SectionTitleWrapper>

                        <S.TransactionList>
                            <S.TransactionItem>
                                <S.TransactionLeft>
                                    <S.TransactionIconWrapper $bg="#fdf4ff" $color="#f472b6">
                                        <ShoppingCart size={18} />
                                    </S.TransactionIconWrapper>
                                    <S.TransactionDetails>
                                        <S.TransactionName>Whole Foods Market</S.TransactionName>
                                        <S.TransactionSub>TODAY • GROCERIES</S.TransactionSub>
                                    </S.TransactionDetails>
                                </S.TransactionLeft>
                                <S.TransactionAmount>-$84.50</S.TransactionAmount>
                            </S.TransactionItem>

                            <S.TransactionItem>
                                <S.TransactionLeft>
                                    <S.TransactionIconWrapper $bg="#f3e8ff" $color="#c084fc">
                                        <Tv size={18} />
                                    </S.TransactionIconWrapper>
                                    <S.TransactionDetails>
                                        <S.TransactionName>Netflix Subscription</S.TransactionName>
                                        <S.TransactionSub>YESTERDAY • ENTERTAINMENT</S.TransactionSub>
                                    </S.TransactionDetails>
                                </S.TransactionLeft>
                                <S.TransactionAmount>-$15.99</S.TransactionAmount>
                            </S.TransactionItem>

                            <S.TransactionItem>
                                <S.TransactionLeft>
                                    <S.TransactionIconWrapper $bg="#ecfdf5" $color="#10b981">
                                        <Briefcase size={18} />
                                    </S.TransactionIconWrapper>
                                    <S.TransactionDetails>
                                        <S.TransactionName>Freelance Payment</S.TransactionName>
                                        <S.TransactionSub>FEB 12 • INCOME</S.TransactionSub>
                                    </S.TransactionDetails>
                                </S.TransactionLeft>
                                <S.TransactionAmount $isIncome>+$1250.00</S.TransactionAmount>
                            </S.TransactionItem>

                            <S.TransactionItem>
                                <S.TransactionLeft>
                                    <S.TransactionIconWrapper $bg="#fee2e2" $color="#f87171">
                                        <Car size={18} />
                                    </S.TransactionIconWrapper>
                                    <S.TransactionDetails>
                                        <S.TransactionName>Uber Ride</S.TransactionName>
                                        <S.TransactionSub>FEB 10 • TRANSPORT</S.TransactionSub>
                                    </S.TransactionDetails>
                                </S.TransactionLeft>
                                <S.TransactionAmount>-$24.30</S.TransactionAmount>
                            </S.TransactionItem>
                        </S.TransactionList>
                    </S.RecentActivityCard>
                </S.RightColumn>
            </S.MainContentGrid>

            <TransactionModal
                isOpen={isIncomeModalOpen}
                onClose={() => setIsIncomeModalOpen(false)}
                type="income"
                onSuccess={() => { }}
            />
            <TransactionModal
                isOpen={isExpenseModalOpen}
                onClose={() => setIsExpenseModalOpen(false)}
                type="expense"
                onSuccess={() => { }}
            />
        </S.HomeContainer>
    )
}
