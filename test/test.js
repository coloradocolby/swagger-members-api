/**
 * INTEGRATION TEST SUITE
 */

const expect = require('expect.js')
const request = require('supertest')

//fixtures
const { newMember } = require('./fixtures')

const app = require('../server')
const db = require('../db/db')

before(done => {
  app.on('READY', () => {
    done()
  })
})

after(done => {
  db.disconnect()
    .then(() => {
      done()
      process.exit()
    })
    .catch(err => {
      done(err)
      process.exit()
    })
})

describe('Members API'.magenta.underline, () => {
  let memberObjectId, memberBirthday

  describe('POST /api/members'.magenta, () => {
    it('should successfully add a member', done => {
      request(app)
        .post('/api/members')
        .send(newMember)
        .then(res => {
          memberObjectId = res.body._id
          memberBirthday = res.body.birthday

          expect(res.status).to.eql(200)
          done()
        })
        .catch(error => {
          done(error)
        })
    })
  })

  describe('GET /api/members/'.magenta, () => {
    it('should return at least one member', done => {
      request(app)
        .get(`/api/members/`)
        .then(res => {
          expect(res.body.length).to.be.greaterThan(0)
          expect(res.status).to.eql(200)
          done()
        })
    })
  })

  describe('GET /api/members/:id'.magenta, () => {
    it('should return the previously added member', done => {
      request(app)
        .get(`/api/members/${memberObjectId}`)
        .then(res => {
          expect(res.body._id).to.eql(memberObjectId)
          expect(res.body.birthday).to.eql(memberBirthday)
          expect(res.status).to.eql(200)
          done()
        })
    })
  })

  describe('DELETE /api/members/:id'.magenta, () => {
    it('should delete the previously added member', done => {
      console.log(memberObjectId)
      request(app)
        .delete(`/api/members/${memberObjectId}`)
        .then(res => {
          expect(res.status).to.eql(200)
          done()
        })
    })
  })
})
