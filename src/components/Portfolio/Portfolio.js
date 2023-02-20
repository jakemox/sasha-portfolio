// @flow

import React from 'react'
import { Grid } from '@material-ui/core'
import { SRLWrapper } from 'simple-react-lightbox'
import { gql } from 'apollo-boost'
import { isPreview } from '../../constants/constants'
import { useQuery } from 'react-apollo'
import LoadingOverlay from '../LoadingOverlay'
import PortfolioImage from './PortfolioImage'

// const portfolioItems = [
//   {
//     columns: 7,
//     image: PaintPurple,
//     alt: 'I Paint Purple Spread',
//   },
//   {
//     columns: 5,
//     image: SashaPurple,
//     alt: 'Sasha Purple',
//   },
//   {
//     columns: 4,
//     image: Baking,
//     alt: 'Baking',
//   },
//   {
//     columns: 4,
//     image: Poses,
//     alt: 'Poses',
//   },
//   {
//     columns: 4,
//     image: BobCover,
//     alt: 'Bob Cover',
//   },
//   {
//     columns: 8,
//     image: BobAndBug,
//     alt: 'Bob and Bug',
//   },
//   {
//     columns: 4,
//     image: Daisies,
//     alt: 'Daisies',
//   },
//   {
//     columns: 6,
//     image: CharacterSheet,
//     alt: 'Seed Book Character Sheet',
//   },
//   {
//     columns: 6,
//     image: Emotions,
//     alt: 'Emotions',
//   },
//   {
//     columns: 4,
//     image: WildFlowers,
//     alt: 'Wild Flowers',
//   },
//   {
//     columns: 4,
//     image: MumFlower,
//     alt: 'Flower',
//   },
//   {
//     columns: 4,
//     image: PartridgeCard,
//     alt: 'Partridge Card',
//   },
//   {
//     columns: 5,
//     image: Robin,
//     alt: 'Robin',
//   },
//   {
//     columns: 3,
//     image: PaisleyFlower,
//     alt: 'Paisley Flower',
//   },
//   {
//     columns: 4,
//     image: Bird,
//     alt: 'Bird',
//   },
//   {
//     columns: 4,
//     image: Marigold2,
//     alt: 'Marigold',
//   },
//   {
//     columns: 4,
//     image: BirthdayFlower,
//     alt: 'Birthday Flower',
//   },
//   {
//     columns: 4,
//     image: Marigold1,
//     alt: 'Marigolds',
//   },
//   {
//     columns: 5,
//     image: BlueFlower,
//     alt: 'Blue Flower',
//   },
//   {
//     columns: 7,
//     image: Butterfly,
//     alt: 'Butterfly',
//   },
// ]

const PortfolioQuery = gql`
  query PortfolioData($preview: Boolean!, $id: String!) {
    portfolio(preview: $preview, id: $id) {
      portfolioItemsCollection {
        items {
          title
          image {
            title
            url
          }
          imagePositionX
          imagePositionY
          columns
        }
      }
    }
  }
`

const options = {
  settings: {
    disablePanzoom: true,
  },
  buttons: {
    backgroundColor: 'transparent',
    iconColor: '#fff',
    showDownloadButton: false,
    showFullscreenButton: false,
  },
  caption: {
    showCaption: false,
  },
}

const Portfolio = ({ id }) => {
  const { data, error, loading } = useQuery(PortfolioQuery, {
    variables: {
      preview: isPreview,
      id,
    },
  })

  if (loading) return <LoadingOverlay />
  if (error) return <p>Error: {error.message}</p>

  const portfolioItems = data?.portfolio.portfolioItemsCollection.items

  return (
    <SRLWrapper options={options}>
      <Grid container spacing={2}>
        {portfolioItems.map(
          ({ columns, image, imagePositionX, imagePositionY }, i) => (
            <Grid item xs={12} sm={columns} key={i}>
              <PortfolioImage
                src={image.url}
                alt={image.title}
                positionX={imagePositionX}
                positionY={imagePositionY}
              />
            </Grid>
          )
        )}
      </Grid>
    </SRLWrapper>
  )
}

export default Portfolio
