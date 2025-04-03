import { type FC, Suspense, useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import { ApolloProvider, useSuspenseQuery } from '@apollo/client'
import createApolloClient from './lib/apolloClient'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import Page from './containers/Page/Page'
import Header from './components/common/header/Header'
import Footer from './components/common/footer/Footer'
import { isPreview } from './constants/constants'
import { PagesDocument, type PagesQuery, type PagesQueryVariables } from './gql/generated/graphql'
import 'yet-another-react-lightbox/styles.css'
import LoadingOverlay from './components/LoadingOverlay'
import '@fontsource-variable/jost'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: height 5s ease;
`

const ScrollToTop: FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const client = useMemo(() => createApolloClient(), [])

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ScrollToTop />
        <AppContainer>
          <Header />
          <Suspense fallback={<LoadingOverlay />}>
            <PageRoutes />
            <Footer />
          </Suspense>
        </AppContainer>
      </BrowserRouter>
    </ApolloProvider>
  )
}

const PageRoutes: FC = () => {
  const { data, error } = useSuspenseQuery<PagesQuery, PagesQueryVariables>(PagesDocument, {
    variables: {
      preview: isPreview,
    },
  })

  if (error) return <p>Error: {error.message}</p>

  if (!data?.pageCollection?.items?.length) return null

  return (
    <Routes>
      {data.pageCollection.items.map(({ sys, slug, path }) => {
        return <Route key={slug} path={path} element={<Page id={sys.id} />} />
      })}
    </Routes>
  )
}

export default App
