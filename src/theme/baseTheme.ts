import type { Theme } from '@emotion/react'
import { columnWidth, gutter } from '../constants/grid'
import { themeColors } from './colors'
import typography from './typography'
import { breakpoints } from './breakpoints'

const baseTheme = {
  colors: themeColors,
  typography,
  gutters: gutter,
  breakpoints,
  columnWidth,
} as Theme

export default baseTheme
