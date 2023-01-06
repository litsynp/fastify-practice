import { Static, Type } from '@sinclair/typebox'

import { TodoModel } from '.'

export const TodoCreateRequestSchema = Type.Object({
  title: Type.String(),
  description: Type.Optional(Type.String()),
})
export type TodoCreateRequest = Static<typeof TodoCreateRequestSchema>

export const TodoUpdateRequestSchema = Type.Object({
  title: Type.String(),
  description: Type.Optional(Type.String()),
})
export type TodoUpdateRequest = Static<typeof TodoUpdateRequestSchema>

export const TodoViewSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  description: Type.Optional(Type.String()),
  createdAt: Type.String(),
  updatedAt: Type.String(),
})
export type TodoView = Static<typeof TodoViewSchema>

export const TodoViewListSchema = Type.Array(TodoViewSchema)
export type TodoViewList = Static<typeof TodoViewListSchema>

export const TodosFilterSchema = Type.Object({
  from: Type.Optional(Type.Number()),
  size: Type.Optional(Type.Number()),
})
export type TodoFilter = Static<typeof TodosFilterSchema>

export function buildTodoView({
  _id,
  title,
  description,
  createdAt,
  updatedAt,
}: TodoModel): TodoView {
  return {
    id: _id,
    title,
    description,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  }
}
