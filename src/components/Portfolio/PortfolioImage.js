// @flow

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  image: ({ positionX, positionY }) => ({
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
    objectPosition: `${positionX}% ${positionY}%`,
    cursor: 'pointer',
  }),
}))

const PortfolioImage = ({ src, alt, positionX, positionY }) => {
  const classes = useStyles({ positionX, positionY })

  return (
    <img
      src={src}
      className={classes.image}
      alt={alt}
      onContextMenu={(e) => e.preventDefault()}
    />
  )
}

export default PortfolioImage
