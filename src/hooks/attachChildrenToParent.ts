import { Hook } from '@feathersjs/feathers'

export default function(): Hook {
  return async context => {
    // For all subordinate positions, set parentPosition id to this.parentpositionId
    return context
  }
}
