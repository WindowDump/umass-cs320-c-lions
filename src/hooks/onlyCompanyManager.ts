import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'
import errors from '@feathersjs/errors'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const user = context.params.user as IApp['users']
    const record = await context.service.get(context.id!)
    if (
      !user ||
      !user.managedCompanyId ||
      user.managedCompanyId.toString() !== record.companyId.toString()
    ) {
      context.error = new errors.Forbidden(
        'You are not a manager of this company'
      )
      throw context.error
    }
    return context
  }
}
