import type { FC, HTMLAttributes, RefObject } from 'react'
import styled from '@emotion/styled'
import { BaseCell } from './Cell'
import { breakpoints } from '../../../theme/breakpoints'

type spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

interface BaseRowProps {
  reverse?: boolean
  fullWidth?: boolean
  spacing?: spacing
}

type DivRowProps = {
  element?: 'div'
  rowRef?: RefObject<HTMLDivElement>
} & HTMLAttributes<HTMLDivElement>

type SectionRowProps = {
  element?: 'section' | 'article'
  rowRef?: RefObject<HTMLElement>
} & HTMLAttributes<HTMLElement>

type RowProps = (DivRowProps | SectionRowProps) & BaseRowProps

const Row: FC<RowProps> = ({
  element,
  reverse,
  fullWidth,
  spacing = 5,
  rowRef,
  children,
  ...attr
}) => {
  const { className, ...rest } = attr

  return (
    <BaseRow
      as={element}
      className={className}
      reverse={reverse}
      fullWidth={fullWidth}
      spacing={spacing}
      ref={rowRef as (RefObject<HTMLDivElement> & RefObject<HTMLElement>) | undefined}
      {...rest}
    >
      {children}
    </BaseRow>
  )
}

export default Row

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
