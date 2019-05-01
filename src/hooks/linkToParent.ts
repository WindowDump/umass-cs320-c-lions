import { Hook } from '@feathersjs/feathers'

export default function(): Hook {
  return async context => {
    const { user } = context.params
    // If this.parent and this.parent is not same company, throw error
    // If this.parent, add this id to this.parent.subordinateIds
    return context
  }
}
