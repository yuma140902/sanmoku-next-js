import Cell, { CellState } from "./Cell"
import { Player } from "./Game"

export type BoardProps = {
  player: Player
  setPlayer: (player: Player) => void
  cells: CellState[]
  setCell: (index: number, cell: CellState) => void
  finished: boolean
}

export default function Board(props: BoardProps) {

  function handleClick(index: number) {
    if (props.finished) return;
    if (props.cells[index] === 'empty') {
      if (props.player === 'white') {
        props.setCell(index, 'white')
        props.setPlayer('black')
      }
      else if (props.player === 'black') {
        props.setCell(index, 'black')
        props.setPlayer('white')
      }
    }
  }

  function createCell(index: number) {
    return <Cell state={props.cells[index]} handleClick={() => handleClick(index)} />
  }

  return (
    <div>
      <div>
        {createCell(0)}
        {createCell(1)}
        {createCell(2)}
      </div>
      <div>
        {createCell(3)}
        {createCell(4)}
        {createCell(5)}
      </div>
      <div>
        {createCell(6)}
        {createCell(7)}
        {createCell(8)}
      </div>
    </div>
  )
}

