import { FastifyInstance } from 'fastify'

import {
  TodoCreateRequest,
  TodoCreateRequestSchema,
  TodoFilter,
  TodosFilterSchema,
  TodoUpdateRequest,
  TodoUpdateRequestSchema,
  TodoView,
  TodoViewListSchema,
  TodoViewSchema,
} from '..'

import {
  createTodoAction,
  deleteTodoAction,
  findTodoAction,
  findTodosAction,
  updateTodoAction,
} from './external.controller'

export function externalRoutes(
  server: FastifyInstance,
  opts: any,
  done: () => void,
) {
  server
    .post<{
      Body: TodoCreateRequest
      Reply: { todo: TodoView }
    }>(
      '/',
      {
        schema: {
          body: TodoCreateRequestSchema,
          response: { 201: { todo: TodoViewSchema } },
        },
      },
      createTodoAction,
    )
    .get<{
      Querystring: TodoFilter
      Reply: { todos: TodoView[] }
    }>(
      '/',
      {
        schema: {
          querystring: TodosFilterSchema,
          response: { 200: { todos: TodoViewListSchema } },
        },
      },
      findTodosAction,
    )
    .get<{ Params: { id: string }; Reply: { todo: TodoView } }>(
      '/:id',
      {
        schema: {
          params: { id: { type: 'string' } },
          response: { 200: { todo: TodoViewSchema } },
        },
      },
      findTodoAction,
    )
    .put<{
      Params: { id: string }
      Body: TodoUpdateRequest
      Reply: { todo: TodoView }
    }>(
      '/:id',
      {
        schema: {
          params: { id: { type: 'string' } },
          body: TodoUpdateRequestSchema,
          response: { 200: { todo: TodoViewSchema } },
        },
      },
      updateTodoAction,
    )
    .delete<{ Params: { id: string } }>(
      '/:id',
      {
        schema: { params: { id: { type: 'string' } } },
      },
      deleteTodoAction,
    )

  done()
}
