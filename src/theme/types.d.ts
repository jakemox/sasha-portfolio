import type { CSSObject } from '@emotion/react'

export type ElementSize = 'xs' | 'sm' | 'md' | 'lg'

export type ElementVariant = 'solid' | 'accent' | 'inverse' | 'disabled'

export type ElementLayout = 'default' | 'inline'

type ButtonColor = {
  default?: string
  hover?: string
}

type BreakPoint = {
  minWidth: string | null
  maxWidth: string | null
  gutter: string
}

export type ThemeColors = {
  text: {
    primary: string
    inverse: string
    secondary: string
    disabled: string
  }
  bg: {
    primary: string
    inverse: string
    secondary: string
    tertiary?: string
    active?: string
  }
  icon: {
    primary: string
    inverse: string
    disabled: string
    accent: string
  }
  button: {
    primary: ButtonColor
    inverse: ButtonColor
    disabled: string
    accent?: ButtonColor
  }
}

export type ThemeTypography = {
  fontFamily: string
  fontSizes: Record<string, string>
  fontWeights: Record<string, number>
  lineHeights: Record<string, number>
  letterSpacings: Record<string, string>
  textStyles: Record<string, CSSObject>
}

export type ThemeGutters = {
  xxs: string
  xs: string
}

export type ThemeBreakpoints = {
  xxs: BreakPoint
  xs: BreakPoint
  sm: BreakPoint
  smLandscape: BreakPoint
  md: BreakPoint
  lg: BreakPoint
  xl: BreakPoint
}
