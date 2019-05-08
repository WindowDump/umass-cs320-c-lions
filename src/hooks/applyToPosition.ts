import { IApp } from '../app.interface'
import { Hook, HookContext, SKIP } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const user = context.params.user as IApp['users']
    const record = await context.service.get(context.id!)
    // Executed by nonManager, EX: PATCH { applyToPosition: true }
    // 0. If !context.data.applyToPosition, skip this hook. Else skip all other hooks after
    if ((context.data! as any).applyToPosition) {
      console.log('APPLIED')
      // 1. If already in position.appliedUserIds, do nothing
      if (!(record.appliedUserIds || []).includes(user._id)) {
        // 2. Otherwise add user._id to position.appliedUserIds
        context.service.patch(context.id!, {
          // appliedUserIds: [...new Set(record.appliedUserIds || []).add(user._id)]
          appliedUserIds: (record.appliedUserIds || []).concat(user._id)
        })
      }

      // 3. Skip all hooks after this one
      return SKIP
    }
    return context
  }
}
