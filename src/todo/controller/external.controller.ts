import { FastifyReply, FastifyRequest } from 'fastify'

import {
  buildTodoView,
  createTodo,
  deleteTodoById,
  findTodoById,
  findTodos,
  TodoCreateRequest,
  TodoFilter,
  TodoUpdateRequest,
  updateTodoById,
} from '..'

export async function createTodoAction(
  request: FastifyRequest<{ Body: TodoCreateRequest }>,
  reply: FastifyReply,
) {
  const { title, description } = request.body

  const todo = await createTodo({ title, description })

  reply.status(201)
  return { todo: buildTodoView(todo) }
}

export async function findTodosAction(
  request: FastifyRequest<{ Querystring: TodoFilter }>,
  reply: FastifyReply,
) {
  const { from = 0, size = 20 } = request.query

  const todos = await findTodos({ from, size })

  reply.status(200)
  return { todos: todos.map(buildTodoView) }
}

export async function findTodoAction(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const { id } = request.params

  const todo = await findTodoById(id)

  reply.status(200)
  return { todo: buildTodoView(todo) }
}

export async function updateTodoAction(
  request: FastifyRequest<{ Params: { id: string }; Body: TodoUpdateRequest }>,
  reply: FastifyReply,
) {
  const { id } = request.params
  const { title, description } = request.body

  const todo = await updateTodoById(id, { title, description })

  reply.status(200)
  return { todo: buildTodoView(todo) }
}

export async function deleteTodoAction(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const { id } = request.params

  await deleteTodoById(id)

  reply.status(204)
}
