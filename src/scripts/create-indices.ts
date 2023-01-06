import { mongodbClient, todoMongoDbClient } from '../db/mongo'

async function createIndices() {
  await todoMongoDbClient.createIndex({ createdAt: -1 })
}

async function run() {
  try {
    await mongodbClient.connect()
    await createIndices()
  } catch (e) {
    console.error(e)
  } finally {
    await mongodbClient.close()
  }
}

run()
