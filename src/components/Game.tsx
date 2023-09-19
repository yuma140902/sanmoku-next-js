import { useState } from "react";
import { CellState } from "./Cell";
import Board from "./Board";

export type Player = 'white' | 'black';

export type JudgeResult = {
  // ゲームが終了したかどうか
  finished: boolean
  // 勝者
  winner: Player | undefined
}

/**
 * 三目並べを表すコンポーネント
 */
export default function Game() {
  // 次に石を置くプレイヤー
  const [player, setPlayer] = useState<Player>('white')
  // 盤面の状態
  const [cells, setCells] = useState<CellState[]>(Array(9).fill('empty'))

  // 盤面からゲームの終了判定・勝者判定を行う
  function judge(cells: CellState[]): JudgeResult {
    let winner: Player | undefined = undefined
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (const [a, b, c] of lines) {
      if (cells[a] !== 'empty' && cells[a] === cells[b] && cells[b] === cells[c]) {
        if (cells[a] === 'white') {
          winner = 'white'
        }
        else {
          winner = 'black'
        }
      }
    }

    //
    let finished: boolean
    if (winner !== undefined) {
      // 勝者がいる場合、ゲームは終了している
      finished = true
    }
    else {
      // 勝者がいない場合、盤面が全て埋まっているならゲームは終了である
      finished = cells.every(v => v !== 'empty')
    }

    return { finished: finished, winner: winner }
  }

  // JudgeResultからユーザーに表示するためのメッセージを作る
  function getResultText(result: JudgeResult): string {
    if (result.finished) {
      if (result.winner !== undefined) {
        return `勝者は${result.winner}です！`
      }
      return '引き分けです'
    }
    return '試合中'
  }

  const result = judge(cells)

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold text-center">三目並べ</h1>
        <div className="my-5">
          <Board player={player} setPlayer={setPlayer} cells={cells} finished={result.finished}
            setCell={(index, cell) => setCells(cells.map((old, i) => i == index ? cell : old))} />
        </div>
        <p>
          {`${player}の手番です`}
        </p>
        <p>
          {getResultText(result)}
        </p>
      </div>
    </div>
  )
}
