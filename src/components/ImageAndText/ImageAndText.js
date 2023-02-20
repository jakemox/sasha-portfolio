// @flow

import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import LoadingOverlay from '../LoadingOverlay'
import { makeStyles } from '@material-ui/core/styles'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'
import { isPreview } from '../../constants/constants'
import RichText from '../../richTextOptions'

const ImageAndTextQuery = gql`
  query ImageAndTextQuery($preview: Boolean!, $id: String!) {
    imageAndText(preview: $preview, id: $id) {
      heading {
        text
      }
      body {
        text {
          json
        }
      }
      image {
        title
        url
      }
    }
  }
`

const useStyles = makeStyles(() => ({
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
    cursor: 'pointer',
  },
}))

const ImageAndText = ({ id }) => {
  const classes = useStyles()

  const { data, error, loading } = useQuery(ImageAndTextQuery, {
    variables: {
      preview: isPreview,
      id,
    },
  })

  if (loading) return <LoadingOverlay />
  if (error) return <p>Error: {error.message}</p>

  const { heading, body, image } = data?.imageAndText

  return (
    <Box component='div'>
      <Grid container spacing={6} className={classes.gridContainer}>
        {/* Text */}
        <Grid item lg={7} md={6} sm={9} xl={7} xs={12}>
          <Box>
            <Typography
              component='h3'
              gutterBottom
              variant='h3'
              color='secondary'
            >
              {heading.text}
            </Typography>
            <RichText data={body.text.json} />
          </Box>
        </Grid>
        {/* Images */}
        <Grid container item lg={5} md={6} sm={9} xl={5} xs={12}>
          <img src={image.url} className={classes.image} alt={image.title} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ImageAndText
