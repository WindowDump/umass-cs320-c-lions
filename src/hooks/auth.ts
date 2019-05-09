import { IApp } from '../app.interface'
import { Hook, HookContext } from '@feathersjs/feathers'
import { runHook } from 'feathers-hooks-common'
import { hooks } from '@feathersjs/authentication'

const { authenticate } = hooks

export default function(): Hook {
  return async (context: HookContext<IApp[keyof IApp]>) => {
    const { app, params } = context
    const defaults = app.get('authentication') || app.get('auth')
    const authHeader =
      params.headers && params.headers[defaults.header.toLowerCase()]
    if (!authHeader && params.cookies && defaults.cookie.name) {
      params.headers[defaults.header.toLowerCase()] =
        params.cookies[defaults.cookie.name]
    }
    await authenticate('jwt')(context)
    return context
  }
}
