import React from 'react'
import { useEffect } from 'react'
import ApolloClient, {
  gql,
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-boost'
import { ApolloProvider, useQuery } from 'react-apollo'
import introspectionQueryResultData from './fragmentTypes.json'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Page from './containers/Page/Page'
import Container from '@material-ui/core/Container'
import './App.css'
import Header from './theme/components/Header/Header'
import Footer from './theme/components/Footer/Footer'
import { isPreview } from './constants/constants'
import LoadingOverlay from './components/LoadingOverlay'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}`,
  headers: {
    authorization: `Bearer ${
      isPreview
        ? process.env.REACT_APP_CONTENTFUL_PREVIEW_ACCESS_TOKEN
        : process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
    }`,
  },
  cache: new InMemoryCache({ fragmentMatcher }),
})

const ScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}

const PagesQuery = gql`
  query PagesQuery($preview: Boolean!) {
    pageCollection(preview: $preview) {
      items {
        sys {
          id
        }
        title
        slug
        path
      }
    }
  }
`

const App = () => {
  console.log(process.env.PUBLIC_URL)
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />
          <Container>
            <ScrollToTopOnMount />
            <Switch>
              <PageRoutes />
            </Switch>
          </Container>
          <Footer />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  )
}

const PageRoutes = () => {
  const { data, error, loading } = useQuery(PagesQuery, {
    variables: {
      preview: isPreview,
    },
  })

  if (loading) return <LoadingOverlay />
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      {data.pageCollection.items.map(({ sys, slug, path }) => {
        return (
          <Route key={slug} exact={slug === 'home-page'} path={path}>
            <Page id={sys.id} />
          </Route>
        )
      })}
    </>
  )
}

export default App
