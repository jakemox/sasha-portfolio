import type { ThemeGutters } from '../theme/types'

export const gridOuterSpacing = 'clamp(1rem, -0.7647rem + 7.8431vw, 3rem)'
export const gridOuterSpacingXss = 'clamp(0.5rem, 0.1rem + 4vw, 1rem)'
export const gridGap = 'clamp(1rem, 0.8846rem + 0.5128vw, 1.5rem)'
export const gutter: ThemeGutters = {
  xxs: gridOuterSpacingXss,
  xs: gridOuterSpacing,
}
export const contentMaxWidth = '1656px'

// export enum ElementSizes {
//   Tiny = 'xxs',
//   ExtraSmall = 'xs',
//   Small = 'sm',
//   Base = 'md',
//   Large = 'lg',
//   ExtraLarge = 'xl',
// }

export const columnWidth = '8.333%'
