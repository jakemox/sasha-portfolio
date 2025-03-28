import type { FC } from 'react'
import { useSuspenseQuery } from '@apollo/client'
import { isPreview } from '../../../constants/constants'
import Container from '../grid/Container'
import styled from '@emotion/styled'
import { FooterDocument } from '../../../gql/generated/graphql'
import type { FooterQuery, FooterQueryVariables } from '../../../gql/generated/graphql'
import Link from '../../ctas/Link'
import { themeColors } from '../../../theme/colors'

const Footer: FC = () => {
  const { data } = useSuspenseQuery<FooterQuery, FooterQueryVariables>(FooterDocument, {
    variables: { limit: 1, preview: isPreview },
  })

  const { socialMediaLinksCollection, copyrightText } = data?.footerCollection?.items[0] || {}

  return (
    <FooterContainer>
      <StyledContainer>
        <SocialIcons>
          {socialMediaLinksCollection?.items.map(({ socialMediaSite, url }, i) => (
            <li key={i}>
              <SocialIconLink href={url} icon={socialMediaSite.toLowerCase()} iconOnly />
            </li>
          ))}
        </SocialIcons>
        {copyrightText && (
          <p>{copyrightText.text.replace('{{date}}', String(new Date().getFullYear()))}</p>
        )}
      </StyledContainer>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.footer`
  margin-top: auto;
  padding-block: 5rem;
`

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SocialIcons = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 1rem;
`

const SocialIconLink = styled(Link)`
  /* TODO Move this to Link component? */
  transition: color 0.25s ease;
  &:hover {
    color: ${themeColors.icon.accent};
  }
`
