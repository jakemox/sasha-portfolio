// @flow

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  picture: {
    display: 'block',

    [theme.breakpoints.up('sm')]: {
      height: `calc((((83.34vw + 16px) / 12) * 5) - 16px)`,
    },
    [theme.breakpoints.up('xl')]: {
      height: `calc(((1456px / 12) * 5) - 16px)`,
    },
  },
  image: ({ positionX, positionY }) => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: `${positionX}% ${positionY}%`,
    cursor: 'pointer',
  }),
}))

const PortfolioImage = ({ src, alt, positionX, positionY }) => {
  const classes = useStyles({ positionX, positionY })

  return (
    <picture className={classes.picture}>
      <img
        src={src}
        className={classes.image}
        alt={alt}
        onContextMenu={(e) => e.preventDefault()}
      />
    </picture>
  )
}

export default PortfolioImage
