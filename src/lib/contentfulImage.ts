// TODO Add to this when needed
export interface ContentfulImageApiParams {
  h?: number
  w?: number
  /** Format to convert the image, should match with mimeType if defined. @default webp */
  fm?: 'jpg' | 'png' | 'webp' | 'avif'
  f?:
    | 'center'
    | 'top'
    | 'left'
    | 'bottom'
    | 'top_right'
    | 'top_left'
    | 'bottom_right'
    | 'bottom_left'
    | 'face'
    | 'faces'
    | 'right'
}

export default function getMultipleImageSrc(src: string, props: ContentfulImageApiParams = {}) {
  if (!checkIfContentfulImage(src)) {
    return {
      src1x: src,
      src1xWebP: src,
      src1xAvif: src,
      // src2x: src,
      // src2xWepP: src,
      // src2xAvif: src,
    }
  }

  const getFormattedString = (params: Partial<ContentfulImageApiParams>) =>
    src + getTransformContentfulImageParamString({ ...props, ...params })

  const getNonFormattedString = (params: Partial<ContentfulImageApiParams> = {}) =>
    src +
    getTransformContentfulImageParamString({
      ...props,
      ...params,
      fm: props?.fm === 'jpg' ? 'jpg' : 'png',
    })

  return {
    src1x: getNonFormattedString(),
    src1xWebP: getFormattedString({ fm: 'webp' }),
    src1xAvif: getFormattedString({ fm: 'avif' }),
    // src2x: getNonFormattedString(),
    // src2xWepP: getFormattedString({ fm: 'webp' }),
    // src2xAvif: getFormattedString({ fm: 'avif' }),
  }
}

function getTransformContentfulImageParamString(props: ContentfulImageApiParams = {}) {
  const transformParams = Object.entries(props).reduce((res, [key, value]) => {
    if (value) {
      res.set(key, value.toString())

      if (key === 'fm') {
        if (value === 'png') res.set('fl', 'png8')
        if (value === 'jpg') res.set('fl', 'progressive')
      }
    }
    return res
  }, new URLSearchParams())

  const transformParamsString = transformParams.toString()

  return transformParamsString ? `?${transformParamsString}` : ''
}

function checkIfContentfulImage(url: string): boolean {
  const contentfulImagePattern = /\:\/\/\w+.ctfassets.net\//
  return contentfulImagePattern.test(url)
}
