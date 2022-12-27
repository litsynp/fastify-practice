import { Server, IncomingMessage, ServerResponse } from 'http'
import Fastify, { FastifyInstance } from 'fastify'

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  Fastify({ logger: true })

server.get('/', async () => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
