import { Hook } from '@feathersjs/feathers'

export default function (): Hook {

  return async (context) => {
    const { user } = context.params
    if (!user.isManager) {
      throw new Error('You must be a manager to perform this operation')
    } else if (user.companyId !== context.data.companyId) {
      throw new Error('You are not a manager for this company')
    }
    return context
  }
}