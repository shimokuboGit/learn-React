import { Todo } from "../domain/todo";
import { supabase } from "../utils/supabase";

export async function GetAllTodos(): Promise<Todo[]> {
  const response = await supabase.from("todos").select("*");

  if (response.error) {
    throw new Error(response.error.message)
  }

  const result = response.data.map((todo) => {
    return Todo.newTodo(
      todo.id,
      todo.title,
      todo.done,
      todo.created_at
    )
  })

  return result
}