// @flow

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import PortfolioItem from './PortfolioItem/PortfolioItem'
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
import Carousel from './Carousel/Carousel'

const portfolioItems = [
  {
    columns: 4,
    image: Poses,
  },
  {
    columns: 4,
    image: BobCover,
  },
  {
    columns: 4,
    image: PartridgeCard,
  },
  {
    columns: 6,
    image: CharacterSheet,
  },
  {
    columns: 6,
    image: Assignment,
  },
  {
    columns: 8,
    image: BobAndBug,
  },
  {
    columns: 4,
    image: Daisies,
  },
  {
    columns: 5,
    image: Robin,
  },
  {
    columns: 7,
    image: Butterfly,
  },
  {
    columns: 7,
    image: Tortoise,
  },
  {
    columns: 5,
    image: Accessories,
  },
  {
    columns: 4,
    image: SeventiesFlower,
  },
  {
    columns: 4,
    image: DaisyMoon,
  },
  {
    columns: 4,
    image: Marigold1,
  },
  {
    columns: 5,
    image: BlueFlower,
  },
  {
    columns: 3,
    image: PaisleyFlower,
  },
  {
    columns: 4,
    image: Bird,
  },
]

const useStyles = makeStyles((theme) => ({
}));


const Portfolio = () => {
  const classes = useStyles();
  const [carouselIsOpen, setCarouselIsOpen] = useState(false)
  const [carouselInitialSlide, setCarouselInitialSlide] = useState(0)

  const handleCarouselOpen = (i) => {
    setCarouselInitialSlide(i)
    setCarouselIsOpen(true)
  }

  const handleCarouselClose = () => {
    setCarouselIsOpen(false)
  }

  return (
    <>
      <Grid container spacing={2} className={classes.portfolio}>
        {portfolioItems.map((item, i) =>
          <PortfolioItem 
            key={i}
            index={i}
            image={item.image}
            columns={item.columns}
            onClick={handleCarouselOpen}
          />
        )}
      </Grid>
      <Carousel 
        isOpen={carouselIsOpen}
        handleClose={handleCarouselClose}
        initialSlide={carouselInitialSlide}
        slides={portfolioItems}
      />
    </>
  )
}

export default Portfolio