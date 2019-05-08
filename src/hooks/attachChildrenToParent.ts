import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    // For all subordinate positions, set parentPosition id to this.parentpositionId
    const record = await context.service.get(context.result!._id)
    await Promise.all(record.subordinatePositionIds.map(subPosId => (
      context.service.patch(subPosId, {
        parentPositionId: record.parentPositionId
      })
    )))
    return context
  }
}
