import { ApolloClient, InMemoryCache } from '@apollo/client'

const createApolloClient = () => {
  const isLocal = import.meta.env.DEV

  return new ApolloClient({
    uri: isLocal
      ? `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_APP_CONTENTFUL_SPACE_ID}`
      : '/.netlify/functions/fetchContentfulData',
    headers: isLocal
      ? {
          Authorization: `Bearer ${import.meta.env.VITE_APP_CONTENTFUL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        }
      : undefined,
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
