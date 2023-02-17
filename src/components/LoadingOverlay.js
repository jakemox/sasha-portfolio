import React from 'react'
import { Box, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  loadingContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '2rem',
  },
}))

const LoadingOverlay = () => {
  const classes = useStyles()

  return (
    <Box className={classes.loadingContainer}>
      <CircularProgress />
    </Box>
  )
}

export default LoadingOverlay
