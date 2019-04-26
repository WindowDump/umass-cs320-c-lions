import makeService from 'feathers-mongoose'
import Mongoose from 'mongoose'
import { HooksObject } from '@feathersjs/feathers'
import { disallow } from 'feathers-hooks-common'

export const Schema = new Mongoose.Schema({
  name: String,
  questions: [{ type: String }]
})

export const Service = makeService({
  Model: Mongoose.model('Company', Schema)
})

export const Hooks: Partial<HooksObject> = {
  before: {
    create: [disallow()], // TODO: Need some way to add companies
    patch: [disallow()], // TODO: Need some way to add questions to companies
    remove: [disallow()] // TODO: Need some way to remove companies
  }
}

export default { Schema, Service, Hooks }
