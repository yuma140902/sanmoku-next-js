export type CellState = 'empty' | 'white' | 'black';

export type CellProps = {
  // Cellの状態
  state: CellState
  // クリックされたときの処理
  handleClick: () => void
}

/**
 * 三目並べの1つのマスを表すコンポーネント
 */
export default function Cell(props: CellProps) {
  if (props.state === 'empty') {
    return (
      <button className="aspect-square border w-24 text-white" onClick={props.handleClick}>
        {props.state == 'empty' ? '(empty)' : props.state == 'white' ? '○' : '●'}
      </button>
    )
  }
  return (
    <button className="aspect-square border w-24" onClick={props.handleClick}>
      {props.state == 'white' ? '○' : '●'}
    </button>
  )
}
