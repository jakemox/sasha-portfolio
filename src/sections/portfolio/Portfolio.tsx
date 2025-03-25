import styled from '@emotion/styled'
import { isPreview } from '../../constants/constants'
import { useQuery } from '@apollo/client'
import Lightbox from 'yet-another-react-lightbox'
import Container from '../../components/common/grid/Container'
import Row from '../../components/common/grid/Row'
import Cell from '../../components/common/grid/Cell'
import { PortfolioSectionDocument } from '../../gql/generated/graphql'
import type {
  PortfolioSectionQuery,
  PortfolioSectionQueryVariables,
} from '../../gql/generated/graphql'
import Image from '../../components/common/image/Image'
import { useState, type FC } from 'react'
import type { ContentfulImageApiParams } from '../../lib/contentfulImage'
import Button from '../../components/ctas/Button'

const ImageButton = styled(Button)`
  width: 100%;
  height: 100%;
`

const PortfolioImage = styled(Image)`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
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

interface PortfolioProps {
  id: string
}

const Portfolio: FC<PortfolioProps> = ({ id }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number>(0)
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)

  const { data } = useQuery<PortfolioSectionQuery, PortfolioSectionQueryVariables>(
    PortfolioSectionDocument,
    {
      variables: {
        preview: isPreview,
        id,
      },
    },
  )

  const { portfolioItemsCollection } = data?.portfolio || {}

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return portfolioItemsCollection ? (
    <>
      <Container element="section">
        <Row spacing={1}>
          {portfolioItemsCollection.items.map(({ columns, portfolioImage }, i) => {
            if (portfolioImage) {
              const { image, focusArea } = portfolioImage
              return (
                <Cell cols={{ xxs: 12, sm: columns }} key={i}>
                  <ImageButton asLinkStyle onClick={() => openLightbox(i)}>
                    <PortfolioImage
                      src={image.url}
                      alt={image.title}
                      loading="lazy"
                      contentfulApiParams={{ f: focusArea as ContentfulImageApiParams['f'] }}
                    />
                  </ImageButton>
                </Cell>
              )
            } else return null
          })}
        </Row>
      </Container>
      <Lightbox
        index={lightboxIndex}
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={portfolioItemsCollection.items.map(
          ({
            portfolioImage: {
              image: { url, title },
            },
          }) => {
            return {
              src: url,
              alt: title,
            }
          },
        )}
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
