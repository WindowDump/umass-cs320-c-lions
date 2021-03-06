import { App } from '../app.interface'
import Company from './company.service'
import Position from './position.service'
import User from './user.service'
import IOService from './io.service'

export default function(app: App) {
  app.use('/companies', Company.Service)
  app.service('companies').hooks(Company.Hooks)
  app.use('/positions', Position.Service)
  app.service('positions').hooks(Position.Hooks)
  app.use('/users', User.Service)
  app.service('users').hooks(User.Hooks)
  app.use('/io', new IOService())
}
