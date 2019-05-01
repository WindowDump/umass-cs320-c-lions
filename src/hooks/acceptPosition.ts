import { Hook } from '@feathersjs/feathers'

export default function(): Hook {
  return async context => {
    const { user } = context.params
    // EX: PATCH { acceptPosition: true }, executed by nonManager
    // 0. If !context.data.acceptPosition, skip this hook. Else skip all other hooks after
    // 1. Set position.hiredUserId to user._id
    // 2. For each position p in user.appliedPositions, remove user._id from p.appliedUserIds and possibly p.acceptedUserIds
    // 3. Set position.acceptedUserIds to [], set position.appliedUserIds to [], set user.appliedPositions to [], set user.availablePositionIds to []
    return context
  }
}
