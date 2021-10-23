// @flow

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  portfolioItem: {
    // height: 'auto',

    [theme.breakpoints.up('lg')]: {
      // height: '30rem',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
    cursor: 'pointer',
  },
}));


const PortfolioItem = ({ index, image, columns, onClick }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} sm={columns} className={classes.portfolioItem}>
      <img src={image} className={classes.image} onClick={() => onClick(index)} />
    </Grid>
  )
}

export default PortfolioItem