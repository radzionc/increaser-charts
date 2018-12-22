const COLORS = [
  '#7FDBFF',
  '#3D9970',
  '#01FF70',
  '#FF851B',
  '#85144b',
  '#FF851B',
  '#B10DC9',
  '#AAAAAA'
]

const MIN_TOTAL_HEIGHT = 0
const MAX_TOTAL_HEIGHT = 10

const MIN_SUBBAR_HEIGHT = 1

const getGaussianRandomNumber = () => new Array(6)
  .fill(0)
  .map(() => Math.random())
  .reduce((acc, n) => acc + n, 0) / 6

const getMockBar = () => {
  const randNumber = getGaussianRandomNumber()
  const height = MIN_TOTAL_HEIGHT + randNumber * (MAX_TOTAL_HEIGHT - MIN_TOTAL_HEIGHT + 1)

  const getSubbars = (heightLeft, freeColors, result) => {
    if (heightLeft === 0) return result
    if (freeColors.length < 2) {
      const subbar = {
        value: heightLeft,
        color: freeColors[0]
      }
      return [ ...result, subbar ]
    }

    const getSubbarHeight = () => {
      const randomHeight = Math.random() * heightLeft
      const height = randomHeight < MIN_SUBBAR_HEIGHT ? randomHeight + MIN_SUBBAR_HEIGHT : randomHeight
      const totalHeightAfter = heightLeft - height

      if (totalHeightAfter < MIN_SUBBAR_HEIGHT) return heightLeft

      return height
    }
    const value = getSubbarHeight()
    const [color, ...newFreeColors] = freeColors
    const subbar = {
      value,
      color
    }

    return getSubbars(heightLeft - value, newFreeColors, [ ...result, subbar ])
  }
  
  return getSubbars(height, COLORS, [])
}

export const getMockBars = (number) => {
  const bars = new Array(number)
    .fill(0)
    .map(getMockBar)

  return bars
}
