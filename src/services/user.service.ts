import makeService from 'feathers-mongoose'
import Mongoose from 'mongoose'
import { HooksObject } from '@feathersjs/feathers'
import Auth from '@feathersjs/authentication'
import LocalAuth from '@feathersjs/authentication-local'
import usersMe from '../hooks/usersMe'

const { authenticate } = Auth.hooks
const { hashPassword, protect } = LocalAuth.hooks

export const Schema = new Mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  workEmail: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isManager: {
    type: Boolean
  }, // TODO: Need some way to make a user a manager of a company
  companyId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  positionId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Position'
  }
}, {
  timestamps: true
})

export const Service = makeService({
  Model: Mongoose.model('User', Schema)
})

export const Hooks: Partial<HooksObject> = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt'), usersMe() ],
    create: [ hashPassword() ],
    update: [ hashPassword(), authenticate('jwt') ],
    patch: [ hashPassword(), authenticate('jwt'), ],
    remove: [ authenticate('jwt'), usersMe() ]
  },
  after: { all: [protect('password')] }
}

export default { Schema, Service, Hooks }