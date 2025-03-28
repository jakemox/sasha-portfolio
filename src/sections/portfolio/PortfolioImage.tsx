import { useState, type FC } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from '../../components/common/image/Image'
import styled from '@emotion/styled'
import { ContentfulImageApiParams } from '../../lib/contentfulImage'
import type { ImageFragment } from '../../gql/generated/graphql'

interface PortfolioImageProps {
  data: ImageFragment
}

const PortfolioImage: FC<PortfolioImageProps> = ({ data, ...rest }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const handleLoad = () => setIsLoaded(true)
  const handleError = () => setIsLoaded(true)

  const { image, focusArea } = data
  const { url, title, width, height } = image
  return (
    <StyledImage
      src={url}
      alt={title}
      width={width}
      height={height}
      contentfulApiParams={{
        f: focusArea as ContentfulImageApiParams['f'],
      }}
      loading="lazy"
      onLoad={handleLoad}
      onError={handleError}
      isLoaded={isLoaded && inView}
      ref={ref}
      {...rest}
    />
  )
}

export default PortfolioImage

interface StyledImageProps {
  isLoaded: boolean
}

const StyledImage = styled(Image, {
  shouldForwardProp: (prop) => prop !== 'isLoaded',
})<StyledImageProps>`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 1s ease;
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
`
