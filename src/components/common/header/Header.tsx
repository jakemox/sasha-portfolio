import type { FC } from 'react'
import styled from '@emotion/styled'
import Link from '../../ctas/Link'
import { useQuery } from '@apollo/client'
import { isPreview } from '../../../constants/constants'
import { themeColors } from '../../../theme/colors'
import Container from '../grid/Container'
import { breakpoints } from '../../../theme/breakpoints'
import { HeaderDocument } from '../../../gql/generated/graphql'
import type { HeaderQuery, HeaderQueryVariables } from '../../../gql/generated/graphql'

const Header: FC = () => {
  const { data } = useQuery<HeaderQuery, HeaderQueryVariables>(HeaderDocument, {
    variables: { limit: 1, preview: isPreview },
  })

  const { logo, navigationLinksCollection } = data?.headerCollection?.items[0] || {}

  return (
    <StyledHeader>
      <Navigation element="nav">
        <Link href="/">{logo && <Logo src={logo.url} alt={logo.description} />}</Link>
        <NavLinks>
          {navigationLinksCollection?.items.map(({ url, text, linkType }, i) => (
            <NavItem key={i}>
              <NavLink href={url} isExternal={linkType !== 'Internal'}>
                {text}
              </NavLink>
            </NavItem>
          ))}
        </NavLinks>
      </Navigation>
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  background-color: ${themeColors.bg.primary};
  color: ${themeColors.text.primary};
  position: sticky;
`

const Navigation = styled(Container)`
  padding-block: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${breakpoints.md.minWidth}) {
    padding-block: 2rem;
  }
`

const Logo = styled.img`
  display: block;
  height: 1.5rem;
  flex-grow: 1;
`

const NavLinks = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 1rem;
`

const NavItem = styled.li`
  margin-block-end: 0;
`

const NavLink = styled(Link)`
  display: block;
`
