const request = require('supertest');

import { app } from './../../../src/app'
import { initializeDatabase } from '../../initializeDatabase';

const appRequest = request(app)

beforeAll((done) => {
  return initializeDatabase(done);
});

describe('TodoController', function () {
  const todoId = 1;

  it("addTodo action", (done) => {
    const title = "Todo message"
    return appRequest
      .post("/v1/todo")
      .send({ title })
      .expect(200)
      .end((err, res) => {
        const body = JSON.parse(res.text)

        expect(body.title).toBe(title)
        expect(body.complete).toBe(false)
        done(err)
      })
  })

  it("listTodo action", (done) => {
    return appRequest
      .get("/v1/todo")
      .expect(200)
      .end((err, res) => {
        const body = JSON.parse(res.text)

        done(err)
      })
  })

  it("editTodo action", (done) => {
    const title = "New Todo message"
    return appRequest
      .patch("/v1/todo/1")
      .send({ title })
      .expect(200)
      .end((err, res) => {
        const body = JSON.parse(res.text)

        expect(body.title).toBe(title)
        done(err)
      })
  })

  it("deleteTodo action", (done) => {
    return appRequest
      .delete("/v1/todo/1")
      .expect(201)
      .end((err, res) => {
        done(err)
      })
  })
})