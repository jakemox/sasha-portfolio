import { FC, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import styled from '@emotion/styled'
import { getResponsiveCssProperties } from '../../hooks/useResponsiveCssProperties'
import Image from '../../components/common/image/Image'
import { SerializedStyles } from '@emotion/react'
import { AnimatedImageFragmentDoc } from '../../gql/generated/graphql'
import { FragmentType, useFragment } from '../../gql/generated'

interface AnimatedImageLayerProps {
  data: FragmentType<typeof AnimatedImageFragmentDoc>
}

const AnimatedImageLayer: FC<AnimatedImageLayerProps> = ({ data }) => {
  const imageRef = useRef<HTMLImageElement>(null)

  const {
    image,
    positionStylesCollection,
    sizeStylesCollection,
    mediaStylesCollection,
    animationStyle,
  } = useFragment(AnimatedImageFragmentDoc, data)

  const responsiveCssProperties = getResponsiveCssProperties(
    [
      ...(positionStylesCollection.items || []),
      ...(sizeStylesCollection.items || []),
      ...(mediaStylesCollection.items || []),
    ],
    {
      width: '100%',
      'object-fit': 'contain',
    },
  )

  const isFloating = animationStyle === 'float'

  useGSAP(
    (_, contextSafe) => {
      if (imageRef.current && isFloating) {
        const el = imageRef.current

        const floatRange = gsap.utils.random(-30, 30)

        gsap.to(el, {
          xPercent: floatRange,
          yPercent: floatRange,
          scale: gsap.utils.random(0.95, 1.05),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 5),
          ease: 'power1.inOut',
        })

        const repelX = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power2.out' })
        const repelY = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power2.out' })

        const repelStrength = 50
        const repelRadius = 200

        const handleMouseMove = contextSafe((e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2

          const dx = centerX - e.clientX
          const dy = centerY - e.clientY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < repelRadius) {
            const force = (1 - distance / repelRadius) * repelStrength
            const offsetX = (dx / distance) * force
            const offsetY = (dy / distance) * force

            repelX(offsetX)
            repelY(offsetY)
          }
        })

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
          window.removeEventListener('mousemove', handleMouseMove)
        }
      }
    },
    { scope: imageRef },
  )

  return (
    <StyledImage
      src={image.url}
      loading="lazy"
      ref={imageRef}
      responsiveCssProperties={responsiveCssProperties}
    />
  )
}

export default AnimatedImageLayer

interface StyledImageProps {
  responsiveCssProperties?: SerializedStyles | string
  isFloating?: boolean
}

const StyledImage = styled(Image, {
  shouldForwardProp: (prop) => !['responsiveCssProperties', 'isFloating'].includes(prop),
})<StyledImageProps>`
  position: absolute;
  transition: transform 0.1s ease-out;

  ${({ responsiveCssProperties }) => responsiveCssProperties}
`
