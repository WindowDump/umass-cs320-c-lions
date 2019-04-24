import { Hook } from '@feathersjs/feathers'

export default function (): Hook {

  return async (context) => {
    const { user } = context.params
    context.data.userId = user._id
    return context
  }
}