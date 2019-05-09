import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    // For all subordinate positions, set parentPosition id to this.parentpositionId
    const record = await context.service.get(context.result!._id)
    console.log('RECORD', record)
    await Promise.all(
      record.subordinatePositionIds.map(subPosId =>
        context.service.patch(subPosId, {
          parentPositionId: record.parentPositionId
        })
      )
    )
    // For the parent position, attach subordinate positions of deleted record
    // and remove deleted record
    console.log('PARENTPOS', record.parentPositionId)
    if (record.parentPositionId) {
      const parentRecord = await context.service.get(record.parentPositionId)
      console.log('OLD', parentRecord.subordinatePositionIds)
      console.log('NEW', (parentRecord.subordinatePositionIds || [])
      .filter(x => x.toString() !== record._id.toString())
      .concat(...record.subordinatePositionIds))
      await context.service.patch(parentRecord._id, {
        subordinatePositionIds: (parentRecord.subordinatePositionIds || [])
          .filter(x => x.toString() !== record._id.toString())
          .concat(...record.subordinatePositionIds)
      })
    }
    return context
  }
}
