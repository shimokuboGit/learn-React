import { useEffect, useState } from "react"
import { GetAllTodos } from "./lib/todos"
import { Todo } from "./domain/todo"
import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  
  useEffect(() => {
    const getAllTodos = async () => {
      const todosData: Todo[] = await GetAllTodos()
      setTodos(todosData)
    }

    getAllTodos()
  }, [])

  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Done</Th>
              <Th isNumeric>CreatedAt</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos.map((todo) => (
              <Tr key={todo.id}>
                <Td>{todo.title}</Td>
                <Td>{todo.done ? "TRUE" : "FALSE"}</Td>
                <Td>{todo.created_at}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default App
