import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const { user } = context.params as { user: IApp['users'] }
    // 0. If !context.data.rejectPosition, skip this hook. Else skip all other hooks after
    // 1. Remove user._id from position.appliedUserIds and position.acceptedUserIds
    // 2. Remove position._id from user.appliedPositionIds and user.availablePositionIds
    return context
  }
}
