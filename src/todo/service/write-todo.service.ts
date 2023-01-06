import { TodoModel, todoRepository } from '..'

export function createTodo(
  { title, description }: { title: string; description?: string },
  { createTodo = todoRepository.createTodo } = {},
): Promise<TodoModel> {
  return createTodo({ title, description })
}

export async function updateTodoById(
  id: string,
  { title, description }: { title: string; description?: string },
  {
    updateTodoById = todoRepository.updateTodoById,
    findTodoById = todoRepository.findTodoById,
  } = {},
): Promise<TodoModel> {
  const todo = await findTodoById(id)

  if (!todo) {
    throw new Error(`Todo ${id} not found`)
  }

  await updateTodoById(id, { title, description })
  return { ...todo, title, description }
}

export function deleteTodoById(
  id: string,
  { deleteTodoById = todoRepository.deleteTodoById } = {},
): Promise<void> {
  return deleteTodoById(id)
}
