import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const { user } = context.params as { user: IApp['users'] }
    // EX: PATCH { acceptPositionWithAnswers: [{ question: string, answer: string }] }, executed by nonManager
    // 0. If !context.data.acceptPosition, skip this hook. Else skip all other hooks after
    // 1. Set position.hiredUserId to user._id
    // 2. For each position p in user.appliedPositions, remove user._id from p.appliedUserIds and possibly p.acceptedUserIds
    // 3. Set position.acceptedUserIds to [], set position.appliedUserIds to [], set user.appliedPositions to [], set user.availablePositionIds to []
    // 4. Set position.hiredUserAnswers to data.acceptPositionWithAnswers
    return context
  }
}
