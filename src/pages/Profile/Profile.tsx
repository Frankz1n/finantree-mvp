import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { setAppLanguage } from '@/i18n/config';
import { isAppLanguage } from '@/lib/i18nLocale';
import { isAppCurrency } from '@/lib/appCurrency';
import { useCurrency } from '@/contexts/CurrencyContext';
import * as S from './Profile.styles';

export function Profile() {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      setIsLoadingSession(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setEmail(session?.user?.email ?? '');
      setIsLoadingSession(false);
    };

    loadSession();
  }, []);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      navigate('/login');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t('profile.signOutError');
      toast.error(message || t('profile.signOutError'));
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleDeleteAccount = () => {
    toast.error(t('profile.deleteNotAvailable'));
    setIsDeleteModalOpen(false);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (isAppLanguage(value)) {
      setAppLanguage(value);
    }
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (isAppCurrency(value)) {
      setCurrency(value);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>{t('profile.title')}</S.Title>
      </S.Header>

      {isLoadingSession ? (
        <S.LoadingCard>
          <S.SpinnerIcon>
            <Loader2 size={20} />
          </S.SpinnerIcon>
          <S.LoadingText>{t('profile.loadingProfile')}</S.LoadingText>
        </S.LoadingCard>
      ) : (
        <>
          <S.Card>
            <S.CardTitle>{t('profile.userInfo')}</S.CardTitle>
            <S.CardSubtitle>{t('profile.signedInWith')}</S.CardSubtitle>
            <S.EmailValue>{email || t('profile.noEmail')}</S.EmailValue>
            <S.MemberBadge>{t('profile.lifetimeMember')}</S.MemberBadge>
          </S.Card>

          <S.Card>
            <S.CardTitle>{t('profile.settings')}</S.CardTitle>
            <S.CardSubtitle>{t('profile.manageAccount')}</S.CardSubtitle>

            <S.LanguageField>
              <S.CardSubtitle as="label" htmlFor="profile-language">
                {t('profile.language')}
              </S.CardSubtitle>
              <S.LanguageSelect
                id="profile-language"
                value={isAppLanguage(i18n.language) ? i18n.language : 'en'}
                onChange={handleLanguageChange}
              >
                <option value="en">{t('profile.langEnglish')}</option>
                <option value="pt-BR">{t('profile.langPortuguese')}</option>
                <option value="es">{t('profile.langSpanish')}</option>
              </S.LanguageSelect>
              <S.LanguageHint>{t('profile.languageHint')}</S.LanguageHint>
            </S.LanguageField>

            <S.LanguageField>
              <S.CardSubtitle as="label" htmlFor="profile-currency">
                {t('profile.currency')}
              </S.CardSubtitle>
              <S.LanguageSelect
                id="profile-currency"
                value={currency}
                onChange={handleCurrencyChange}
              >
                <option value="BRL">{t('profile.currBRL')}</option>
                <option value="USD">{t('profile.currUSD')}</option>
                <option value="EUR">{t('profile.currEUR')}</option>
              </S.LanguageSelect>
              <S.LanguageHint>{t('profile.currencyHint')}</S.LanguageHint>
            </S.LanguageField>

            <S.Actions>
              <S.ActionButton type="button" onClick={handleSignOut} disabled={isSigningOut}>
                {isSigningOut ? t('profile.signingOut') : t('profile.signOut')}
              </S.ActionButton>

              <S.ActionButton type="button" $variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
                {t('profile.deleteAccount')}
              </S.ActionButton>
            </S.Actions>
          </S.Card>
        </>
      )}

      {isDeleteModalOpen && (
        <S.ModalOverlay role="presentation">
          <S.ModalContent role="dialog" aria-modal="true" aria-labelledby="delete-account-title">
            <S.ModalTitle id="delete-account-title">{t('profile.deleteAccountTitle')}</S.ModalTitle>
            <S.ModalDescription>{t('profile.deleteAccountWarning')}</S.ModalDescription>
            <S.ModalActions>
              <S.ActionButton type="button" onClick={() => setIsDeleteModalOpen(false)}>
                {t('common.cancel')}
              </S.ActionButton>
              <S.ActionButton type="button" $variant="danger" onClick={handleDeleteAccount}>
                {t('profile.confirmDelete')}
              </S.ActionButton>
            </S.ModalActions>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
}
