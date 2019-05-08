import { HooksObject } from '@feathersjs/feathers'
import { disallow } from 'feathers-hooks-common'
import log from './hooks/log'

export default {
  before: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [disallow()],
    patch: [],
    remove: []
  },

  after: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
} as HooksObject
