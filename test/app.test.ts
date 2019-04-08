/// <reference types="mocha"/>

import assert from 'assert'
import rp from 'request-promise'
import { Server } from 'http'
import url from 'url'
import app from '../src/app'

let id;
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

  
  describe('Tests for /companies', async () => {
    // No companies to start with 
    it('should contain no companies', async () => {
      const res = await rp({
        url: getUrl('/companies'),
        json: true,
        method: 'GET'
      })

      assert.ok(res.length === 0, 'db does not contain zero companies')
    })

    // Add a company
    it('should add Google to /companies', async () => {
      const res = await rp({
        url: getUrl('companies'),
        json: true,
        method: 'POST',
        body: {name: 'Google'}
      })
      id = res._id 
      assert.ok(res !== -1, 'Google was not added')
    })

    it('should contain \'Google\'', async () => {
      const res = await rp({
        url: getUrl('/companies'),
        json: true
      })
      assert.ok(res.length === 1, 'db does not contain one elements')
      assert.ok(res[0].name === 'Google', 'Only element in db is not \'Google\'')
    })

    // Update a company
    it('Google is now Microsoft', async () => {
      const res = await rp({
        url: getUrl(`/companies/${id}`),
        json: true,
        method: 'PATCH',
        body: { name: 'Microsoft' }
      })

      assert.ok(res.name === 'Microsoft', 'Only element in db is not \'Microsoft\'')
    })

    // Delete a company
    it('should remove Microsoft from the db', async () => {
      const res = await rp({
        url: getUrl(`/companies/${id}`),
        json: true,
        method: 'DELETE'
      })

      assert.ok(res._id === id, '_ids do not match')
      assert.ok(res.name === 'Microsoft', 'Microsoft was not removed')
    })

    // No more companies
    it('should contain no companies again', async () => {
      const res = await rp({
        url: getUrl('/companies'),
        json: true,
        method: 'GET'
      })

      assert.ok(res.length === 0, 'db does not contain zero companies')
    })
  })
})
