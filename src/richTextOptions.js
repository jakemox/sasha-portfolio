import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  body: {
    '&:not(:last-child)': {
      marginBottom: '1rem',
    },
  },
}))

const options = (classes) => {
  return {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => {
        return (
          <Typography variant='body1' className={classes.body}>
            {children}
          </Typography>
        )
      },
      [INLINES.HYPERLINK]: (node, children) => (
        <Link href={node.data.uri}>{children}</Link>
      ),
    },
  }
}

const RichText = ({ data }) => {
  const classes = useStyles()

  return <>{documentToReactComponents(data, options(classes))}</>
}

export default RichText
