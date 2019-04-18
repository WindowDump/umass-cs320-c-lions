import { App } from '../app.interface'

import cookieParser from 'cookie-parser'

// tslint:disable-next-line:no-unused-variable
export default function(app: App) {
  app.use(cookieParser())
}
