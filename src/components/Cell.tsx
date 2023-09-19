export type CellState = 'empty' | 'white' | 'black';
export type CellProps = {
  state: CellState
  handleClick: () => void
}

export default function Cell(props: CellProps) {
  if (props.state === 'empty') {
    return (
      <button className="text-white aspect-square border w-24" onClick={props.handleClick}>
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
