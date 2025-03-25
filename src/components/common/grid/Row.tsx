import type { FC, HTMLAttributes } from 'react'
import styled from '@emotion/styled'
import { BaseCell } from './Cell'
import { breakpoints } from '../../../theme/breakpoints'

type spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

interface BaseRowProps {
  reverse?: boolean
  fullWidth?: boolean
  spacing: spacing
}

const generateResponsiveGutters = (spacing: number) => {
  return Object.entries(breakpoints)
    .map(([_, { minWidth, gutter }]) => {
      const styles = `
      margin: calc(${gutter} * -0.1 * ${spacing});
    
      ${BaseCell} {
        padding: calc(${gutter} * 0.1 * ${spacing});
      }
    `

      return minWidth === null
        ? styles
        : `
        @media (min-width: ${minWidth}) {
          ${styles}
        }
      `
    })
    .join('\n')
}

const BaseRow = styled('div', {
  shouldForwardProp: (prop) => !['reverse', 'spacing', 'fullWidth'].includes(prop),
})<BaseRowProps>`
  display: flex;
  flex: 0 1 auto;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  flex-wrap: wrap;

  ${({ spacing }) => generateResponsiveGutters(spacing)}
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
`

interface RowProps<T = HTMLDivElement> extends HTMLAttributes<T> {
  element?: 'div' | 'section' | 'article' | 'ul'
  reverse?: boolean
  fullWidth?: boolean
  spacing?: spacing
}

const Row: FC<RowProps> = ({ element, reverse, fullWidth, spacing = 5, children, ...attr }) => {
  const { className, ...rest } = attr

  return (
    <BaseRow
      as={element}
      className={className}
      reverse={reverse}
      fullWidth={fullWidth}
      spacing={spacing}
      {...rest}
    >
      {children}
    </BaseRow>
  )
}

export default Row
