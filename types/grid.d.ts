
type CellObject = {
  key: number
  value: number
  backColor: CellColor | string
  active: boolean
}

type GridObject = {
  array: CellObject[][],
  mine: Mine,
  message: string
}

type Mine = {x: number, y: number};