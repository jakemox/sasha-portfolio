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
  ImageFragmentDoc,
  PortfolioSectionDocument,
  type PortfolioSectionQuery,
  type PortfolioSectionQueryVariables,
} from '../../gql/generated/graphql'
import PortfolioImage from './PortfolioImage'
import { FragmentType, useFragment } from '../../gql/generated'
import Image from '../../components/common/image/Image'
import { useResponsiveCssProperties } from '../../hooks/useResponsiveCssProperties'

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

  const ContainerWithMargin = useResponsiveCssProperties(Container, [mediaResponsiveMargin], {
    margin: '0',
  })

  const imageData = (image: FragmentType<typeof ImageFragmentDoc>) => {
    return useFragment(ImageFragmentDoc, image)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return portfolioItemsCollection ? (
    <>
      <ContainerWithMargin element="section">
        <Row spacing={1}>
          {portfolioItemsCollection.items.map(({ columns, portfolioImage }, i) => {
            if (portfolioImage) {
              const data = imageData(portfolioImage)
              return (
                <Cell cols={{ xxs: 12, sm: columns }} key={i}>
                  <ImageButton asLinkStyle cols={columns} onClick={() => openLightbox(i)}>
                    <PortfolioImage data={data} />
                  </ImageButton>
                </Cell>
              )
            } else return null
          })}
        </Row>
      </ContainerWithMargin>
      <Lightbox
        index={lightboxIndex}
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={portfolioItemsCollection.items.map(({ portfolioImage }) => {
          const { url, title } = imageData(portfolioImage).image
          return {
            src: url,
            alt: title,
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

const ImageButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'cols' })<{
  cols: number
}>`
  width: 100%;
  height: auto;

  @media (min-width: ${breakpoints.sm.minWidth}) {
    aspect-ratio: ${({ cols }) => `${cols} / 5`};
  }

  picture {
    height: 100%;
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
