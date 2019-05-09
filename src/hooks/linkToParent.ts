import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    // If position has no parent, linking is not necessary
    if (!context.data!.parentPositionId) return
    const parent = await context.service.get(context.data!.parentPositionId)

    // Add this id to this.parent.subordinateIds
    const prevSubordinatePosIds = parent.subordinatePositionIds || []
    await context.service.patch(context.data!.parentPositionId, {
      subordinatePositionIds: prevSubordinatePosIds.concat(context.result!._id)
    })

    return context
  }
}
