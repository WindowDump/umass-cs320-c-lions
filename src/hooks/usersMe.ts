import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['users']>) => {
    const { user } = context.params as { user: IApp['users'] }
    if (user && context.id === 'me') context.id = user._id
    return context
  }
}
