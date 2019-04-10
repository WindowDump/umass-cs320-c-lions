import makeService from 'feathers-mongoose'
import Mongoose from 'mongoose'
import { HooksObject } from '@feathersjs/feathers'

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

export const Hooks: Partial<HooksObject> = {}

export default { Schema, Service, Hooks }
