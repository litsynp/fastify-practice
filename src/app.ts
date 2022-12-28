import { IncomingMessage, Server, ServerResponse } from 'http'

import { fastify, FastifyInstance } from 'fastify'

export function createApp() {
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
    fastify({ logger: true })

  server.register(routes)

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
