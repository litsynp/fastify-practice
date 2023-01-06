import { v4 as uuid } from 'uuid'

import { todoMongoDbClient } from '../db/mongo'

import { TodoModel } from '.'

function findTodoById(id: string): Promise<TodoModel | null> {
  return todoMongoDbClient.findOne({ _id: id, deletedAt: { $exists: false } })
}

function findTodos({
  from,
  size,
}: {
  from: number
  size: number
}): Promise<TodoModel[]> {
  return todoMongoDbClient
    .find(
      { deletedAt: { $exists: false } },
      { sort: { createdAt: -1 }, skip: from, limit: size },
    )
    .toArray()
}

async function createTodo({
  title,
  description,
}: {
  title: string
  description?: string
}): Promise<TodoModel> {
  const todo: TodoModel = {
    _id: uuid(),
    title,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await todoMongoDbClient.insertOne(todo)
  return todo
}

async function updateTodoById(
  id: string,
  {
    title,
    description,
  }: {
    title: string
    description?: string
  },
): Promise<void> {
  await todoMongoDbClient.updateOne(
    { _id: id },
    { $set: { title, description, updatedAt: new Date() } },
  )
}

async function deleteTodoById(id: string): Promise<void> {
  await todoMongoDbClient.updateOne(
    { _id: id },
    { $set: { deletedAt: new Date() } },
  )
}

export const todoRepository = {
  findTodoById,
  findTodos,
  createTodo,
  updateTodoById,
  deleteTodoById,
}
