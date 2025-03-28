import { forwardRef, type ImgHTMLAttributes } from 'react'
import getMultipleImageSrc, { ContentfulImageApiParams } from '../../../lib/contentfulImage'

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /* @see [Contentful Image API](https://www.contentful.com/developers/docs/references/images-api/) */
  contentfulApiParams?: ContentfulImageApiParams
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, contentfulApiParams, ...rest }, ref) => {
    const { src1x, src1xWebP, src1xAvif } = getMultipleImageSrc(src, contentfulApiParams)

    return (
      <picture>
        <source srcSet={`${src1xAvif}`} type="image/avif" />
        <source srcSet={`${src1xWebP}`} type="image/webp" />
        <source srcSet={`${src1x}`} />
        <img {...rest} src={src1x} alt={alt ?? ''} ref={ref} />
      </picture>
    )
  },
)

export default Image
