import FeathersError from '@feathersjs/errors'
import { IApp } from '../app.interface'
import { Hook, HookContext, SKIP, Service } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const user = context.params.user as IApp['users']
    // EX: PATCH { acceptPosition: true, qa: [{ question: string, answer: string }] }, executed by nonManager
    // 0. If !context.data.acceptPosition, skip this hook
    if ((context.data! as any).acceptPosition) {
      // 1. For each position p in user.appliedPositions, remove user._id from p.appliedUserIds and possibly p.acceptedUserIds
      Promise.all(user.appliedPositionIds.map(async (posId: string) => {
        const pos = await context.service.get(posId)
        const pred = (p: string) => p !== user._id
        await context.service.patch(posId, {
          appliedUserIds: (pos.appliedUserIds || []).filter(pred),
          acceptedUserIds: (pos.acceptedUserIds || []).filter(pred)
        })
      }))

      // 2. Set position.hiredUserId to user._id
      // 3. Set position.hiredUserAnswers to data.answers
      // 4. Set position.acceptedUserIds to [], set position.appliedUserIds to []
      const { qa } = context.data! as any
      if (qa instanceof Array) {
        qa.forEach(qaSegment => {
          if (!qaSegment.question || !qaSegment.answer) {
            throw new FeathersError.BadRequest('Invalid qa format supplied')
          }
        })
      } else throw new FeathersError.BadRequest('Invalid qa format supplied')
      await context.service.patch(context.id!, {
        hiredUserId: user._id,
        hiredUserAnswers: qa,
        acceptedUserIds: [],
        appliedUserIds: [],
      })

      // 5. Set user.appliedPositions to [], set user.availablePositionIds to []
      const User = (context.service as any)('users') as Service<IApp['users']>
      User.patch(user._id, {
        appliedPositionIds: [],
        availablePositionIds:[]
      })

      // 6. Skip all other hooks after this one
      return SKIP
    }
    return context
  }
}
