import { App } from './app.interface'
import authentication from '@feathersjs/authentication'
import JWT from '@feathersjs/authentication-jwt'
import Local from '@feathersjs/authentication-local'

export default (app: App) => {
  const config = app.get('authentication')

  // Set up authentication with the secret
  app.configure(authentication(config))
  app.configure(JWT())
  app.configure(Local())

  // The `auth` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('auth').hooks({
    before: {
      create: [authentication.hooks.authenticate(config.strategies)],
      remove: [authentication.hooks.authenticate('jwt')]
    }
  })
}
