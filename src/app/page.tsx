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
}

function Board(props: BoardProps) {

  function handleClick(index: number) {
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

function Game() {
  const [player, setPlayer] = useState<Player>('white');
  const [cells, setCells] = useState<CellState[]>(Array(9).fill('empty'));

  return (
    <Board player={player} setPlayer={setPlayer} cells={cells}
      setCell={(index, cell) => setCells(cells.map((old, i) => i == index ? cell : old))} />
  )
}

export default function Home() {
  return (
    <Game />
  )
}
