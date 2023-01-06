import { createApp } from './app'
import { mongodbClient } from './db/mongo'

const PORT = parseInt(process.env.PORT || '3000', 10)

const startServer = async () => {
  const server = createApp()

  try {
    await mongodbClient.connect()
    await server.listen({ port: PORT })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

startServer()
