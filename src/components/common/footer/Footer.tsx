import type { FC } from 'react'
import { useSuspenseQuery } from '@apollo/client'
import { isPreview } from '../../../constants/constants'
import Container from '../grid/Container'
import styled from '@emotion/styled'
import { FooterDocument } from '../../../gql/generated/graphql'
import type { FooterQuery, FooterQueryVariables } from '../../../gql/generated/graphql'
import Link from '../../ctas/Link'
import { themeColors } from '../../../theme/colors'
import { breakpoints } from '../../../theme/breakpoints'

const Footer: FC = () => {
  const { data } = useSuspenseQuery<FooterQuery, FooterQueryVariables>(FooterDocument, {
    variables: { limit: 1, preview: isPreview },
  })

  const { socialMediaLinksCollection, copyrightText, backgroundImage } =
    data?.footerCollection?.items[0] || {}

  return (
    <FooterContainer backgroundImage={backgroundImage && backgroundImage.url}>
      <StyledContainer>
        <SocialIcons>
          {socialMediaLinksCollection?.items.map(({ socialMediaSite, url }, i) => (
            <li key={i}>
              <Link href={url} icon={socialMediaSite.toLowerCase()} iconOnly />
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

interface FooterContainerProps {
  backgroundImage?: string
}

// TODO move some styles to Contentful
const FooterContainer = styled('footer', {
  shouldForwardProp: (prop) => prop !== 'backgroundImage',
})<FooterContainerProps>`
  margin-top: auto;
  min-height: calc(100vw / 3 * 2);
  color: ${themeColors.text.inverse};

  ${({ backgroundImage }) =>
    backgroundImage &&
    `
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  `}

  @media (min-width: ${breakpoints.xs.minWidth}) {
    min-height: calc(100vw / 2);
  }
  @media (min-width: ${breakpoints.sm.minWidth}) {
    min-height: calc(100vw / 5 * 2);
  }
  @media (min-width: ${breakpoints.md.minWidth}) {
    min-height: calc(100vw / 3);
  }
  @media (min-width: ${breakpoints.lg.minWidth}) {
    min-height: calc(100vw / 7 * 2);
  }
`

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block-start: 2rem;
  padding-block-end: 2rem;
`

const SocialIcons = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 1rem;
`

// const SocialIconLink = styled(Link)`
//   /* TODO Move this to Link component? */
//   transition: color 0.25s ease;
//   /* &:hover {
//     color: ${themeColors.icon.accent};
//   } */
// `
