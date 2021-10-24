// @flow

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, SvgIcon, Typography } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram'
import { ReactComponent as EtsyIcon } from '../../../assets/images/icon-etsy.svg'

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialLinks: {
    display: 'flex',
  },
  socialLink: {
    display: 'inherit',
    padding: '0 0.5rem',
  },
  socialIcon: {
    transition: 'color .25s ease',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}));


const Footer = () => {
  const classes = useStyles();

  return (
    <Box py={10} component="footer" className={classes.footer}>
      <Box className={classes.socialLinks}>
        <Link
          className={classes.socialLink}
          href="https://www.instagram.com/sashamoxonillustration/"
          target="_blank"
        >
          <InstagramIcon className={classes.socialIcon} />
        </Link>
        <Link
          className={classes.socialLink}
          href="http://etsy.com/shop/sashamoxillustration"
          target="_blank"
        >
          <SvgIcon className={classes.socialIcon} component={EtsyIcon} />
        </Link>
      </Box>
      <Typography variant="body2">Copyright © 2021 Sasha Moxon</Typography>
    </Box>
  )
}

export default Footer