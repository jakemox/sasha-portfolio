import { themeColors } from './colors'
import type { ThemeTypography } from './types'

const headingStyles = {
  fontWeight: '500',
  lineHeight: '1.2',
  marginBottom: '0.35em',
  color: themeColors.text.secondary,
}

const textStyles = {
  fontWeight: '400',
  lineHeight: '1.5',
  marginBottom: '0.35em',
}

const typography: ThemeTypography = {
  fontFamily: "'Jost', sans-serif",
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    base: 1.5,
    heading: 1.2,
  },
  letterSpacings: {
    normal: '0',
    wide: '0.05em',
  },
  textStyles: {
    // TODO Get dynamic values
    h1: {
      fontSize: '3rem',
      ...headingStyles,
    },
    h2: {
      fontSize: '2.25rem',
      ...headingStyles,
    },
    h3: {
      fontSize: '1.875rem',
      ...headingStyles,
    },
    h4: {
      fontSize: '1.5rem',
      ...headingStyles,
    },
    h5: {
      fontSize: '1.25rem',
      ...headingStyles,
    },
    h6: {
      fontSize: '1.125rem',
      ...headingStyles,
    },
    body1: {
      fontSize: '1rem',
      ...textStyles,
    },
    body2: {
      fontSize: '0.875rem',
      ...textStyles,
    },
  },
}

export default typography
