/** Mobile-first: estilos base = telemóvel; usar `media.*` para `min-width`. */
export const breakpoint = {
  sm: '30rem', // 480px
  md: '48rem', // 768px
  lg: '64rem', // 1024px
  xl: '80rem', // 1280px
} as const;

export const media = {
  sm: `@media (min-width: ${breakpoint.sm})`,
  md: `@media (min-width: ${breakpoint.md})`,
  lg: `@media (min-width: ${breakpoint.lg})`,
  xl: `@media (min-width: ${breakpoint.xl})`,
} as const;
