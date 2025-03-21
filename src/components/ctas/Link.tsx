import type { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from '@emotion/styled'
import { buttonStyles, linkStyles } from '../styled/CtaStyles'
import Icon from '../common/icon/Icon'
import type { CTAProps } from '../styled/CtaStyles'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, CTAProps {
  isExternal?: boolean
  icon?: string
  asButtonStyle?: boolean
}

const Link: FC<PropsWithChildren<LinkProps>> = ({
  href,
  isExternal = false,
  variant,
  icon,
  iconOnly = false,
  asButtonStyle = false,
  children,
  ...rest
}) => {
  const commonProps = {
    variant,
    iconOnly,
    asButton: asButtonStyle,
    ...rest,
  }

  const linkContent = (
    <>
      {!(iconOnly || !children) && <span>{children}</span>}
      {icon && <Icon name={icon} />}
    </>
  )

  return isExternal ? (
    <ExternalLink href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
      {linkContent}
    </ExternalLink>
  ) : (
    <StyledLink to={href} {...commonProps}>
      {linkContent}
    </StyledLink>
  )
}

export default Link

interface StyledLinkProps extends CTAProps {
  asButton?: boolean
}

const StyledLink = styled(RouterLink, {
  shouldForwardProp: (prop) => !['asButton', 'iconOnly'].includes(prop),
})<StyledLinkProps>`
  ${({ asButton, ...rest }) => (asButton ? buttonStyles(rest) : linkStyles(rest))}
`

const ExternalLink = StyledLink.withComponent('a')
