import React from 'react'
import { useEffect } from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import HomePage from './containers/HomePage/HomePage'
import Container from '@material-ui/core/Container'
import './App.css';
import Header from './theme/components/Header/Header';

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
            component={HomePage}
            path="/" 
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
