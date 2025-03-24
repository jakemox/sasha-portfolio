import { ApolloClient, InMemoryCache } from '@apollo/client'

const createApolloClient = () => {
  return new ApolloClient({
    uri: '/.netlify/functions/fetchContentfulData',
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
