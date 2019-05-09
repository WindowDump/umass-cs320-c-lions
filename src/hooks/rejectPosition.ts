import { IApp } from '../app.interface'
import { Hook, HookContext, SKIP, Service } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const { user } = context.params as { user: IApp['users'] }
    const record = await context.service.get(context.id!)
    // 0. If !context.data.rejectPosition, skip this hook
    if ((context.data as any).rejectPosition) {
      // 1. Remove user._id from position.appliedUserIds and position.acceptedUserIds
      const uPred = (p: string) => p.toString() !== user._id.toString()
      await context.service.patch(context.id!, {
        appliedUserIds: (record.appliedUserIds || []).filter(uPred),
        acceptedUserIds: (record.acceptedUserIds || []).filter(uPred)
      })

      // 2. Remove position._id from user.appliedPositionIds and user.availablePositionIds
      const User = context.app.service('users') as Service<IApp['users']>
      const pPred = (p: string) => p.toString() !== context.id!.toString()
      User.patch(user._id, {
        appliedPositionIds: (user.appliedPositionIds || []).filter(pPred),
        availablePositionIds: (user.availablePositionIds || []).filter(pPred)
      })

      // 3. Skip all hooks after this one
      return SKIP
    }
    return context
  }
}
