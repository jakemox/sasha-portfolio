import type { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react'
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router'
import styled from '@emotion/styled'
import { buttonStyles, linkStyles } from '../styled/CtaStyles'
import Icon from '../common/icon/Icon'
import type { CTAProps } from '../styled/CtaStyles'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, CTAProps {
  icon?: string
  asButtonStyle?: boolean
  navLink?: boolean
}

const Link: FC<PropsWithChildren<LinkProps>> = ({
  href,
  variant,
  icon,
  iconOnly = false,
  asButtonStyle = false,
  navLink = false,
  children,
  ...rest
}) => {
  if (!href) return null

  const isExternal = isExternalLink(href)

  const linkContent = (
    <>
      {!(iconOnly || !children) && <span>{children}</span>}
      {icon && <Icon name={icon} />}
    </>
  )

  const LinkComponent = isExternalLink(href) ? 'a' : navLink ? RouterNavLink : RouterLink

  return (
    <LinkComponent
      href={isExternal ? href : undefined}
      to={!isExternal ? href : undefined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {linkContent}
    </LinkComponent>
  )
}

export const isExternalLink = (href: string) =>
  href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')

interface StyledLinkProps extends CTAProps {
  asButton?: boolean
}

export default styled(Link, {
  shouldForwardProp: (prop) => !['asButton', 'iconOnly'].includes(prop),
})<StyledLinkProps>`
  ${({ asButton, ...rest }) => (asButton ? buttonStyles(rest) : linkStyles(rest))}
`
