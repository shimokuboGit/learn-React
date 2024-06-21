import { useState } from 'react';
import './Todo.css';

export const Todo = () => {
  const [todoText, setTodoText] = useState('')
  const [incompleteTodos, setIncompaleteTodos] = useState(['todo1', 'todo2'])
  const [completeTodos, setCompleteTodos] = useState(['done todo1', 'done todo2'])

  const onChangeTodoText = (event) => {
    setTodoText(event.target.value)
  }

  const onClickAdd = () => {
    if (todoText === '') return
    setIncompaleteTodos([...incompleteTodos, todoText])
    setTodoText('')
  }
  return (
    <>
      <div className='input-area'>
        <input placeholder='something todo...' value={todoText} onChange={onChangeTodoText} />
        <button onClick={onClickAdd}>add</button>
      </div>
      <div className='incomplete-area'>
        <p className='title'>Imcomplete TOTO</p>
        <ul>
          {incompleteTodos.map((todo) => (
              <li key={todo}>
                <div className='list-row'>
                  <p className='todo-item'>{todo}</p>
                  <button>Done</button>
                  <button>remove</button>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
      <div className='complete-area'>
        <p className='title'>Complete TOTO</p>
        <ul>
          {completeTodos.map((todo) => (
            <li key={todo}>
              <div className='list-row'>
                <p className='todo-item'>{todo}</p>
                <button>Back</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
