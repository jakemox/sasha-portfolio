import { themeColors } from './colors'
import type { ThemeTypography } from './types'
import TextUnderline from '../assets/text-underline.png'
import { keyframes } from '@emotion/react'
import { breakpoints } from './breakpoints'

const underlineAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`

const headingStyles = {
  fontWeight: '500',
  lineHeight: '1.2',
  marginBottom: '0.35em',
  color: themeColors.text.secondary,
  position: 'relative',
  width: 'fit-content',

  '::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '0.125em',
    backgroundImage: `url(${TextUnderline})`,
    backgroundSize: 'auto 100%',
    animation: `${underlineAnimation} 1s ease forwards`,
  },
} as const

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
      ...headingStyles,
      fontSize: '2.25rem',

      [`@media (min-width: ${breakpoints.md.minWidth})`]: {
        fontSize: '3rem',
      },
    },
    h2: {
      ...headingStyles,
      fontSize: '1.875rem',

      [`@media (min-width: ${breakpoints.md.minWidth})`]: {
        fontSize: '2.25rem',
      },
    },
    h3: {
      ...headingStyles,
      fontSize: '1.5rem',

      [`@media (min-width: ${breakpoints.md.minWidth})`]: {
        fontSize: '1.875rem',
      },
    },
    h4: {
      ...headingStyles,
      fontSize: '1.25rem',

      [`@media (min-width: ${breakpoints.md.minWidth})`]: {
        fontSize: '1.5rem',
      },
    },
    h5: {
      ...headingStyles,
      fontSize: '1.125rem',

      [`@media (min-width: ${breakpoints.md.minWidth})`]: {
        fontSize: '1.25rem',
      },
    },
    h6: {
      ...headingStyles,
      fontSize: '1rem',

      [`@media (min-width: ${breakpoints.md.minWidth})`]: {
        fontSize: '1.125rem',
      },
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
