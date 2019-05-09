import makeService from 'feathers-mongoose'
import Mongoose from 'mongoose'
import { HooksObject } from '@feathersjs/feathers'
import Auth from '@feathersjs/authentication'
import LocalAuth from '@feathersjs/authentication-local'
import usersMe from '../hooks/usersMe'
import protectApplications from '../hooks/protectApplications'
import { discard, disallow } from 'feathers-hooks-common'
import setCanImportData from '../hooks/setCanImportData'

const { authenticate } = Auth.hooks
const { hashPassword, protect } = LocalAuth.hooks

export const Schema = new Mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    canImportData: { type: Boolean, required: true },

    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },

    managedCompanyId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },

    appliedPositionIds: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Position',
        required: true
      }
    ],
    availablePositionIds: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Position',
        required: true
      }
    ],
    hiredPositionId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Position'
    }
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
    all: [protectApplications()],
    find: [authenticate('jwt')],
    get: [authenticate('jwt'), usersMe()],
    create: [
      hashPassword(),
      discard(
        'canImportData',
        'appliedPositionIds',
        'availablePositionIds',
        'hiredPositionId'
      ),
      setCanImportData()
    ],
    patch: [disallow('rest')],
    remove: [authenticate('jwt'), usersMe()]
  },
  after: { all: [protect('password'), protectApplications()] }
}

export default { Schema, Service, Hooks }
