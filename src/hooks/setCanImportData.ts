import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['users']>) => {
    const numOtherUsers = (await context.service.find() as Array<IApp['users']>).length
    context.data!.canImportData = numOtherUsers === 0
    return context
  }
}
