import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, Share2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog/Dialog'
import * as S from './PwaInstallPrompt.styles'

const STORAGE_KEY = 'finantree-pwa-install-dismissed-at'
const DISMISS_TTL_MS = 30 * 24 * 60 * 60 * 1000
const OPEN_DELAY_MS = 1600

function isStandaloneDisplay(): boolean {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(display-mode: standalone)').matches) return true
  const nav = window.navigator as Navigator & { standalone?: boolean }
  return nav.standalone === true
}

function isMobileBrowser(): boolean {
  if (typeof window === 'undefined') return false
  const narrow = window.matchMedia('(max-width: 768px)').matches
  const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  return narrow && touch
}

function isIos(): boolean {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

function wasDismissedRecently(): boolean {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return false
  const t = parseInt(raw, 10)
  if (Number.isNaN(t)) return false
  return Date.now() - t < DISMISS_TTL_MS
}

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PwaInstallPrompt() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const deferredRef = useRef<BeforeInstallPromptEvent | null>(null)
  const [installReady, setInstallReady] = useState(false)

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
    setOpen(false)
  }, [])

  useEffect(() => {
    if (isStandaloneDisplay()) return
    if (!isMobileBrowser()) return
    if (wasDismissedRecently()) return

    const onBip = (e: Event) => {
      e.preventDefault()
      deferredRef.current = e as BeforeInstallPromptEvent
      setInstallReady(true)
    }

    window.addEventListener('beforeinstallprompt', onBip)

    const timer = window.setTimeout(() => {
      setOpen(true)
    }, OPEN_DELAY_MS)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBip)
      window.clearTimeout(timer)
    }
  }, [])

  const handleInstallClick = async () => {
    const ev = deferredRef.current
    if (!ev) return
    try {
      await ev.prompt()
      await ev.userChoice
    } finally {
      deferredRef.current = null
      setInstallReady(false)
      dismiss()
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && dismiss()}>
      <DialogContent aria-describedby="pwa-install-desc">
        <DialogHeader>
          <DialogTitle>{t('pwaInstall.title')}</DialogTitle>
          <DialogDescription id="pwa-install-desc">
            {t('pwaInstall.description')}
          </DialogDescription>
        </DialogHeader>
        <S.Body>
          {isIos() ? (
            <S.Hint as="div">
              <Share2 size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 6 }} />
              {t('pwaInstall.iosHint')}
            </S.Hint>
          ) : installReady ? (
            <S.Hint>{t('pwaInstall.androidHint')}</S.Hint>
          ) : (
            <S.Hint>{t('pwaInstall.genericHint')}</S.Hint>
          )}
        </S.Body>
        <DialogFooter>
          <S.Actions>
            {!isIos() && installReady && (
              <S.PrimaryButton type="button" onClick={handleInstallClick}>
                <Download size={18} aria-hidden />
                {t('pwaInstall.install')}
              </S.PrimaryButton>
            )}
            <S.SecondaryButton type="button" onClick={dismiss}>
              {t('pwaInstall.later')}
            </S.SecondaryButton>
          </S.Actions>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
