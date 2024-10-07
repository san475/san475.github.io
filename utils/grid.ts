
enum CellColor {
  disabled = 'darkslategray',
  enabled = 'slategray',
  mine = 'maroon'
}

const keyToY = (key: number, gridSize: number) => {
  return Math.floor((key - 1) / gridSize)
}
const keyToX = (key: number, gridSize: number) => {
  return (key - 1) % gridSize
}


const getCellFromKey = (grid: GridObject, key: number, gridSize: number) => {

  let x = keyToX(key, gridSize)
  let y = keyToY(key, gridSize)

  return grid.array[y][x]
}

const setEnabledCellColor = (cell: CellObject, party_mode: boolean, hue: Ref<number>) => {

  if (party_mode) {
    cell.backColor = `hsl(${hue} 50% 50%)`
    hue.value = (hue.value + 3) % 360;
  } else {
    cell.backColor = CellColor.enabled;
  }
}

const setupGrid: (gridSize: number) => GridObject = (gridSize) => {

  const grid: GridObject = reactive({ array: [], mine: { x: 0, y: 0 }, message: "Find the mine?" })

  grid.mine = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  }

  let key: number = 1;

  let row: CellObject[] = []

  for (let i = 0; i < gridSize; i++) {
    for (let i = 0; i < gridSize; i++) {
      row.push({
        key: key++,
        value: 0,
        backColor: CellColor.disabled,
        active: false
      })
    }
    grid.array.push(row)
    row = []
  }

  return grid;
}

export { CellColor, keyToX, keyToY, setEnabledCellColor, getCellFromKey, setupGrid };