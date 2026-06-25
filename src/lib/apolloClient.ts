import { ApolloClient, InMemoryCache } from '@apollo/client'

const createApolloClient = () => {
  const isProd = import.meta.env.PROD

  return new ApolloClient({
    uri: isProd
      ? '/.netlify/functions/fetchContentfulData'
      : `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_APP_CONTENTFUL_SPACE_ID}`,
    headers: isProd
      ? undefined
      : {
          Authorization: `Bearer ${import.meta.env.VITE_APP_CONTENTFUL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
