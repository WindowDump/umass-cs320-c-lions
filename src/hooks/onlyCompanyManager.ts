import { Hook } from '@feathersjs/feathers'
import errors from '@feathersjs/errors';

export default function(): Hook {
  return async context => {
    const { user } = context.params
    const record = await context.service.get(context.id as string)
    if (user.managedCompanyId !== record.companyId) {
      context.error = new errors.Forbidden("You are not a manager of this company")
      throw context.error
    }
    return context
  }
}
