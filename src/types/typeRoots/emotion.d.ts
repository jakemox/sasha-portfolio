import '@emotion/react'
import type { ThemeColors, ThemeGutter, ThemeTypography } from '../../../theme/types'
import { breakpoints } from '../../theme/breakpoints'
import { ThemeBreakpoints } from '../../theme/types'

declare module '@emotion/react' {
  export interface Theme {
    colors: ThemeColors
    typography: ThemeTypography
    breakpoints: ThemeBreakpoints
    gutters: ThemeGutter
    columnWidth: string
  }
}
