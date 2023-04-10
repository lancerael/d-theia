import { json } from 'd3-fetch'

// Fetch JSON from a url
export const getPromiseJSON = (url?: string) => {
  if (typeof url === 'string' && url) {
    return json(url)
  }
  throw new Error('No valid data API string provided.')
}

// Trumcate a string to a specified length
export const truncateString = (value: string, maxLength: number) => {
  if (value.length > maxLength) {
    return `${value.slice(0, maxLength - 3)}...`
  }
  return value
}

// Get a random number within a range, omitting certain values if needed
export const getRandomInteger = (
  minValue: number,
  maxValue: number,
  omitValue?: number
) => {
  let iInt =
    Math.floor(Math.random() * (minValue - maxValue - 1)) + maxValue + 1
  if (omitValue) {
    while (iInt === omitValue) {
      iInt = getRandomInteger(minValue, maxValue)
    }
  }
  return iInt
}
