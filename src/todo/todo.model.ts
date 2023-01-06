export interface TodoModel {
  _id: string
  title: string
  description?: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
