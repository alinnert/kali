import { zipObject } from 'es-toolkit'

const colorIndexes = [1, 2, 3] as const
type ColorIndex = (typeof colorIndexes)[number]
export type OklchColorSet = Record<`color${ColorIndex}`, string>
export type ColorPickerColor = { type: 'hue'; hue: number } | { type: 'gray'; gray: number }

export const lightnessValues = { color1: '80%', color2: '88%', color3: '92%' }
export const chromaValues = { color1: '0.12', color2: '0.07', color3: '0.03' }
export const grayLightnessDeltas = { color1: 0, color2: 5, color3: 10 }

export function getOklch(colorIndex: ColorIndex, color: ColorPickerColor): `oklch(${string})` {
  let l, c, h

  switch (color.type) {
    case 'hue': {
      l = lightnessValues[`color${colorIndex}`]
      c = chromaValues[`color${colorIndex}`]
      h = color.hue
      break
    }
    case 'gray': {
      l = `${color.gray + grayLightnessDeltas[`color${colorIndex}`]}%`
      c = 0
      h = 0
    }
  }

  return `oklch(${l ?? '100%'} ${c ?? '0'} ${h ?? '0'})`
}

export function getOklchColorSet(color: ColorPickerColor): OklchColorSet {
  const keys = colorIndexes.map((n) => `color${n}`)
  const values = colorIndexes.map((n) => getOklch(n, color))
  return zipObject(keys, values) as OklchColorSet
}
