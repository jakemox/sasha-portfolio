import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Box, Button, Container, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { gql } from 'apollo-boost'
import { isPreview } from '../../../constants/constants'

const HeaderQuery = gql`
  query HeaderData($limit: Int!, $preview: Boolean!) {
    headerCollection(limit: $limit, preview: $preview) {
      items {
        name
        logo {
          title
          description
          url
        }
        navigationLinksCollection {
          items {
            text
            url
            linkType
          }
        }
      }
    }
  }
`

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'static',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
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
  button: {
    '&:not(:last-of-type)': {
      [theme.breakpoints.up('sm')]: {
        marginRight: '1rem',
      },
    },
  },
}))

const Header = () => {
  const classes = useStyles()
  const { data } = useQuery(HeaderQuery, {
    variables: { limit: 1, preview: isPreview },
  })

  const { logo, navigationLinksCollection } =
    data?.headerCollection?.items[0] || {}

  return (
    <AppBar elevation={0} className={classes.appBar}>
      <Container>
        <Toolbar className={classes.toolBar}>
          <Box display='flex' flexGrow={1}>
            <Link className={classes.logoLink} to='/'>
              {logo && (
                <img
                  src={logo.url}
                  className={classes.logo}
                  alt={logo.description}
                />
              )}
            </Link>
          </Box>
          {navigationLinksCollection?.items.map(
            ({ url, text, linkType }, index) => (
              <Button
                key={index}
                component={linkType === 'Internal' ? Link : 'a'}
                to={linkType === 'Internal' ? url : undefined}
                href={linkType !== 'Internal' ? url : undefined}
                target={linkType === 'External' ? '_blank' : ''}
                color='inherit'
                className={classes.button}
              >
                {text}
              </Button>
            )
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
