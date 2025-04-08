import type { FC } from 'react'
import styled from '@emotion/styled'
import { useSuspenseQuery } from '@apollo/client'
import {
  AnimatedSectionDocument,
  type AnimatedSectionQuery,
  type AnimatedSectionQueryVariables,
} from '../../gql/generated/graphql'
import { isPreview } from '../../constants/constants'
import Container from '../../components/common/grid/Container'
import AnimatedImageLayer from './AnimatedImageLayer'
import { breakpoints } from '../../theme/breakpoints'

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

  const { imageSetCollection } = data?.animatedSection || {}

  return imageSetCollection ? (
    <StyledContainer element="section" noMargin>
      {imageSetCollection.items.map((data, i) => {
        return <AnimatedImageLayer key={i} data={data} />
      })}
    </StyledContainer>
  ) : null
}

export default AnimatedSection

const StyledContainer = styled(Container)`
  min-height: calc(100vw / 3 * 2);

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
