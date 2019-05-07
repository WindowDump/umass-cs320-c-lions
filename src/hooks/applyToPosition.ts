import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const { user } = context.params as { user: IApp['users'] }
    // Executed by nonManager, EX: PATCH { applyToPosition: true }
    // 0. If !context.data.applyToPosition, skip this hook. Else skip all other hooks after
    // 1. If already in position.appliedUserIds, do nothing
    // 2. Otherwise add user._id to position.appliedUserIds
    return context
  }
}
