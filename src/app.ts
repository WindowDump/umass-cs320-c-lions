
// Configure Feathers app.
import * as path from 'path'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import logger from './logger'

import favicon from 'serve-favicon'

import feathers from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import express from '@feathersjs/express'

import middleware from './middleware'
import services from './services'
import appHooks from './app.hooks'

const app = express(feathers())

// Load app configuration
app.configure(configuration())

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet())
app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use favicon
app.use(favicon(path.join('frontend', path.join('public', 'favicon.ico'))))

// Host the frontend folders
app.use('/', express.static(path.join('frontend', 'public')))
app.use('/', express.static(path.join('frontend', 'dist')))

// Set up Plugins and providers
app.configure(express.rest())

// Configure other middleware (see `middleware/index.ts`)
app.configure(middleware)
// Set up our services (see `services/index.ts`)
app.configure(services)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
app.use(express.errorHandler({ logger }))

app.hooks(appHooks)

const moduleExports = app
export default moduleExports
