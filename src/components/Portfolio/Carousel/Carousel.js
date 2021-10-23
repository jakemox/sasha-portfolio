// @flow

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Grid, Modal } from '@material-ui/core'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  modal: {

  },
  backdropProps: {
    backgroundColor: '#fff !important',
  },
  innerModal: {
    '& .slick-arrow': {
      zIndex: 1,
    },
    '& .slick-prev': {
      left: '25px',
    },
    '& .slick-next': {
      right: '25px',
    },
    '& .slick-prev:before, .slick-next:before': {
      color: theme.palette.primary.main,
    },
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1,
  },
  image: {
    maxWidth: '100%',
    maxHeight: '86vh',
    margin: '7vh auto',
    width: 'unset !important',
    display: 'block !important',
  },
}));


const Carousel = ({isOpen, handleClose, initialSlide, slides}) => {
  const classes = useStyles();

  const sliderSettings = {
    // centerMode: true,
    dots: false,
    infinite: true,
    initialSlide: initialSlide,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // variableWidth: true,
  }

  return (
    <Modal 
      aria-describedby="simple-modal-description"
      aria-labelledby="simple-modal-title"
      BackdropProps={{
        className: classes.backdropProps,
      }}
      // BackdropComponent={Backdrop}
      onClose={handleClose}
      open={isOpen}
    >
      <Box className={classes.modal}>
        <IconButton
          className={classes.closeButton}
          color="primary"
          onClick={handleClose}
        >
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
        <Box className={classes.innerModal}>
          <Slider
            {...sliderSettings}
          >
            {
              slides.map((slide, i) => {
                return (
                  <img key={i} src={slide.image} className={classes.image} />
                )
              })
            }
          </Slider>
        </Box>
      </Box>
    </Modal>
  )
}

export default Carousel