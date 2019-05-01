import { Hook } from '@feathersjs/feathers'

export default function(): Hook {
  return async context => {
    const { user } = context.params
    // them = context.service.get(context.id)
    // themId = context.id
    // me = context.user
    // meId = context.user.id
    // For all users in find result or just one in get result:
    //  - If themId != meId, then hide appliedPositionIds and availablePositionIds
    return context
  }
}
