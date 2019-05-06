import { Hook } from '@feathersjs/feathers'

export default function(): Hook {
  return async context => {
    const numOtherUsers = (await context.service.find()).length
    context.data.canImportData = numOtherUsers === 0
    return context
  }
}
