// @flow

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../../../assets/images/sasha-logo.png'
import { Link } from 'react-router-dom'
// import Header from 'theme/components/Header/Header'

const useStyles = makeStyles((theme) => ({
  appBar: {
    // flexGrow: 1,
    position: 'static',
    // top: 0,
    // left: 0,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main
  },
  toolBar: {
    height: 'auto',
    padding: '1.5rem 0',

    [theme.breakpoints.up('md')]: {
      padding: '2rem 0',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    display: 'block',
    height: '1.25rem',

    [theme.breakpoints.up('sm')]: {
      height: '1.5rem',
    },
  },
  aboutButton: {

    [theme.breakpoints.up('sm')]: {
      marginRight: '1rem',
    },
  },
}));


const Header = () => {
  const classes = useStyles();

  return (
    <AppBar elevation={0} className={classes.appBar}>
      <Container>
        <Toolbar className={classes.toolBar}>
          <Box display="flex" flexGrow={1}>
            <Link className={classes.logoLink} to="/">
              <img alt="Sasha Moxon Logo" src={Logo} className={classes.logo}/>
            </Link>
          </Box>
          <Button component={Link} to="/" color="inherit" className={classes.aboutButton}>About</Button>
          <Button component={Link} to="/" color="inherit">Contact</Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header