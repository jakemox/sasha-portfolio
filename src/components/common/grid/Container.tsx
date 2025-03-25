import type { FC, HTMLAttributes } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { gridOuterSpacing, gridOuterSpacingXss } from '../../../constants/grid'
import { breakpoints } from '../../../theme/breakpoints'

interface ContainerProps<T = HTMLDivElement> extends HTMLAttributes<T> {
  noMargin?: boolean
  element?: 'div' | 'section' | 'main' | 'nav' //Add more tags if needed
}

const Container: FC<ContainerProps> = ({ element, noMargin = false, children, ...attr }) => {
  const { className, ...rest } = attr

  return (
    <BaseContainer as={element} className={className} noMargin={noMargin} {...rest}>
      {children}
    </BaseContainer>
  )
}

export default Container

const baseContainerStyles = css`
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  position: relative;
`

const paddingStyles = css`
  padding-inline: ${gridOuterSpacingXss};
  @media (min-width: ${breakpoints.xs.minWidth}) {
    padding-inline: ${gridOuterSpacing};
  }
`

// const containerStyles = css`
//   ${baseContainerStyles};
//   ${paddingStyles};
// `

const BaseContainer = styled.div<{ noMargin: boolean }>`
  ${baseContainerStyles}
  ${({ noMargin }) => !noMargin && paddingStyles}
`
