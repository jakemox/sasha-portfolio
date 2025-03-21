import { isValidElement } from 'react'
import type { ElementType, FC, HTMLAttributes } from 'react'
import styled from '@emotion/styled'
import typography from '../../theme/typography'

const defaultTextElements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
} as const

type VariantType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: VariantType
  component?: ElementType
  gutterBottom?: boolean
}

const Text: FC<TextProps> = ({ component, variant = 'body1', children, className, ...rest }) => {
  const TextComponent: ElementType =
    component && isValidElement(component) ? component : defaultTextElements[variant]

  return (
    <TextComponent className={className} {...rest}>
      {children}
    </TextComponent>
  )
}

interface StyledTextProps {
  variant: VariantType
  gutterBottom?: boolean
}

export default styled(Text, {
  shouldForwardProp: (prop) => !['gutterBottom'].includes(prop),
})<StyledTextProps>`
  ${({ variant }) => typography.textStyles[variant]};
  ${({ gutterBottom }) => gutterBottom && 'margin-bottom: 1rem;'}
`
