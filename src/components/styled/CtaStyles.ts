import { css } from '@emotion/react'
import { themeColors } from '../../theme/colors'
import typography from '../../theme/typography'
import type { ElementLayout, ElementSize, ElementVariant } from '../../theme/types'

export interface CTAProps {
  size?: ElementSize
  variant?: ElementVariant
  layout?: ElementLayout
  iconOnly?: boolean
}

const commonCtaStyles = css`
  align-items: center;
  height: fit-content;
  font-family: inherit;
  font-weight: ${typography.fontWeights.medium};
  line-height: ${typography.lineHeights.base};
  text-decoration: none;
  border: none;
  position: relative;

  &:focus {
    outline: none;
  }
`

type ButtonPadding = { x: string; y: string }
const defaultButtonPadding: ButtonPadding = {
  x: '1.5rem',
  y: '0.75rem',
}
const buttonPaddingMap: { [size in ElementSize]: ButtonPadding } = {
  xs: { x: '1rem', y: '0.5rem' },
  sm: { x: '1.25rem', y: '0.6rem' },
  md: defaultButtonPadding,
  lg: { x: '2rem', y: '1rem' },
}
const buttonPaddingBySize = (size: ElementSize) => {
  const { x, y } = buttonPaddingMap[size] || defaultButtonPadding
  return css`
    padding: ${y} ${x};
  `
}

export const buttonStyles = ({ variant = 'solid', size }: CTAProps) => {
  const isInverse = variant === 'inverse'
  const style = isInverse ? 'inverse' : 'primary'
  const buttonColors = themeColors.button[variant] || themeColors.button[style]
  const colorText =
    variant === 'solid' || variant === 'accent'
      ? themeColors.text.inverse
      : themeColors.text.primary
  const colorMain = buttonColors.default
  const colorHover = buttonColors.hover

  return css`
    ${buttonPaddingBySize(size || 'md')};
    ${commonCtaStyles};
    display: flex;
    transition: color 0.2s ease;
    font-size: ${typography.fontSizes.base};
    background-color: ${colorMain};
    color: ${colorText};
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;

    &:hover {
      background-color: ${colorHover};
    }

    /* TODO Focus states */
  `
}

const defaultLinkStyles = css`
  &:focus-visible {
    outline: solid currentColor 2px;
    outline-offset: 0.2em;
  }
`

const inlineLinkStyles = css`
  text-underline-offset: 0.125em;

  &:hover {
    text-decoration: solid underline currentColor;
  }

  &:focus-visible {
    text-decoration: solid underline currentColor;
    text-decoration-style: double;
  }
`

export const linkStyles = ({ variant, layout }: CTAProps) => {
  const disabled = variant === 'disabled'
  const activeTextColor =
    variant === 'accent' || layout === 'inline' ? themeColors.text.secondary : 'currentColor'
  const textColor = disabled ? themeColors.text.disabled : activeTextColor

  return css`
    ${commonCtaStyles};
    display: ${layout === 'inline' ? 'inline-flex' : 'flex'};
    width: fit-content;
    cursor: ${disabled ? 'default' : 'pointer'};
    padding: 0;
    background-color: transparent;
    color: ${textColor};
    text-decoration: none;
    pointer-events: ${disabled ? 'none' : undefined};

    ${layout === 'inline' ? inlineLinkStyles : defaultLinkStyles}

    & > span {
      display: flex;
      align-items: center;
    }

    &:hover {
      color: hsl(from ${textColor} h s calc(l - 10));
    }

    &:focus-visible {
      color: hsl(from ${textColor} h s calc(l - 10));
    }
  `
}
