import FeathersError from '@feathersjs/errors'
import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const user = context.params as IApp['users']
    if (!user || !user.managedCompanyId) {
      throw new FeathersError.Forbidden('Only company managers can create new positions')
    }

    if (context.data!.parentPositionId) {
      const parent = await context.service.get(context.data!.parentPositionId)
      if (parent.companyId !== user.managedCompanyId) {
        throw new FeathersError.Forbidden('You are not a manager of this company')
      }
    }
  }
}