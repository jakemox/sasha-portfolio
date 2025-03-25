import type { FC, HTMLAttributes, JSX } from 'react'
import styled from '@emotion/styled'
import { breakpoints } from '../../../theme/breakpoints'

type Breakpoint = 'xxs' | 'xs' | 'sm' | 'sm-landscape' | 'md' | 'lg' | 'xl'

type Cols = Partial<Record<Breakpoint, number>>

interface CellProps<T = HTMLOrSVGElement> extends HTMLAttributes<T> {
  element?: keyof JSX.IntrinsicElements
  cols?: number | Cols
  offset?: number | Cols
  block?: boolean
}

const Cell: FC<CellProps> = ({ element, cols = 12, offset, block, children, ...attr }) => {
  const { className, ...rest } = attr

  return (
    <BaseCell
      as={element}
      cols={cols}
      offset={offset}
      block={block}
      className={className}
      {...rest}
    >
      {children}
    </BaseCell>
  )
}

export default Cell

interface BaseCellProps {
  cols: number | Cols
  offset?: number | Cols
  block?: boolean
}

const generateResponsiveStyles = (property: 'cols' | 'offset', values: Cols) => {
  const colsStyle = (value: number) => `flex-basis: calc(100% / 12 * ${value});`
  const offsetStyle = (value: number) => `margin-inline-start: calc(100% / 12 * ${value});`

  return Object.entries(values)
    .map(([bp, value]) => {
      const breakpoint = breakpoints[bp]
      const styles = property === 'cols' ? colsStyle(value) : offsetStyle(value)

      return breakpoint.minWidth === null
        ? styles
        : `
        @media (min-width: ${breakpoints[bp].minWidth}) {
          ${styles}
        }        
      `
    })
    .join('\n')
}

export const BaseCell = styled('div', {
  shouldForwardProp: (prop) => !['cols', 'offset', 'block'].includes(prop),
})<BaseCellProps>`
  display: ${({ block }) => (block ? 'block' : 'flex')};
  ${({ cols }) =>
    typeof cols === 'number'
      ? `flex-basis: calc(100% / 12 * ${cols});`
      : generateResponsiveStyles('cols', cols)}

  ${({ offset }) =>
    typeof offset === 'number'
      ? `margin-left: calc(100% / 12 * ${offset});`
      : offset && generateResponsiveStyles('offset', offset)}
`
