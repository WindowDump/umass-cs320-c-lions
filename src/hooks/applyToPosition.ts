import FeathersError from '@feathersjs/errors'
import { IApp } from '../app.interface'
import { Service, Hook, HookContext, SKIP } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const user = context.params.user as IApp['users']
    const record = await context.service.get(context.id!)
    // Executed by nonManager, EX: PATCH { applyToPosition: true }
    // 0. If !context.data.applyToPosition, skip this hook. Else skip all other hooks after
    if ((context.data! as any).applyToPosition) {
      // 1. If already in position.appliedUserIds, do nothing
      if (
        (record.acceptedUserIds || []).some(
          x => x.toString() === user._id.toString()
        )
      )
        throw new FeathersError.BadRequest(
          'You have already been accepted to this position'
        )
      if (
        (record.appliedUserIds || []).some(
          x => x.toString() === user._id.toString()
        )
      )
        return context

      // 2. Otherwise add user._id to position.appliedUserIds
      context.service.patch(context.id!, {
        appliedUserIds: (record.appliedUserIds || []).concat(user._id)
      })
      // 3. Add position to appliedPositionIds
      const User = context.app.service('users') as Service<IApp['users']>
      User.patch(user._id, {
        appliedPositionIds: (user.appliedPositionIds || []).concat(
          context.id as string
        )
      })

      // 3. Skip all hooks after this one
      return SKIP
    }
    return context
  }
}
