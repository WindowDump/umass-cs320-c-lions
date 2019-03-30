declare module '*.json'

declare module 'feathers-mongoose' {
  import { Model, Document } from 'mongoose'
  import { Service, PaginationOptions } from '@feathersjs/feathers'

  export default function MongooseService<T extends Document>(config: {
    /**
     * The Mongoose model definition
     */
    Model: Model<T>
    /**
     * Runs queries faster by returning plain objects instead of Mongoose models
     * @default true
     */
    lean?: boolean
    /**
     * The name of the id field property
     * @default _id
     */ 
    id?: string
    /**
     * A pagination object containing a default and max page size
     */
    paginate?: PaginationOptions
    /**
     * A list of additional query parameters to allow (e.g. [ '$regex', '$populate' ])
     */
    whitelist?: string[]
    /**
     * Allow create with arrays and update and remove with id null to change multiple items
     * Can be true for all methods or an array of allowed methods (e.g. [ 'remove', 'create' ])
     */
    multi?: boolean | string[]
    /**
     * Overwrite the document on update
     * Makes mongoose detect whether is new document and trigger default value for unspecified properties in mongoose schema
     * @default true
     */ 
    overwrite?: boolean
    /**
     * A list of mongoose models that inherit from Model
     */
    discriminators?: Model<T>[]
    /**
     * Use Mongoose's estimatedDocumentCount
     * @default false
     */ 
    useEstimatedDocumentCount?: boolean
  }): Service<{ [key in keyof T]: any }>
}