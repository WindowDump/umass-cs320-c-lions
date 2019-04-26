import makeService from 'feathers-mongoose'
import Mongoose from 'mongoose'
import { HooksObject } from '@feathersjs/feathers'

export const Schema = new Mongoose.Schema({
  name: String,
  positions: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Position'
  }
})

export const Service = makeService({
  Model: Mongoose.model('Company', Schema)
})

export const Hooks: Partial<HooksObject> = {}

export default { Schema, Service, Hooks }
