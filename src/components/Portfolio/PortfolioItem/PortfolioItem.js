// @flow

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
    cursor: 'pointer',
  },
}));


const PortfolioItem = ({ image, columns }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} sm={columns} className={classes.portfolioItem}>
      <img src={image} className={classes.image} />
    </Grid>
  )
}

export default PortfolioItem