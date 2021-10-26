// @flow

import React from 'react'
import { Box, Grid, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import profilePicture from '../../assets/images/sasha-profile.jpg'

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
}));

const About = () => {
  const classes = useStyles()
  
  return (
    <Box component="div">
      <Grid container spacing={6} className={classes.gridContainer}>
        {/* Text */}
        <Grid
          item
          lg={7}
          md={6}
          sm={9}
          xl={7}
          xs={12}
        >
          <Box >
          <Typography component="h3" gutterBottom variant="h3" color="secondary">
            About
          </Typography>
          <Typography variant="body1">
            Sasha Moxon is an illustrator and designer based in North
            London, UK. She graduated in 2014 from Middlesex University with
            a first class honours degree in Illustration.
          </Typography>
          <br />
          <Typography variant="body1">
            Sasha’s illustrations are inspired by her love of children’s
            books and psychedelic artwork from the 1960s-1970s. Her
            favourite illustrators include John Alcorn, Charley Harper, Mary
            Blair and Naiad and Walter Einsel.
          </Typography>
          <br />
          <Typography variant="body1">
            Sasha hand paints her illustrations using gouache on paper.
          </Typography>
          <br />
          <Typography variant="body1">
            For all enquiries please contact at <Link href="mailto:sasha_moxon@hotmail.com">sasha_moxon@hotmail.com</Link>.
          </Typography>
          </Box>
        </Grid>
        {/* Images */}
        <Grid
          container
          item
          lg={5}
          md={6}
          sm={9}
          xl={5}
          xs={12}
        >
          <img src={profilePicture} className={classes.image} alt="Sasha Profile" />
        </Grid>
      </Grid>
    </Box>
  )

}

export default About
