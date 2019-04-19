import { App } from './app.interface'
import authentication from '@feathersjs/authentication'
import JWT from '@feathersjs/authentication-jwt'
import Local from '@feathersjs/authentication-local'
import OAuth2 from '@feathersjs/authentication-oauth2'
import Auth0Strategy from 'passport-auth0'
// import GoogleStrategy from 'passport-google-oauth20'

export default (app: App) => {
  const config = app.get('authentication')

  // Set up authentication with the secret
  app.configure(authentication(config))
  app.configure(JWT())
  app.configure(Local())

  app.configure(
    OAuth2(
      Object.assign(
        {
          name: 'auth0',
          Strategy: Auth0Strategy
        },
        config.auth0
      )
    )
  )

  // app.configure(
  //   OAuth2(
  //     Object.assign(
  //       {
  //         name: 'google',
  //         Strategy: GoogleStrategy
  //       },
  //       config.google
  //     )
  //   )
  // )

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
