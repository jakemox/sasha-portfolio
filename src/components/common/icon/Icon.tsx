import { lazy, type FC } from 'react'
import styled from '@emotion/styled'

const HamburgerIcon = lazy(() => import('../../../assets/icons/icon-hamburger.svg?react'))
const CloseIcon = lazy(() => import('../../../assets/icons/icon-close.svg?react'))
const EtsyIcon = lazy(() => import('../../../assets/icons/icon-etsy.svg?react'))
const InstagramIcon = lazy(() => import('../../../assets/icons/icon-instagram.svg?react'))

interface IconProps {
  name: string
  className?: string
}

type IconName = 'hamburger' | 'close' | 'etsy' | 'instagram'
type IconComponentType = React.FC<React.SVGProps<SVGSVGElement>>

const iconNameToComponent: Record<IconName, IconComponentType> = {
  close: CloseIcon,
  hamburger: HamburgerIcon,
  etsy: EtsyIcon,
  instagram: InstagramIcon,
}

const Icon: FC<IconProps> = ({ name, className }) => {
  const IconComponent = iconNameToComponent[name]

  if (!IconComponent) {
    console.error(`Icon not found: ${name}`)
    return null
  }

  return <IconComponent className={className} />
}

export default styled(Icon)`
  width: 1.25em;
  height: 1.25em;
  fill: currentColor;
`
