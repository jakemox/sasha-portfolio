import type { FC } from 'react'
import { useSuspenseQuery } from '@apollo/client'
import {
  AnimatedSectionDocument,
  type AnimatedSectionQuery,
  type AnimatedSectionQueryVariables,
} from '../../gql/generated/graphql'
import { isPreview } from '../../constants/constants'
import Container from '../../components/common/grid/Container'
import AnimatedImageLayer from './AnimatedImageLayer'
import { useResponsiveCssProperties } from '../../hooks/useResponsiveCssProperties'

interface AnimatedSectionProps {
  id: string
}

const AnimatedSection: FC<AnimatedSectionProps> = ({ id }) => {
  const { data } = useSuspenseQuery<AnimatedSectionQuery, AnimatedSectionQueryVariables>(
    AnimatedSectionDocument,
    {
      variables: { preview: isPreview, id },
    },
  )

  const { imageSetCollection, responsiveSectionHeightCollection, mediaResponsiveMargin } =
    data?.animatedSection || {}

  const ContainerWithHeightAndMargin = useResponsiveCssProperties(Container, [
    ...(responsiveSectionHeightCollection.items || []),
    mediaResponsiveMargin,
  ])

  return imageSetCollection ? (
    <ContainerWithHeightAndMargin element="section" noMargin>
      {imageSetCollection.items.map((data, i) => {
        return <AnimatedImageLayer key={i} data={data} />
      })}
    </ContainerWithHeightAndMargin>
  ) : null
}

export default AnimatedSection
