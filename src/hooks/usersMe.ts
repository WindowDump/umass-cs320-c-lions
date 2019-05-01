import { Hook } from '@feathersjs/feathers'

export default function(): Hook {
  return async context => {
    const { user } = context.params
    if (user && context.id === 'me') context.id = user._id
    return context
  }
}
