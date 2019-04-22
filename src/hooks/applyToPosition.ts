import { Hook, Id } from '@feathersjs/feathers'

export default function (): Hook {

  return async (context) => {
    const { user } = context.params
    const { appliedUsers } = await context.service.get(context.id as Id)
    appliedUsers.push(user._id)
    if (context.data.apply) {
      context.data = { appliedUsers }
    } else if (!user.isManager) {
      throw new Error('Only managers can adjust positions')
    }
    return context
  }
}