// @flow

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, Link, SvgIcon, Typography } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram'
import { ReactComponent as EtsyIcon } from '../../../assets/images/icon-etsy.svg'
import { isPreview } from '../../../constants/constants'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

const FooterQuery = gql`
  query FooterData($limit: Int!, $preview: Boolean!) {
    footerCollection(limit: $limit, preview: $preview) {
      items {
        socialMediaLinksCollection {
          items {
            socialMediaSite
            url
          }
        }
        copyrightText {
          text
        }
      }
    }
  }
`

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialLinks: {
    display: 'flex',
  },
  socialLink: {
    display: 'inherit',
    paddingRight: theme.spacing(2),
  },
  socialIcon: {
    color: theme.palette.primary.main,
    transition: 'color .25s ease',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}))

const getSocialMediaIcon = (site) => {
  switch (site) {
    case 'Instagram':
      return InstagramIcon
    case 'Etsy':
      return EtsyIcon
    default:
      console.warn(`${site} icon does not exist`)
      return null
  }
}

const Footer = () => {
  const classes = useStyles()
  const { data } = useQuery(FooterQuery, {
    variables: { limit: 1, preview: isPreview },
  })

  const { socialMediaLinksCollection, copyrightText } =
    data?.footerCollection?.items[0] || {}

  return (
    <Box py={10} component='footer' className={classes.footer}>
      <Container>
        <Box className={classes.content}>
          <Box className={classes.socialLinks}>
            {socialMediaLinksCollection?.items.map(
              ({ socialMediaSite, url }, index) => (
                <Link
                  key={index}
                  className={classes.socialLink}
                  href={url}
                  target='_blank'
                >
                  <SvgIcon
                    className={classes.socialIcon}
                    component={getSocialMediaIcon(socialMediaSite)}
                  />
                </Link>
              )
            )}
          </Box>
          {copyrightText && (
            <Typography variant='body2'>
              {copyrightText.text.replace('{{date}}', new Date().getFullYear())}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
