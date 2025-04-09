import type { FC } from 'react'
import { useSuspenseQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { isPreview } from '../../constants/constants'
import {
  ImageAndTextSectionDocument,
  type ImageAndTextSectionQuery,
  type ImageAndTextSectionQueryVariables,
} from '../../gql/generated/graphql'
import Container from '../../components/common/grid/Container'
import Row from '../../components/common/grid/Row'
import Cell from '../../components/common/grid/Cell'
import Text from '../../components/styled/Text'
import RichText from '../../richTextOptions'
import Image from '../../components/common/image/Image'
import type { ContentfulImageApiParams } from '../../lib/contentfulImage'
import { useResponsiveCssProperties } from '../../hooks/useResponsiveCssProperties'

interface ImageAndTextProps {
  id: string
}

// TODO Turn this into generic 2 column layout?
const ImageAndText: FC<ImageAndTextProps> = ({ id }) => {
  const { data } = useSuspenseQuery<ImageAndTextSectionQuery, ImageAndTextSectionQueryVariables>(
    ImageAndTextSectionDocument,
    {
      variables: {
        preview: isPreview,
        id,
      },
    },
  )

  const { heading, body, imageWrapper, mediaResponsiveMargin } = data?.imageAndText || {}

  const ContainerWithMargin = useResponsiveCssProperties(Container, [mediaResponsiveMargin], {
    margin: '0',
  })

  const { image, focusArea: imageFocusArea } = imageWrapper || {}

  return (
    <ContainerWithMargin element="section">
      <StyledRow>
        <Cell block cols={image ? { sm: 9, md: 6, lg: 7 } : {}}>
          {heading && (
            <Text gutterBottom variant="h1">
              {heading.text}
            </Text>
          )}
          {body && <RichText data={body} />}
        </Cell>
        {image && (
          <Cell cols={{ xs: 12, sm: 9, md: 6, lg: 5 }}>
            <StyledImage
              src={image.url}
              alt={image.title}
              contentfulApiParams={{ f: imageFocusArea as ContentfulImageApiParams['f'] }}
            />
          </Cell>
        )}
      </StyledRow>
    </ContainerWithMargin>
  )
}

export default ImageAndText

const StyledRow = styled(Row)`
  justify-content: center;
  align-items: center;
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`
