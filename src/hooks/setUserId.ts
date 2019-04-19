import { Hook } from '@feathersjs/feathers'

export default function (config?: { onlyAllowMe?: boolean }): Hook {

  return async (context) => {
    const { user } = context.params
    context.data.userId = user._id
    return context
  }
}