import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    // For all subordinate positions, set parentPosition id to this.parentpositionId
    return context
  }
}
