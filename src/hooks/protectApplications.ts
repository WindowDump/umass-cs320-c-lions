import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['users']>) => {
    const { user } = context.params as { user: IApp['users'] }
    // them = context.service.get(context.id)
    // themId = context.id
    // me = context.user
    // meId = context.user.id
    // For all users in find result or just one in get result:
    //  - If themId != meId, then hide appliedPositionIds and availablePositionIds
    return context
  }
}
