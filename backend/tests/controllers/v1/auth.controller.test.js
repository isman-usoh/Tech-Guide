// @ts-check
import request from 'supertest';

import { app } from './../../../src/app'
import { sequelize } from '../../../src/config/sequelize';
import { initializeDatabase } from '../../initializeDatabase';

const appRequest = request(app)

beforeAll((done) => {
  return initializeDatabase(done);
});

describe('AuthController', () => {

  const firstname = "Isman"
  const lastname = "Usoh"
  const email = `email${Date.now()}@gmail.com`
  const password = "Password"

  let id
  let accessToken

  describe("register action", () => {
    it('should register successful', (done) => {
      return appRequest
        .post("/v1/auth/register")
        .send({
          firstname,
          lastname,
          email,
          password
        })
        .expect(200)
        .end((err, res) => {
          if (err) done(err)
          const body = JSON.parse(res.text)

          expect(body.id).not.toBeUndefined()
          expect(body.firstname).toBe(firstname)
          expect(body.lastname).toBe(lastname)
          expect(body.email).toBe(email)
          expect(body.password).toBeUndefined()

          id = body.id;
          done()
        })
    })

    it('should register no firstname', (done) => {
      return appRequest
        .post("/v1/auth/register")
        .send({
          lastname,
          email,
          password
        })
        .expect(400, { code: 'BadRequest', message: 'required firstname field' }, done)
    })

    it('should register no email', (done) => {
      return appRequest
        .post("/v1/auth/register")
        .send({
          firstname,
          lastname,
          password
        })
        .expect(400, { code: 'BadRequest', message: 'required email field' }, done)
    })

    it('should register no password', (done) => {
      return appRequest
        .post("/v1/auth/register")
        .send({
          firstname,
          lastname,
          email,
        })
        .expect(400, { code: 'BadRequest', message: 'required password field' }, done)
    })

    it('should register duplicate email', (done) => {
      return appRequest
        .post("/v1/auth/register")
        .send({
          firstname,
          lastname,
          email,
          password
        })
        .expect(400, { code: 'BadRequest', message: 'Email duplicate other account' }, done)
    })
  })

  describe("login action", () => {
    it('should login successful', (done) => {
      return appRequest
        .post("/v1/auth/login")
        .send({
          email,
          password,
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          const body = JSON.parse(res.text)

          expect(body.id).not.toBeUndefined()
          expect(body.token).not.toBeUndefined()
          expect(body.token.length).toBe(64)
          expect(body.expired).not.toBeUndefined()

          accessToken = body.token
          done();
        })
    })

    it('should invalid email or password', (done) => {
      return appRequest
        .post("/v1/auth/login")
        .send({
          email,
          password: "inValidPassword",
        })
        .expect('Content-Type', /json/)
        .expect(401, { code: 'Unauthorized', message: 'email or password invalid' }, done)
    })
  });

  describe("userInfo action", () => {
    it("should get userinfo successful", (done) => {
      return appRequest
        .get("/v1/auth/info")
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          const body = JSON.parse(res.text)

          expect(body.id).toBe(id)
          expect(body.firstname).toBe(firstname)
          expect(body.lastname).toBe(lastname)
          expect(body.email).toBe(email)
          done();
        })
    })

    it("should without Authorization header", (done) => {
      return appRequest
        .get("/v1/auth/info")
        .expect('Content-Type', /json/)
        .expect(401, { code: 'Unauthorized', message: 'Required AccessToken' }, done)
    })

    it("should invalid accessToken", (done) => {
      return appRequest
        .get("/v1/auth/info")
        .set('Authorization', `Bearer 1226871`)
        .expect('Content-Type', /json/)
        .expect(401, { code: 'Unauthorized', message: 'AccessToken invalid' }, done)
    })
  })
})