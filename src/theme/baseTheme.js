import { createTheme } from '@material-ui/core'

const portfolioTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
    MuiSelect: {
      MenuProps: {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
      },
    },
  },
  palette: {
    primary: {
      light: '#f5f5f5',
      main: '#414439',
    },
    secondary: {
      main: '#f57e9c',
    },
    grey: {
      50: '#f8f8f8',
      100: '#f3f4f5',
      200: '#e7e9eb',
      300: '#d0d3d7',
      400: '#b8bdc3',
      500: '#8e949c',
      600: '#666c74',
      700: '#535860',
      800: '#353a41',
      900: '#151a20',
    },
    text: {
      primary: '#414439',
      secondary: '#f57e9c',
    },
    background: {
      default: '#fff',
    },
    divider: '#e7e9eb',
  },
  typography: {
    fontFamily: 'Jost',

    button: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '-0.005em',
      textTransform: 'none',
    },
  },
})

portfolioTheme.overrides = {
  MuiContainer: {
    root: {
      paddingLeft: '7.5vw',
      paddingRight: '7.5vw',
      [portfolioTheme.breakpoints.up('sm')]: {
        paddingLeft: '8.33vw',
        paddingRight: '8.33vw',
      },
      [portfolioTheme.breakpoints.up('lg')]: {
        marginLeft: '8.33vw',
        marginRight: '8.33vw',
        paddingLeft: 0,
        paddingRight: 0,
      },
      [portfolioTheme.breakpoints.up('xl')]: {
        maxWidth: '1440px !important',
        margin: '0 auto',
      },
    },
    maxWidthLg: {
      [portfolioTheme.breakpoints.up('lg')]: {
        maxWidth: '83.34vw',
      },
    },
  },
  MuiButton: {
    text: {
      '&:hover': {
        backgroundColor: portfolioTheme.palette.primary.light,
      },
    },
  },
  MuiLink: {
    root: {
      fontWeight: 500,
      position: 'relative',
      color: portfolioTheme.palette.text.secondary,
    },
  },
  MuiCssBaseline: {
    '@global': {
      html: {
        fontSize: 16,
        [portfolioTheme.breakpoints.up('sm')]: {
          fontSize: 18,
        },
        [portfolioTheme.breakpoints.up('md')]: {
          fontSize: 20,
        },
        [portfolioTheme.breakpoints.up('lg')]: {
          fontSize: 20,
        },
        [portfolioTheme.breakpoints.up('xl')]: {
          fontSize: 22,
        },
        '-webkit-hyphens': 'manual',
        '-moz-hyphens': 'manual',
        '-ms-hyphens': 'manual',
        hyphens: 'manual',
        [portfolioTheme.breakpoints.up('sm')]: {
          '-webkit-hyphens': 'none',
          '-moz-hyphens': 'none',
          '-ms-hyphens': 'none',
          hyphens: 'none',
        },
      },
    },
  },
}

export default portfolioTheme
