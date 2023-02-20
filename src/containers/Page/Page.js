// @flow

import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'
import LoadingOverlay from '../../components/LoadingOverlay'
import { isPreview } from '../../constants/constants'
import loadable from '@loadable/component'

const PageQuery = gql`
  query PageQuery($preview: Boolean!, $id: String!) {
    page(preview: $preview, id: $id) {
      title
      contentCollection {
        items {
          ... on ImageAndText {
            sys {
              id
            }
            __typename
          }
          ... on Portfolio {
            sys {
              id
            }
            __typename
          }
        }
      }
    }
  }
`

const Page = ({ id }) => {
  const { data, error, loading } = useQuery(PageQuery, {
    variables: {
      preview: isPreview,
      id,
    },
  })

  if (loading) return <LoadingOverlay />
  if (error) return <p>Error: {error.message}</p>

  const { contentCollection } = data.page || {}

  return contentCollection.items.map(({ sys, __typename }, index) => {
    return <Section key={index} id={sys.id} typename={__typename} />
  })
}

const Section = ({ id, typename }) => {
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

const typenameToComponent = (typename) => {
  switch (typename) {
    case 'Portfolio':
      return loadable(() => import('../../components/Portfolio/Portfolio'))
    case 'ImageAndText':
      return loadable(() =>
        import('../../components/ImageAndText/ImageAndText')
      )
    default:
      return null
  }
}

export default Page
