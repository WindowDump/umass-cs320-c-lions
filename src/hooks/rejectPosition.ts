import { IApp } from '../app.interface'
import { Hook, HookContext, SKIP } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const { user } = context.params as { user: IApp['users'] }
    // 0. If !context.data.rejectPosition, skip this hook
    if ((context.data as any).rejectPosition) {
      // 1. Remove user._id from position.appliedUserIds and position.acceptedUserIds
      // 2. Remove position._id from user.appliedPositionIds and user.availablePositionIds
      // 3. Skip all hooks after this one
      return SKIP
    }
    return context
  }
}
