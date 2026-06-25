import { useState, type FC } from 'react'
import { useSuspenseQuery } from '@apollo/client'
import styled from '@emotion/styled'
import Lightbox from 'yet-another-react-lightbox'
import { breakpoints } from '../../theme/breakpoints'
import { isPreview } from '../../constants/constants'
import Container from '../../components/common/grid/Container'
import Row from '../../components/common/grid/Row'
import Cell from '../../components/common/grid/Cell'
import Button from '../../components/ctas/Button'
import {
  PortfolioSectionDocument,
  type PortfolioSectionQuery,
  type PortfolioSectionQueryVariables,
} from '../../gql/generated/graphql'
import PortfolioImage from './PortfolioImage'
import Image from '../../components/common/image/Image'
import { getResponsiveCssProperties } from '../../hooks/useResponsiveCssProperties'
import { SerializedStyles } from '@emotion/react'

// TODO Generic SectionProps?
interface PortfolioProps {
  id: string
}

const Portfolio: FC<PortfolioProps> = ({ id }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number>(0)
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)

  const { data } = useSuspenseQuery<PortfolioSectionQuery, PortfolioSectionQueryVariables>(
    PortfolioSectionDocument,
    {
      variables: {
        preview: isPreview,
        id,
      },
    },
  )

  const { portfolioItemsCollection, mediaResponsiveMargin } = data?.portfolio || {}

  const responsiveCssProperties = getResponsiveCssProperties([mediaResponsiveMargin], {
    margin: '0',
  })

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return !!portfolioItemsCollection?.items?.length ? (
    <>
      <PortfolioSection responsiveCssProperties={responsiveCssProperties}>
        <Container>
          <Row spacing={1}>
            {portfolioItemsCollection.items.map((item, i) => {
              const { portfolioImage, columns } = item || {}
              if (portfolioImage) {
                return (
                  <Cell cols={{ xxs: 12, sm: columns }} key={i}>
                    <ImageButton asLinkStyle cols={columns} onClick={() => openLightbox(i)}>
                      <PortfolioImage data={portfolioImage} />
                    </ImageButton>
                  </Cell>
                )
              } else return null
            })}
          </Row>
        </Container>
      </PortfolioSection>
      <Lightbox
        index={lightboxIndex}
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={portfolioItemsCollection.items.map((item) => {
          return {
            src: item?.portfolioImage?.image?.url || '',
            alt: item?.portfolioImage?.image?.title || '',
          }
        })}
        render={{
          slide: ({ slide: { src, alt } }) => (
            <LightboxImageContainer>
              <Image
                src={src}
                alt={alt}
                onContextMenu={(e) => e.preventDefault()}
                className="yarl__slide_image"
              />
            </LightboxImageContainer>
          ),
        }}
      />
    </>
  ) : null
}

export default Portfolio

const PortfolioSection = styled('section', {
  shouldForwardProp: (prop) => prop !== 'responsiveCssProperties',
})<{ responsiveCssProperties?: SerializedStyles | string }>`
  ${({ responsiveCssProperties }) => responsiveCssProperties}
`

const ImageButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'cols' })<{
  cols?: number | null
}>`
  width: 100%;
  height: auto;
  overflow: hidden;

  @media (min-width: ${breakpoints.sm.minWidth}) {
    aspect-ratio: ${({ cols }) => `${cols || 12} / 5`};
  }

  picture {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  :hover {
    img {
      transform: scale(1.1);
      transition: transform 0.5s ease-in-out;
    }
  }
`

const LightboxImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  picture {
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
  }
`
