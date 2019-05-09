import { IApp } from '../app.interface'
import { Hook, HookContext, SKIP, Service } from '@feathersjs/feathers'
import FeathersError from '@feathersjs/errors'

export default function(): Hook {
  return async (context: HookContext<IApp['positions']>) => {
    const user = context.params.user as IApp['users']
    const record = await context.service.get(context.id!)
    // Employee id is value of context.data.acceptEmployee, executed by manager
    // EX: PATCH { acceptEmployee: 'abc123' }
    // 0. If !context.data.acceptEmployee, skip this hook
    const employeeId = (context.data! as any).acceptEmployee
    if (typeof employeeId === 'string') {
      // 1. If employee isn't in appliedUserIds or has already applied, throw error
      if (!record.appliedUserIds.map(x => x.toString()).includes(employeeId)) {
        throw new FeathersError.Forbidden(
          'This user has not applied to this position'
        )
      }
      if (record.acceptedUserIds.map(x => x.toString()).includes(employeeId)) {
        throw new FeathersError.BadRequest(
          'This user has already been accepted to this position'
        )
      }

      // 2. Add employee to acceptedUserIds
      context.service.patch(context.id!, {
        appliedUserIds: record.appliedUserIds.filter(
          x => x.toString() !== employeeId
        ),
        acceptedUserIds: (record.acceptedUserIds || []).concat(employeeId)
      })

      // 3. Add this position to employee.availablePositionIds
      const Users = context.app.service('users') as Service<IApp['users']>
      Users.patch(employeeId, {
        availablePositionIds: user.availablePositionIds.concat(record._id)
      })

      // 4. Skip all other hooks after this one
      return SKIP
    }
    return context
  }
}
