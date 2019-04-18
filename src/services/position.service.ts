import makeService from 'feathers-mongoose'
import Mongoose from 'mongoose'
import { HooksObject } from '@feathersjs/feathers'
import { hooks } from '@feathersjs/authentication'

export const Schema = new Mongoose.Schema({
  companyId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  managerId: Mongoose.Schema.Types.ObjectId,
  userId: Mongoose.Schema.Types.ObjectId,
  subordinateIds: [Mongoose.Schema.Types.ObjectId],
  title: String,
  description: String,
  payRange: String,
  jobType: String,
  startDate: String,
  postingDate: String,
  postingExpirationDate: String
})

export const Service = makeService({
  Model: Mongoose.model('Position', Schema)
})

export const Hooks: Partial<HooksObject> = {
  before: {
    all: [ hooks.authenticate('jwt') ]
  }
}

export default { Schema, Service, Hooks }
