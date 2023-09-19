"use client"
import { useState } from "react"

type CellState = 'empty' | 'white' | 'black';
type CellProps = {
  state: CellState
  handleClick: () => void
}

function Cell(props: CellProps) {
  return (
    <button onClick={props.handleClick}>
      {props.state == 'empty' ? 'empty ' : props.state == 'white' ? '○' : '●'}
    </button>
  )
}

type Player = 'white' | 'black';
type BoardProps = {
  player: Player
  setPlayer: (player: Player) => void
  cells: CellState[]
  setCell: (index: number, cell: CellState) => void
  finished: boolean
}

function Board(props: BoardProps) {

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

type JudgeResult = {
  finished: boolean
  winner: Player | undefined
}


function Game() {
  const [player, setPlayer] = useState<Player>('white')
  const [cells, setCells] = useState<CellState[]>(Array(9).fill('empty'))

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

    let finished: boolean
    if (winner !== undefined) {
      finished = true
    }
    else {
      finished = cells.every(v => v !== 'empty')
    }

    return { finished: finished, winner: winner }
  }

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
    <div>
      <h1>三目並べ</h1>
      <Board player={player} setPlayer={setPlayer} cells={cells} finished={result.finished}
        setCell={(index, cell) => setCells(cells.map((old, i) => i == index ? cell : old))} />
      <p>
        {`${player}の手番です`}
      </p>
      <p>
        {getResultText(result)}
      </p>
    </div>
  )
}

export default function Home() {
  return (
    <Game />
  )
}
