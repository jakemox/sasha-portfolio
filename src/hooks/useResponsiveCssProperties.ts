import { css, SerializedStyles } from '@emotion/react'
import type {
  ResponsiveCssMediaFragment,
  ResponsiveCssPositionFragment,
  ResponsiveCssSizeFragment,
} from '../gql/generated/graphql'
import { breakpoints } from '../theme/breakpoints'
import { rejectNil } from '../lib/common'
import { FC } from 'react'
import styled, { StyledComponent } from '@emotion/styled'

type PositionProperties = 'top' | 'right' | 'bottom' | 'left'

type SizeProperties = 'width' | 'min-width' | 'max-width' | 'height' | 'min-height' | 'max-height'

type MediaProperties = 'opacity' | 'object-fit' | 'object-position'

enum Viewports {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
}

type SupportedCssProperties = PositionProperties | SizeProperties | MediaProperties

type CssProperties = {
  [key in SupportedCssProperties]?: string
}

type PropertiesByViewport = {
  [key in Viewports]?: CssProperties
}

interface ResponsiveCssProperty {
  property?: string | null
  mobile?: string | null
  tablet?: string | null
  desktop?: string | null
}

export type SupportedCssPropertyFragments = (
  | ResponsiveCssPositionFragment
  | ResponsiveCssSizeFragment
  | ResponsiveCssMediaFragment
  | null
  | undefined
)[]

const renderCssString = (properties: CssProperties): string => {
  return Object.keys(properties)
    .map((key) => `${key}: ${properties[key]};`)
    .join('')
}

const getPropertiesByViewport = (responsivePropertyFragment: ResponsiveCssProperty[]) =>
  responsivePropertyFragment.reduce<PropertiesByViewport>((propertiesByViewport, cssProperty) => {
    Object.values(Viewports).forEach((viewport) => {
      if (cssProperty.property && cssProperty[viewport]) {
        propertiesByViewport[viewport] = {
          ...propertiesByViewport[viewport],
          [cssProperty.property]: cssProperty[viewport],
        }
      }
    })
    return propertiesByViewport
  }, {})

export const getResponsiveCssProperties = (
  properties?: SupportedCssPropertyFragments,
  defaults?: CssProperties,
): SerializedStyles | string => {
  const filteredProperties = rejectNil(properties || [])
  if (!filteredProperties?.length) return ''

  const { mobile, tablet, desktop } = getPropertiesByViewport(filteredProperties)

  return css`
    ${renderCssString({ ...defaults, ...mobile })}

    ${tablet &&
    `
    @media (min-width: ${breakpoints.sm.minWidth}) and (max-width: ${breakpoints.sm.maxWidth}) {
      ${renderCssString(tablet)}
    }
    `}

    ${desktop &&
    `
    @media (min-width: ${breakpoints.md.minWidth}) {
      ${renderCssString(desktop)}
    }
    `}
  `
}

export const useResponsiveCssProperties = <P extends object>(
  component: FC<P>,
  properties?: SupportedCssPropertyFragments,
  defaults?: CssProperties,
): StyledComponent<P> | FC<P> => {
  if (!properties?.length) return component

  return styled(component)`
    ${getResponsiveCssProperties(properties, defaults)}
  `
}
