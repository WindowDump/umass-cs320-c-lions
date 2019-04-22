import { Hook } from '@feathersjs/feathers'

export default function (): Hook {

  return async (context) => {
    const { user } = context.params
    context.data.companyId = user.companyId
    return context
  }
}