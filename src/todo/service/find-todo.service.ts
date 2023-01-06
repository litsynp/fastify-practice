import { TodoModel, todoRepository } from '../index'

export async function findTodoById(
  id: string,
  { findTodoById = todoRepository.findTodoById } = {},
): Promise<TodoModel> {
  const todo = await findTodoById(id)

  if (!todo) {
    throw new Error(`Todo ${id} not found`)
  }

  return todo
}

export function findTodos(
  { from, size }: { from: number; size: number },
  { findTodos = todoRepository.findTodos } = {},
): Promise<TodoModel[]> {
  return findTodos({ from, size })
}
