export const IncompleteTodos = (props) => {
  
  const { incompleteTodos, onClickComplete, onClickRemove } = props
  
  return (
    <div className='incomplete-area'>
    <p className='title'>Imcomplete TOTO</p>
    <ul>
      {incompleteTodos.map((todo, index) => (
          <li key={todo}>
            <div className='list-row'>
              <p className='todo-item'>{todo}</p>
              <button onClick={() => onClickComplete(index)}>Done</button>
              <button onClick={() => onClickRemove(index)}>remove</button>
            </div>
          </li>
        )
      )}
    </ul>
  </div>
  )
}