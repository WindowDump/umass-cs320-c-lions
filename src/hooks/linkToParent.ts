import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const { user } = context.params as { user: IApp['users'] }
    // If get(this.parent).companyId and this.companyId is not same, throw error
    // If this.parent, add this id to this.parent.subordinateIds
    return context
  }
}
