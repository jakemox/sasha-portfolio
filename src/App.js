import React from 'react'
import { useEffect } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Route, Switch, HashRouter } from 'react-router-dom'
import HomePage from './containers/HomePage/HomePage'
import AboutPage from './containers/AboutPage/AboutPage'
import Container from '@material-ui/core/Container'
import './App.css'
import Header from './theme/components/Header/Header'
import Footer from './theme/components/Footer/Footer'
import { graphqlClient } from './constants/constants'

const client = new ApolloClient(graphqlClient)

const ScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
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
              <Route component={HomePage} exact path='/' />
              <Route component={AboutPage} path='/about' />
            </Switch>
          </Container>
          <Footer />
        </div>
      </HashRouter>
    </ApolloProvider>
  )
}

export default App
