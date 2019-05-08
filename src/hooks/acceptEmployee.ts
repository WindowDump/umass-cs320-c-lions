import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const { user } = context.params as { user: IApp['users'] }
    // Employee id is value of context.data.acceptEmployee, executed by manager
    // EX: PATCH { acceptEmployee: 'abc123' }
    // 0. If !context.data.acceptEmployee, skip this hook. Else skip all other hooks after
    // 1. If employee isn't in appliedUserIds, throw error
    // 2. Remove employee from appliedUserIds and add to acceptedUserIds
    // 3. Add this position to user.availablePositionIds
    return context
  }
}
