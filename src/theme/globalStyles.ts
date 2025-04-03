import { css } from '@emotion/react'
import baseTheme from './baseTheme'
import CustomCursor from '../assets/cursor.png'

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;

    @media (min-width: ${baseTheme.breakpoints.md.minWidth}) {
      font-size: 20px;
    }
  }

  body {
    margin: 0;
    font-family: ${baseTheme.typography.fontFamily};
    font-size: ${baseTheme.typography.fontSizes.base};
    line-height: ${baseTheme.typography.lineHeights.base};
    color: ${baseTheme.colors.text.primary};
    cursor: url(${CustomCursor}), auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  picture {
    width: 100%;
    height: inherit;
    display: inherit;
    overflow: hidden;
  }
`

export default globalStyles
