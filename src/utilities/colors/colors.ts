import { RGBColor, rgb } from 'd3-color'
import { getRandomInteger } from '../../utilities'
import { Contrast } from '../../types'

// Get a random RGB colour
export const getRandomColor = (
  contrast: Contrast = 'light',
  boundary = 170
) => {
  const iRGB = () => getRandomInteger(0, 255)
  let itemValues: number[] = []
  while (!itemValues.length || !colorFilter(contrast, boundary, itemValues)) {
    itemValues = [iRGB(), iRGB(), iRGB()]
  }
  return rgb(itemValues[0], itemValues[1], itemValues[2])
}

// Filter out colours that are too light or dark
export const colorFilter = (
  contrast: Contrast,
  boundary: number,
  itemValues: number[]
) => {
  let isPass = false
  if (!itemValues.length) {
    isPass = false
  } else if (!contrast) {
    isPass = true
  } else {
    const brightness =
      (itemValues[0] * 299 + itemValues[1] * 587 + itemValues[2] * 114) / 1000
    if (contrast === 'light') {
      isPass = brightness < boundary
    } else if (contrast === 'dark') {
      isPass = brightness > boundary
    }
  }
  return isPass
}

// Get a whole palette of random colours for a chart
export const getRandomPalette = (length = 10) => {
  let count = length
  const palette = []
  while (count--) {
    palette.push(getRandomColor())
  }
  return palette
}

// Get a darker variant of a colour
export const getDarkerColor = (color: RGBColor) => color.darker(0.5)

// Convert a hex colour to an RGB colour
export const convertHexToRgb = (color: string) => rgb(color)
