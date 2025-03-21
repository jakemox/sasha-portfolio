import type { FC } from 'react'
import { useQuery } from '@apollo/client'
// import LoadingOverlay from '../../components/LoadingOverlay'
import { isPreview } from '../../constants/constants'
import loadable from '@loadable/component'

import { PageDocument } from '../../gql/generated/graphql'
import type { PageQuery, PageQueryVariables } from '../../gql/generated/graphql'

interface PageProps {
  id: string
}

const Page: FC<PageProps> = ({ id }) => {
  const { data, error, loading } = useQuery<PageQuery, PageQueryVariables>(PageDocument, {
    variables: {
      preview: isPreview,
      id,
    },
  })

  // TODO Needed twice?
  if (loading) return null
  // if (loading) return <LoadingOverlay />
  if (error) return <p>Error: {error.message}</p>

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
      return loadable(() => import('../../sections/portfolio/Portfolio'))
    case 'ImageAndText':
      return loadable(() => import('../../sections/imageAndText/ImageAndText'))
    default:
      return null
  }
}

export default Page
