import { Hook } from '@feathersjs/feathers'

export default function (config?: { onlyAllowMe?: boolean }): Hook {

  return async (context) => {
    const { user } = context.params
    if (!user.isManager) {
      throw new Error('You must be a manager to perform this operation')
    }
    return context
  }
}