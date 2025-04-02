import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import styled from '@emotion/styled'
import { buttonStyles, linkStyles } from '../styled/CtaStyles'
import Icon from '../common/icon/Icon'
import type { CTAProps } from '../styled/CtaStyles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, CTAProps {
  asLinkStyle?: boolean
  icon?: string
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  icon,
  iconOnly = false,
  asLinkStyle = false,
  children,
  ...rest
}) => {
  const buttonContent = (
    <>
      {!iconOnly && children && <>{children}</>}
      {icon && <Icon name={icon} />}
    </>
  )

  return (
    <StyledButton asLink={asLinkStyle} iconOnly={iconOnly} {...rest}>
      {buttonContent}
    </StyledButton>
  )
}

export default Button

interface StyledButtonProps extends CTAProps {
  asLink?: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  ${({ asLink, ...rest }) => (asLink ? linkStyles(rest) : buttonStyles(rest))}
`
