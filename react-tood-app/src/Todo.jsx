import { useState } from 'react';
import './Todo.css';
import { InputTodo } from './components/InputTodo';
import { IncompleteTodos } from './components/IncompleteTodos';
import { CompleteTodos } from './components/CompleteTodos';

export const Todo = () => {
  const [todoText, setTodoText] = useState('')
  const [incompleteTodos, setIncompaleteTodos] = useState([])
  const [completeTodos, setCompleteTodos] = useState([])

  const onChangeTodoText = (event) => {
    setTodoText(event.target.value)
  }

  const onClickAdd = () => {
    if (todoText === '') return
    setIncompaleteTodos([...incompleteTodos, todoText])
    setTodoText('')
  }

  const onClickRemove = (index) => {
    const newTodo = [...incompleteTodos]
    newTodo.splice(index, 1)
    alert(newTodo)
    setIncompaleteTodos(newTodo)
  }

  const onClickComplete = (index) => {
    setCompleteTodos([...completeTodos, incompleteTodos[index]])
    incompleteTodos.splice(index, 1)
    setIncompaleteTodos(incompleteTodos)
  }

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos]
    newCompleteTodos.splice(index, 1)
    setCompleteTodos(newCompleteTodos)

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]]
    setIncompaleteTodos(newIncompleteTodos)
  }

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5
  
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={isMaxLimitIncompleteTodos}
      />
      {isMaxLimitIncompleteTodos && (
        <p style={{ color: 'red' }}>Incomplete Todo limit is 5</p>
      )}
      <IncompleteTodos 
        incompleteTodos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickRemove={onClickRemove}
      />
      <CompleteTodos
        todos={completeTodos}
        onClickBack={onClickBack}
      />
    </>
  );
}
