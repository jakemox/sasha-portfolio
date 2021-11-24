// @flow

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { SRLWrapper } from 'simple-react-lightbox'

import Baking from '../../assets/images/baking.jpg'
import Bird from '../../assets/images/bird.jpg'
import BirthdayFlower from '../../assets/images/birthday-flower.jpg'
import BlueFlower from '../../assets/images/blue-flower.jpg'
import BobAndBug from '../../assets/images/bob-and-bug.jpg'
import BobCover from '../../assets/images/bob-cover.jpg'
import Butterfly from '../../assets/images/butterfly.jpg'
import CharacterSheet from '../../assets/images/seed-book-character-sheet.jpg'
import Daisies from '../../assets/images/daisies.jpg'
import Emotions from '../../assets/images/emotions.jpg'
import Marigold1 from '../../assets/images/marigold-1.jpg'
import Marigold2 from '../../assets/images/marigold-2.jpg'
import MumFlower from '../../assets/images/mum-flower.jpg'
import PaintPurple from '../../assets/images/paint-purple-spread.jpg'
import PaisleyFlower from '../../assets/images/paisley-flower.jpg'
import PartridgeCard from '../../assets/images/partridge-card.jpg'
import Poses from '../../assets/images/poses.jpg'
import Robin from '../../assets/images/robin.jpg'
import SashaPurple from '../../assets/images/sasha-purple.jpg'
import WildFlowers from '../../assets/images/wild-flowers.jpg'

const portfolioItems = [
  {
    columns: 7,
    image: PaintPurple,
    alt: 'I Paint Purple Spread',
  },
  {
    columns: 5,
    image: SashaPurple,
    alt: 'Sasha Purple',
  },
  {
    columns: 4,
    image: Baking,
    alt: 'Baking',
  },
  {
    columns: 4,
    image: Poses,
    alt: 'Poses',
  },
  {
    columns: 4,
    image: BobCover,
    alt: 'Bob Cover',
  },
  {
    columns: 8,
    image: BobAndBug,
    alt: 'Bob and Bug',
  },
  {
    columns: 4,
    image: Daisies,
    alt: 'Daisies',
  },
  {
    columns: 6,
    image: CharacterSheet,
    alt: 'Seed Book Character Sheet',
  },
  {
    columns: 6,
    image: Emotions,
    alt: 'Emotions',
  },
  {
    columns: 4,
    image: WildFlowers,
    alt: 'Wild Flowers',
  },
  {
    columns: 4,
    image: MumFlower,
    alt: 'Flower',
  },
  {
    columns: 4,
    image: PartridgeCard,
    alt: 'Partridge Card',
  },
  {
    columns: 5,
    image: Robin,
    alt: 'Robin',
  },
  {
    columns: 3,
    image: PaisleyFlower,
    alt: 'Paisley Flower',
  },
  {
    columns: 4,
    image: Bird,
    alt: 'Bird',
  },
  {
    columns: 4,
    image: Marigold2,
    alt: 'Marigold',
  },
  {
    columns: 4,
    image: BirthdayFlower,
    alt: 'Birthday Flower',
  },
  {
    columns: 4,
    image: Marigold1,
    alt: 'Marigolds',
  }, 
  {
    columns: 5,
    image: BlueFlower,
    alt: 'Blue Flower',
  },
  {
    columns: 7,
    image: Butterfly,
    alt: 'Butterfly',
  },
]

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
    cursor: 'pointer',
  },
}));

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
  }
};


const Portfolio = () => {
  const classes = useStyles()

  return (
    <SRLWrapper options={options}>
      <Grid container spacing={2} className={classes.portfolio}>
          {portfolioItems.map((item, i) =>
            <Grid item xs={12} sm={item.columns} className={classes.portfolioItem} key={i} >
              <img src={item.image} className={classes.image} alt={item.alt} />
            </Grid>
          )}
      </Grid>
    </SRLWrapper>
  )
}

export default Portfolio