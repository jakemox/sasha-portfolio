import { useState, type FC } from 'react'
import styled from '@emotion/styled'
import { FocusTrap } from 'focus-trap-react'
import Link, { isExternalLink } from '../../ctas/Link'
import { useQuery } from '@apollo/client'
import { isPreview } from '../../../constants/constants'
import { themeColors } from '../../../theme/colors'
import Container, { containerStyles } from '../grid/Container'
import { breakpoints } from '../../../theme/breakpoints'
import { HeaderDocument } from '../../../gql/generated/graphql'
import type { HeaderQuery, HeaderQueryVariables } from '../../../gql/generated/graphql'
import Button from '../../ctas/Button'
import useWindowSizeThrottled from '../../../hooks/useWindowSizeThrottled'

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(true)

  useWindowSizeThrottled((dimensions) => {
    if (dimensions?.width) {
      if (dimensions.width > parseInt(breakpoints.md.minWidth)) {
        setIsMobileViewport(false)
      } else {
        setIsMobileViewport(true)
      }
    }
  })

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const closeMenuOnMobile = () => {
    if (isMobileViewport) {
      setMenuOpen(false)
    }
  }

  const { data } = useQuery<HeaderQuery, HeaderQueryVariables>(HeaderDocument, {
    variables: { limit: 1, preview: isPreview },
  })

  const { logo, navigationLinksCollection } = data?.headerCollection?.items[0] || {}

  const navLinks = navigationLinksCollection?.items ?? []

  const renderNavLinks = () =>
    navLinks.map(({ url, text }, i) => (
      <li key={i}>
        <NavLink
          href={url}
          navLink
          onClick={() => {
            if (!isExternalLink(url)) {
              closeMenuOnMobile()
            }
          }}
          tabIndex={isMobileViewport && !menuOpen ? -1 : 0}
        >
          {text}
        </NavLink>
      </li>
    ))

  return (
    <StyledHeader>
      <FocusTrap
        active={menuOpen}
        focusTrapOptions={{
          escapeDeactivates: true,
          clickOutsideDeactivates: true,
          initialFocus: false,
          onDeactivate: closeMenuOnMobile,
        }}
      >
        <Navigation element="nav">
          <Link href="/" onClick={closeMenuOnMobile}>
            {logo && <Logo src={logo.url} alt={logo.description} />}
          </Link>
          <MenuButton
            onClick={toggleMenu}
            icon={menuOpen ? 'close' : 'hamburger'}
            iconOnly
            size="sm"
            variant="ghost"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          />
          <DesktopNav>{renderNavLinks()}</DesktopNav>
          <MobileNav isOpen={menuOpen} onClick={toggleMenu}>
            <MobileNavList onClick={(e) => e.stopPropagation()}>{renderNavLinks()}</MobileNavList>
          </MobileNav>
        </Navigation>
      </FocusTrap>
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
  background: rgb(from ${themeColors.bg.secondary} r g b / 50%);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};

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

  li {
    padding-block: 0.75rem;
  }
`

const NavLink = styled(Link)`
  display: block;
  width: 100%;
`
