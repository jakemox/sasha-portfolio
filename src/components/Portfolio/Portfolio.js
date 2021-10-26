// @flow

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { SRLWrapper } from 'simple-react-lightbox'

// const SeventiesFlower = lazy(() => import('../../assets/images/70s-flower.jpg'));
// const Accessories = lazy(() => import('../../assets/images/accessories.jpg'));
// const Assignment = lazy(() => import('../../assets/images/assignment.jpg'));
// const Bird = lazy(() => import('../../assets/images/bird.jpg'));
// const BlueFlower = lazy(() => import('../../assets/images/blue-flower.jpg'));
// const BobAndBug = lazy(() => import('../../assets/images/bob-and-bug.jpg'));
// const BobCover = lazy(() => import('../../assets/images/bob-cover.jpg'));
// const Butterfly = lazy(() => import('../../assets/images/butterfly.jpg'));
// const CharacterSheet = lazy(() => import('../../assets/images/character-sheet.jpg'));
// const Daisies = lazy(() => import('../../assets/images/daisies.jpg'));
// const DaisyMoon = lazy(() => import('../../assets/images/daisy-moon.jpg'));
// const Marigold1 = lazy(() => import('../../assets/images/marigold-1.jpg'));
// const PaisleyFlower = lazy(() => import('../../assets/images/paisley-flower.jpg'));
// const PartridgeCard = lazy(() => import('../../assets/images/partridge-card.jpg'));
// const Poses = lazy(() => import('../../assets/images/poses.jpg'));
// const Robin = lazy(() => import('../../assets/images/robin.jpg'));
// const Tortoise = lazy(() => import('../../assets/images/tortoise.jpg'));

import SeventiesFlower from '../../assets/images/70s-flower.jpg'
import Accessories from '../../assets/images/accessories.jpg'
import Assignment from '../../assets/images/assignment.jpg'
import Bird from '../../assets/images/bird.jpg'
import BlueFlower from '../../assets/images/blue-flower.jpg'
import BobAndBug from '../../assets/images/bob-and-bug.jpg'
import BobCover from '../../assets/images/bob-cover.jpg'
import Butterfly from '../../assets/images/butterfly.jpg'
import CharacterSheet from '../../assets/images/character-sheet.jpg'
import Daisies from '../../assets/images/daisies.jpg'
import DaisyMoon from '../../assets/images/daisy-moon.jpg'
import Marigold1 from '../../assets/images/marigold-1.jpg'
import PaisleyFlower from '../../assets/images/paisley-flower.jpg'
import PartridgeCard from '../../assets/images/partridge-card.jpg'
import Poses from '../../assets/images/poses.jpg'
import Robin from '../../assets/images/robin.jpg'
import Tortoise from '../../assets/images/tortoise.jpg'

const portfolioItems = [
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
    columns: 4,
    image: PartridgeCard,
    alt: 'Partridge Card',
  },
  {
    columns: 6,
    image: CharacterSheet,
    alt: 'Character Sheet',
  },
  {
    columns: 6,
    image: Assignment,
    alt: 'Assignment',
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
    columns: 5,
    image: Robin,
    alt: 'Robin',
  },
  {
    columns: 7,
    image: Butterfly,
    alt: 'Butterfly',
  },
  {
    columns: 7,
    image: Tortoise,
    alt: 'Tortoise',
  },
  {
    columns: 5,
    image: Accessories,
    alt: 'Accessories',
  },
  {
    columns: 4,
    image: SeventiesFlower,
    alt: 'Seventies Flower',
  },
  {
    columns: 4,
    image: DaisyMoon,
    alt: 'Daisy Moon',
  },
  {
    columns: 4,
    image: Marigold1,
    alt: 'Marigold 1',
  },
  {
    columns: 5,
    image: BlueFlower,
    alt: 'Blue Flower',
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