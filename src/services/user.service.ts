import makeService from 'feathers-mongoose'
import Mongoose from 'mongoose'
import { HooksObject } from '@feathersjs/feathers'
import Auth from '@feathersjs/authentication'
import LocalAuth from '@feathersjs/authentication-local'
import usersMe from '../hooks/usersMe'

const { authenticate } = Auth.hooks
const { hashPassword, protect } = LocalAuth.hooks

export const Schema = new Mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    isManager: { type: Boolean }
  },
  {
    timestamps: true
  }
)

export const Service = makeService({
  Model: Mongoose.model('User', Schema)
})

export const Hooks: Partial<HooksObject> = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt'), usersMe()],
    create: [hashPassword()],
    update: [hashPassword(), authenticate('jwt')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },
  after: { all: [protect('password')] }
}

export default { Schema, Service, Hooks }
