import { Collection, Document, MongoClient } from 'mongodb'

import { MONGODB_URL } from '../../config'

import { extractDatabaseName } from './extract-database-name'

export const mongodbClient = new MongoClient(MONGODB_URL, {
  ignoreUndefined: true,
})
export const db = mongodbClient.db(extractDatabaseName(MONGODB_URL))

export function generateMongodbClient<T extends Document>({
  database,
  collection,
}: {
  database: string
  collection: string
}): Collection<T> {
  return mongodbClient.db(database).collection<T>(collection)
}
