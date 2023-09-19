"use client"
import { useState } from "react"

type Player = 'white' | 'black';
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

function Board() {
  const [player, setPlayer] = useState<Player>('white');
  const [cells, setCells] = useState<CellState[]>(Array(9).fill('empty'));

  function handleClick(index: number) {
    if (cells[index] === 'empty') {
      if (player === 'white') {
        setCells(cells.map((old, i) => i == index ? 'white' : old));
        setPlayer('black')
      }
      else if (player === 'black') {
        setCells(cells.map((old, i) => i == index ? 'black' : old));
        setPlayer('white')
      }
    }
  }

  function createCell(index: number) {
    return <Cell state={cells[index]} handleClick={() => handleClick(index)} />
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

export default function Home() {
  return (
    <Board />
  )
}
