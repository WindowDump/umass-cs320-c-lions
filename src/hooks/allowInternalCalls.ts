import FeathersError from '@feathersjs/errors'
import { IApp } from '../app.interface'
import { Hook, HookContext, SKIP } from '@feathersjs/feathers'

export default function(): Hook {
  return async (context: HookContext<IApp[keyof IApp]>) => (
    context.params.provider ? context : SKIP
  )
}