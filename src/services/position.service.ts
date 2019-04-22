import makeService from 'feathers-mongoose'
import Mongoose from 'mongoose'
import { HooksObject } from '@feathersjs/feathers'
import { hooks } from '@feathersjs/authentication'
import onlyCompanyManager from 'src/hooks/onlyCompanyManager';
import { disallow, discard, iffElse } from 'feathers-hooks-common/types';
import applyToPosition from 'src/hooks/applyToPosition';
import setCompanyId from 'src/hooks/setCompanyId';

export const Schema = new Mongoose.Schema({
  companyId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  acceptedUserId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  appliedUserIds: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  acceptedUserAnswers: [{
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }],
  parentPosisionId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Position'
  },
  subordinatePositionIds: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Position'
  }],
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  payRange: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  postingDate: {
    type: String,
    required: true
  },
  postingExpirationDate: {
    type: String,
    required: true
  }
})

export const Service = makeService({
  Model: Mongoose.model('Position', Schema)
})

export const Hooks: Partial<HooksObject> = {
  before: {
    create: [
      onlyCompanyManager(),
      discard(
        'subordinatePositionIds',
        'acceptedUserId',
        'appliedUserIds',
        'companyId'
      ),
      setCompanyId(),
      (context) => {
        context.data.appliedUserIds = []
      }
    ],
    remove: [
      onlyCompanyManager()
    ],
    patch: [
      discard(
        'subordinatePositionIds',
        'acceptedUserId',
        'appliedUserIds',
        'companyId'
      ),
      applyToPosition()
    ]
  }
}

export default { Schema, Service, Hooks }
