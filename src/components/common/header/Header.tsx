import { useEffect, useState, type FC } from 'react'
import { useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import Link from '../../ctas/Link'
import { useQuery } from '@apollo/client'
import { isPreview } from '../../../constants/constants'
import { themeColors } from '../../../theme/colors'
import Container, { containerStyles } from '../grid/Container'
import { breakpoints } from '../../../theme/breakpoints'
import { HeaderDocument } from '../../../gql/generated/graphql'
import type { HeaderQuery, HeaderQueryVariables } from '../../../gql/generated/graphql'
import Button from '../../ctas/Button'

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const { data } = useQuery<HeaderQuery, HeaderQueryVariables>(HeaderDocument, {
    variables: { limit: 1, preview: isPreview },
  })

  const { logo, navigationLinksCollection } = data?.headerCollection?.items[0] || {}

  const navLinks = navigationLinksCollection?.items ?? []

  const handleMenuButton = () => {
    setMenuOpen(!menuOpen)
  }

  const renderNavLinks = () =>
    navLinks.map(({ url, text }, i) => (
      <li key={i}>
        <NavLink href={url}>{text}</NavLink>
      </li>
    ))

  return (
    <StyledHeader>
      <Navigation element="nav">
        <Link href="/">{logo && <Logo src={logo.url} alt={logo.description} />}</Link>
        <MenuButton
          onClick={handleMenuButton}
          icon={menuOpen ? 'close' : 'hamburger'}
          iconOnly
          size="sm"
          variant="ghost"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        />
        <DesktopNav>{renderNavLinks()}</DesktopNav>
        <MobileNav isOpen={menuOpen}>
          <MobileNavList>{renderNavLinks()}</MobileNavList>
        </MobileNav>
      </Navigation>
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  background-color: ${themeColors.bg.primary};
  color: ${themeColors.text.primary};
  position: sticky;
  top: 0;
  z-index: 10;
`

const Navigation = styled(Container)`
  padding-block: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (min-width: ${breakpoints.md.minWidth}) {
    padding-block: 2rem;
  }
`

const Logo = styled.img`
  display: block;
  max-width: 100%;
  max-height: 3rem;
  flex: 0 1 auto;
`

const MenuButton = styled(Button)`
  flex: 0 0 auto;

  @media (min-width: ${breakpoints.md.minWidth}) {
    display: none;
  }
`

const DesktopNav = styled.ul`
  display: none;
  list-style-type: none;
  gap: 1rem;

  @media (min-width: ${breakpoints.md.minWidth}) {
    display: flex;
    flex: 0 0 auto;
  }

  li {
    margin-block-end: 0;
  }
`

const MobileNav = styled('div', { shouldForwardProp: (prop) => prop !== 'isOpen' })<{
  isOpen: boolean
}>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgb(from ${themeColors.bg.secondary} r g b / 40%);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};

  @media (min-width: ${breakpoints.md.minWidth}) {
    display: none;
  }

  ul {
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-1rem)')};
  }
`

const MobileNavList = styled('ul')`
  ${containerStyles}
  background: ${themeColors.bg.primary};
  list-style-type: none;
  padding-block-end: 1.5rem;
  transition: transform 0.3s ease-in-out;
  pointer-events: all;

  li {
    padding-block: 0.75rem;
  }
`

const NavLink = styled(Link)`
  display: block;
`
