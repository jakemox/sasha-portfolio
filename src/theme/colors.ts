import type { ThemeColors } from './types'

export const commonColors = {
  neutral0: '#FFF',
  neutral5: '#f8f8f8',
  neutral10: '#f3f4f5',
  neutral20: '#e7e9eb',
  neutral30: '#d0d3d7',
  neutral40: '#b8bdc3',
  neutral50: '#8e949c',
  neutral60: '#666c74',
  neutral70: '#535860',
  neutral80: '#353a41',
  neutral90: '#151a20',
  neutral100: '#000',
} as const

const themePalette = {
  darkBrown: '#414439',
  pink: '#f57e9c',
  purple: '#b870a1',
} as const

const {
  // neutral100,
  // neutral90,
  // neutral80,
  // neutral60,
  // neutral50,
  neutral40,
  neutral20,
  neutral10,
  // neutral5,
  neutral0,
} = commonColors

const { darkBrown, pink, purple } = themePalette

export const themeColors: ThemeColors = {
  text: {
    primary: darkBrown,
    inverse: neutral0,
    secondary: purple,
    disabled: neutral40,
  },
  bg: {
    primary: neutral0,
    inverse: darkBrown,
    secondary: pink,
  },
  icon: {
    primary: darkBrown,
    inverse: neutral0,
    disabled: neutral40,
    accent: purple,
  },
  button: {
    primary: {
      default: pink,
      hover: pink,
    },
    inverse: {
      default: neutral0,
      hover: neutral10,
    },
    accent: {
      default: purple,
      hover: purple,
    },
    disabled: neutral20,
  },
}
