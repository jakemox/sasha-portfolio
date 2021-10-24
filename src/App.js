import React from 'react'
import { useEffect } from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import HomePage from './containers/HomePage/HomePage'
import AboutPage from './containers/AboutPage/AboutPage'
import Container from '@material-ui/core/Container'
import './App.css';
import Header from './theme/components/Header/Header';
import Footer from './theme/components/Footer/Footer';

const ScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <ScrollToTopOnMount />
        <Switch>
          <Route
            component={AboutPage}
            path="/about" 
          />
          <Route
            component={HomePage}
            path="/" 
          />
        </Switch>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
