import makeService from 'feathers-mongoose'
import Mongoose from 'mongoose'
import { HooksObject } from '@feathersjs/feathers'

export const Schema = new Mongoose.Schema({
  Id: Mongoose.Schema.Types.ObjectId,
  requirements: [
    {
      id: Mongoose.Schema.Types.ObjectId,
      question: String,
      questionType: String,
      name: String
    }
  ],
  userId: Mongoose.Schema.Types.ObjectId,
  posId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Position'
  }
})

export const Service = makeService({
  Model: Mongoose.model('Application', Schema)
})

export const Hooks: Partial<HooksObject> = {}

export default { Schema, Service, Hooks }
