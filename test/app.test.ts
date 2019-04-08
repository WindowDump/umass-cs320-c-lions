/// <reference types="mocha"/>

import assert from 'assert'
import rp from 'request-promise'
import { Server } from 'http'
import url from 'url'
import app from '../src/app'

let cid;
let pid;
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

      assert.ok(res.length === 0, '/companies does not contain zero companies')
    })

    // Add a company
    it('should add Google to /companies', async () => {
      const res = await rp({
        url: getUrl('companies'),
        json: true,
        method: 'POST',
        body: {name: 'Google'}
      })
      cid = res._id 
      assert.ok(res !== -1, 'Google was not added')
    })

    it('should contain \'Google\'', async () => {
      const res = await rp({
        url: getUrl('/companies'),
        json: true,
        method: 'GET'
      })
      assert.ok(res.length === 1, '/companies does not contain one element')
      assert.ok(res[0].name === 'Google', 'Google is not in /companies')
    })

    // Update a company
    it('should now be Microsoft', async () => {
      const res = await rp({
        url: getUrl(`/companies/${cid}`),
        json: true,
        method: 'PATCH',
        body: { name: 'Microsoft' }
      })

      assert.ok(res.name === 'Microsoft', 'Microsoft is not in /companies')
    })

    // Delete a company
    it('should remove Microsoft from /companies', async () => {
      const res = await rp({
        url: getUrl(`/companies/${cid}`),
        json: true,
        method: 'DELETE'
      })

      assert.ok(res._id === cid, '_ids do not match')
      assert.ok(res.name === 'Microsoft', 'Microsoft was not removed')
    })

    // No more companies
    it('should contain no companies again', async () => {
      const res = await rp({
        url: getUrl('/companies'),
        json: true,
        method: 'GET'
      })

      assert.ok(res.length === 0, '/companies does not contain 0 companies')
    })
  })

  describe('Tests for /positions', async () => {
    // No positions to start with 
    it('should contain no positions', async () => {
      const res = await rp({
        url: getUrl('/positions'),
        json: true,
        method: 'GET'
      })

      assert.ok(res.length === 0, '/positions does not contain 0 companies')
    })

    // Add a position
    it('should add CEO to /positions', async () => {
      const res = await rp({
        url: getUrl('positions'),
        json: true,
        method: 'POST',
        body: {
        title: 'CEO',
        description: "runs the company",
        payRange: 1000000,
        jobType: 'full-time',
        startDate: new Date(),
        postingDate: new Date(),
        postingExpirationDate: Date()}
      })
      pid = res._id 
      assert.ok(res !== -1, 'CEO was not added')
    })

    it('should contain CEO', async () => {
      const res = await rp({
        url: getUrl('/positions'),
        json: true,
        method: 'GET'
      })
      assert.ok(res.length === 1, '/positions does not contain 1 element')
      assert.ok(res[0].title === 'CEO', 'CEO is not in /companies')
    })

    // Update a position
    it('should now have a different pay-range', async () => {
      const res = await rp({
        url: getUrl(`/positions/${pid}`),
        json: true,
        method: 'PATCH',
        body: { payRange: 500000 }
      })

      assert.ok(res.payRange === 500000, 'Pay-range was not updated')
    })

    // Delete a position
    it('should remove CEO from the /positions', async () => {
      const res = await rp({
        url: getUrl(`/positions/${pid}`),
        json: true,
        method: 'DELETE'
      })

      assert.ok(res._id === pid, '_ids do not match')
      assert.ok(res.title === 'CEO', 'CEO was not removed')
    })

    // No more companies
    it('should contain no companies again', async () => {
      const res = await rp({
        url: getUrl('/positions'),
        json: true,
        method: 'GET'
      })

      assert.ok(res.length === 0, 'db does not contain zero positions')
    })
  })
})
