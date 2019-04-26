import { HookMap, HooksObject } from '@feathersjs/feathers'
import * as commonHooks from 'feathers-hooks-common'
import log from './hooks/log'

const { iff } = commonHooks

export default {
  before: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
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
