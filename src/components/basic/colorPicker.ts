import { zipObject } from 'es-toolkit'

const colorIndexes = [1, 2, 3] as const
type ColorIndex = (typeof colorIndexes)[number]
export type OklchColorSet = Record<`color${ColorIndex}`, string>

export const lightnessValues = { color1: '74%', color2: '90%', color3: '95%' }
export const chromaValues = { color1: '0.12', color2: '0.07', color3: '0.05' }

export function getOklch(colorIndex: ColorIndex, hue: number): `oklch(${string})` {
  const lightness = lightnessValues[`color${colorIndex}`]
  const chroma = chromaValues[`color${colorIndex}`]
  return `oklch(${lightness} ${chroma} ${hue})`
}

export function getOklchColorSet(hue: number): OklchColorSet {
  const keys = colorIndexes.map(n => `color${n}`)
  const values = colorIndexes.map(n => getOklch(n, hue))
  return zipObject(keys, values) as OklchColorSet
}
