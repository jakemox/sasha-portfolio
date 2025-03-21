import { gutter } from '../constants/grid'
import type { ThemeBreakpoints } from './types'

export const breakpoints: ThemeBreakpoints = {
  xxs: {
    minWidth: null,
    maxWidth: '319px',
    gutter: gutter['xxs'],
  },
  xs: {
    minWidth: '320px',
    maxWidth: '599px',
    gutter: gutter['xs'],
  },
  sm: {
    minWidth: '600px',
    maxWidth: '959px',
    gutter: gutter['xs'],
  },
  smLandscape: {
    minWidth: '600px',
    maxWidth: '959px',
    gutter: gutter['xs'],
  },
  md: {
    minWidth: '960px',
    maxWidth: '1279px',
    gutter: gutter['xs'],
  },
  lg: {
    minWidth: '1280px',
    maxWidth: '1899px',
    gutter: gutter['xs'],
  },
  xl: {
    minWidth: '1900px',
    maxWidth: null,
    gutter: gutter['xs'],
  },
}

export const mediaQueries = {
  smLandscapeOrMedium: `(min-width: ${breakpoints.smLandscape.minWidth}) and (orientation: landscape), (min-width: ${breakpoints.md.minWidth})`,
  mobile: `(max-width: ${breakpoints.smLandscape.maxWidth}) and (orientation: landscape), (max-width: ${breakpoints.xs.maxWidth})`,
  tablet: `(min-width: ${breakpoints.sm.minWidth}) and (orientation: portrait) and (max-width: ${breakpoints.sm.maxWidth}), (min-width: ${breakpoints.md.minWidth}) and (max-width: ${breakpoints.md.maxWidth})`,
  desktop: `(min-width: ${breakpoints.lg.minWidth})`,
}
