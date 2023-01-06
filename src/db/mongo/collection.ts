import { MONGODB_URL } from '../../config'
import { TodoModel } from '../../todo'

import { generateMongodbClient } from './client'
import { extractDatabaseName } from './extract-database-name'

const TODO_COLLECTION = 'todos'

export const todoMongoDbClient = generateMongodbClient<TodoModel>({
  database: extractDatabaseName(MONGODB_URL),
  collection: TODO_COLLECTION,
})
