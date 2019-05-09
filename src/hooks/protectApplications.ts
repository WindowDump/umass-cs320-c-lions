import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'
import { getItems } from 'feathers-hooks-common'

export default function(): Hook {
  return async (context: HookContext<IApp['users']>) => {
    const us = context.params.user as IApp['users']
    if (!us) return context
    let others = getItems(context)
    if (!(others instanceof Array)) others = [others]
    // For all users in find result or just one in get result:
    //  - If themId != meId, then hide appliedPositionIds and availablePositionIds
    for (const them of others) {
      if (us._id.toString() !== them._id.toString()) {
        if (context.result instanceof Array) {
          Promise.all(
            context.result!.map(async (record: IApp['users']) => {
              delete record.appliedPositionIds
              delete record.availablePositionIds
            })
          )
        } else {
          delete context.result!.appliedPositionIds
          delete context.result!.availablePositionIds
        }
      }
    }
    return context
  }
}
