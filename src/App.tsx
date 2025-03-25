import { useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import { ApolloProvider, useQuery } from '@apollo/client'
import createApolloClient from './lib/apolloClient'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Page from './containers/Page/Page'
import Header from './components/common/header/Header'
import Footer from './components/common/footer/Footer'
import { isPreview } from './constants/constants'
import { PagesDocument } from './gql/generated/graphql'
import type { PagesQuery, PagesQueryVariables } from './gql/generated/graphql'
import 'yet-another-react-lightbox/styles.css'
import LoadingOverlay from './components/LoadingOverlay'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const ScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}

function App() {
  const client = useMemo(() => createApolloClient(), [])

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppContainer>
          <Header />
          <ScrollToTopOnMount />
          <Switch>
            <PageRoutes />
          </Switch>
          <Footer />
        </AppContainer>
      </BrowserRouter>
    </ApolloProvider>
  )
}

const PageRoutes = () => {
  const { data, error, loading } = useQuery<PagesQuery, PagesQueryVariables>(PagesDocument, {
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
