import type { ModelType } from '@typegoose/typegoose/lib/types'
import type { Consola } from 'consola'
import type { Document, PaginateModel } from 'mongoose'

declare global {
  export const isDev: boolean

  export const consola: Consola

  export type MongooseModel<T> = ModelType<T> & PaginateModel<T & Document>
}

export {}
