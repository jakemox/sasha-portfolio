// @flow

import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'

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
  const theme = useTheme()

  const breakpoint = (size) => theme.breakpoints.values[size]

  const sizes = `(max-width: ${breakpoint('sm')}px) ${breakpoint(
    'sm'
  )}px, (max-width: ${breakpoint('lg')}px) ${breakpoint('lg')}px`

  return (
    <picture className={classes.picture}>
      {/* <source
        type='image/avif'
        srcSet={`${src}?w=${breakpoint('sm')}&fm=avif ${breakpoint(
          'sm'
        )}w, ${src}?w=${breakpoint('lg')}&fm=avif ${breakpoint(
          'lg'
        )}w, ${src}?fm=avif`}
        sizes={sizes}
      /> */}
      <source
        type='image/webp'
        srcSet={`${src}?w=${breakpoint('sm')}&fm=webp ${breakpoint(
          'sm'
        )}w, ${src}?w=${breakpoint('lg')}&fm=webp ${breakpoint(
          'lg'
        )}w, ${src}?fm=webp`}
        sizes={sizes}
      />
      <img
        srcSet={`${src}?w=${breakpoint('sm')} ${breakpoint(
          'sm'
        )}, ${src}?w=${breakpoint('lg')} ${breakpoint('lg')}w, ${src}`}
        sizes={`${sizes}, ${breakpoint('lg') + 1}px`}
        src={src}
        className={classes.image}
        alt={alt}
        loading='lazy'
        onContextMenu={(e) => e.preventDefault()}
      />
    </picture>
  )
}

export default PortfolioImage
