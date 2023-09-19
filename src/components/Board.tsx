import Cell, { CellState } from "./Cell"
import { Player } from "./Game"

export type BoardProps = {
  // 次に石を置くプレイヤー
  player: Player
  // 次に石を置くプレイヤーを設定する
  setPlayer: (player: Player) => void
  // 盤面の状態
  cells: CellState[]
  // 盤面の状態を設定する
  setCell: (index: number, cell: CellState) => void
  // ゲームが終了しているかどうか
  finished: boolean
}

/**
 * 三目並べの盤面を表すコンポーネント
 */
export default function Board(props: BoardProps) {

  /**
   * index番目のCellがクリックされたときの処理
   */
  function handleClick(index: number) {
    // ゲームが終了しているなら何もしない
    if (props.finished) return;
    // Cellが空なら石を置き、次のターンにする
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

