/// <reference types="mocha"/>

import assert from 'assert'
import rp from 'request-promise'
import { Server } from 'http'
import url from 'url'
import app from '../src/app'

const port = app.get('port') || 3030
const getUrl = (pathname?: string) => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
})

describe('Feathers application tests', () => {
  let server: Server

  before((done) => {
    server = app.listen(port)
    server.once('listening', () => {
      setTimeout(() => done(), 500)
    })
  })

  after((done) => {
    server.close()
    setTimeout(() => done(), 500)
  })

  describe('404', () => {
    it('shows a 404 HTML page', () => {
      return rp({
        url: getUrl('path/to/nowhere'),
        headers: {
          Accept: 'text/html'
        }
      }).catch(res => {
        assert.strictEqual(res.statusCode, 404, 'unexpected statusCode')
        assert.ok(res.error.indexOf('<html>') !== -1, 'error does not contain <html>')
      })
    })

    it('shows a 404 JSON error without stack trace', () => {
      return rp({
        url: getUrl('path/to/nowhere'),
        json: true
      }).catch(res => {
        assert.strictEqual(res.statusCode, 404, 'unexpected statusCode')
        assert.strictEqual(res.error.code, 404, 'unexpected error.code')
        assert.strictEqual(res.error.message, 'Page not found', 'unexpected error.message')
        assert.strictEqual(res.error.name, 'NotFound', 'unexpected error.name')
      })
    })
  })

  describe('Tests for /companies', () =>{
    // No companies to start with 
    it('db contains no elements', () => {
      return rp({
        url: getUrl('/companies'),
        json: true
      }).then(res => {
        assert.ok(res.length === 0, 'db does not contain zero elements')
      })
    })

    // Add a company
    it('db contains one element', () => {
      return rp({
        url: getUrl('/companies'),
        json: true
      }).then(res => {
        assert.ok(res.length === 1, 'db does not contain one elements')
        assert.ok(res[0].name === 'Google', 'Element in db is not \'Google\'')
      })
    })
  })
})
