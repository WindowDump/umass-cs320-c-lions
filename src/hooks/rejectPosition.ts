import { Hook } from '@feathersjs/feathers'

export default function(): Hook {
  return async context => {
    const { user } = context.params
    // 0. If !context.data.rejectPosition, skip this hook. Else skip all other hooks after
    // 1. Remove user._id from position.appliedUserIds and position.acceptedUserIds
    // 2. Remove position._id from user.appliedPositionIds and user.availablePositionIds
    return context
  }
}
