import makeService from 'feathers-mongoose'
import Mongoose from 'mongoose'
import { HooksObject } from '@feathersjs/feathers'
import { discard, iff } from 'feathers-hooks-common'

import onlyCompanyManager from '../hooks/onlyCompanyManager'
import linkToParent from '../hooks/linkToParent'
import attachChildrenToParent from '../hooks/attachChildrenToParent'
import acceptEmployee from '../hooks/acceptEmployee'
import applyToPosition from '../hooks/applyToPosition'
import acceptPosition from '../hooks/acceptPosition'
import rejectPosition from '../hooks/rejectPosition'
import positionCreationChecks from '../hooks/positionCreationChecks'
import allowInternalCalls from '../hooks/allowInternalCalls'
import auth from '../hooks/auth'

export const Schema = new Mongoose.Schema({
  companyId: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Company'
  },

  parentPositionId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Position'
  },
  subordinatePositionIds: [{
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Position'
  }],

  appliedUserIds: [{
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }],
  acceptedUserIds: [{
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }],
  hiredUserId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  hiredUserAnswers: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],

  title: { type: String, required: true },
  description: { type: String, required: true },
  payRange: { type: String, required: true },
  jobType: { type: String, required: true },

  startDate: { type: String, required: true },
  postingDate: { type: String, required: true },
  postingExpirationDate: { type: String, required: true }
})

export const Service = makeService({
  Model: Mongoose.model('Position', Schema)
})

export const Hooks: Partial<HooksObject> = {
  before: {
    all: [ auth() ],
    create: [
      allowInternalCalls(),
      positionCreationChecks(),
      (context) => {
        delete context.data.hiredUserId
        context.data.appliedUserIds = []
        context.data.acceptedUserIds = []
        context.data.hiredUserAnswers = []
        context.data.subordinatePositionIds = []
        context.data.companyId = context.params.user.managedCompanyId
      }
    ],
    patch: [
      allowInternalCalls(),
      discard(
        'companyId',
        'appliedUserIds',
        'acceptedUserIds',
        'hiredUserId',
        'hiredUserAnswers'
      ),
      applyToPosition(),
      acceptPosition(),
      rejectPosition(),
      
      onlyCompanyManager(),
      acceptEmployee()
    ],
    remove: [
      onlyCompanyManager()
    ]
  },
  after: {
    find: [
      (context) => {
        return context
      }
    ],
    create: [
      linkToParent()
    ],
    remove: [
      attachChildrenToParent()
    ]
  }
}

export default { Schema, Service, Hooks }
