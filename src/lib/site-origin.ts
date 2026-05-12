/**
 * Origem pública do app (ex.: https://seu-app.netlify.app).
 * - Em produção no browser: usa `window.location.origin`.
 * - Opcional: defina `VITE_SITE_URL` no Netlify se precisar forçar outra URL (ex.: domínio customizado estável em previews).
 */
export function getSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim()
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '')
  }
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return ''
}
