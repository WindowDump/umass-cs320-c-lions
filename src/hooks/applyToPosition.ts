import { Hook, Id } from '@feathersjs/feathers'

export default function(): Hook {
  return async context => {
    const { user } = context.params
    const { appliedUsers } = await context.service.get(context.id as Id)
    if (!appliedUsers.includes(user._id)) appliedUsers.push(user._id)
    context.data = { appliedUsers }
    return context
  }
}
