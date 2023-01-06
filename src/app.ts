import { IncomingMessage, Server, ServerResponse } from 'http'

import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { fastify, FastifyInstance } from 'fastify'

import * as todo from './todo'

export function createApp() {
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
    fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>()

  server.register(routes).register(todo.externalRoutes, { prefix: '/todos' })

  return server
}

function routes(server: FastifyInstance, opts: any, done: () => void) {
  server.route({
    method: 'GET',
    url: '/health',
    handler: (request, reply) => {
      reply.status(200).send({ status: 'ok' })
    },
  })

  done()
}
