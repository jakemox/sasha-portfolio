import type { FC, ImgHTMLAttributes } from 'react'
import getMultipleImageSrc, { ContentfulImageApiParams } from '../../../lib/contentfulImage'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /* @see [Contentful Image API](https://www.contentful.com/developers/docs/references/images-api/) */
  contentfulApiParams?: ContentfulImageApiParams
}

const Image: FC<ImageProps> = ({ src, alt, contentfulApiParams, ...rest }) => {
  const { src1x, src1xWebP, src1xAvif } = getMultipleImageSrc(src, contentfulApiParams)

  return (
    <picture>
      <source srcSet={`${src1xAvif}`} type="image/avif" />
      <source srcSet={`${src1xWebP}`} type="image/webp" />
      <source srcSet={`${src1x}`} />
      <img {...rest} src={src1x} alt={alt ?? ''} />
    </picture>
  )
}

export default Image
