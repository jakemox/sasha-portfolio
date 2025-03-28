import { lazy, type FC } from 'react'
import { useSuspenseQuery } from '@apollo/client'
import { isPreview } from '../../constants/constants'
import { PageDocument } from '../../gql/generated/graphql'
import type { PageQuery, PageQueryVariables } from '../../gql/generated/graphql'

const Portfolio = lazy(() => import('../../sections/portfolio/Portfolio'))
const ImageAndText = lazy(() => import('../../sections/imageAndText/ImageAndText'))

interface PageProps {
  id: string
}

const Page: FC<PageProps> = ({ id }) => {
  const { data, error } = useSuspenseQuery<PageQuery, PageQueryVariables>(PageDocument, {
    variables: {
      preview: isPreview,
      id,
    },
  })

  if (error) return <p>Error: {error.message}</p>

  if (!data?.page) return null

  const { contentCollection } = data.page || {}

  return (
    <>
      {contentCollection.items.map(({ sys, __typename }, index) => {
        return <Section key={index} id={sys.id} typename={__typename} />
      })}
    </>
  )
}

interface SectionProps {
  id: string
  typename: string
}

const Section: FC<SectionProps> = ({ id, typename }) => {
  try {
    const Component = typenameToComponent(typename)

    if (Component) {
      return <Component id={id} />
    }
    throw new Error('Component not found: ' + typename)
  } catch (e) {
    console.error(e)
    return null
  }
}

const typenameToComponent = (typename: string): FC<{ id: string }> | null => {
  switch (typename) {
    case 'Portfolio':
      return Portfolio
    case 'ImageAndText':
      return ImageAndText
    default:
      return null
  }
}

export default Page
