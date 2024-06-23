export const CompleteTodos = (props) => {
  
  const {todos, onClickBack} = props

  return (
    <div className='complete-area'>
    <p className='title'>Complete TOTO</p>
    <ul>
      {todos.map((todo, index) => (
        <li key={todo}>
          <div className='list-row'>
            <p className='todo-item'>{todo}</p>
            <button onClick={() => onClickBack(index)}>Back</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  )
}