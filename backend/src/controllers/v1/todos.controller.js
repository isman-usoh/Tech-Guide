// @ts-check
import restify from 'restify'

import { Todo } from './../../config/sequelize';
/**
 * 
 * @param {restify.Request} req 
 * @param {restify.Response} res 
 * @param {restify.Next} next 
 */
export const createTodo = (req, res, next) => {
  const title = req.body.title
  const complete = req.body.complete

  return Todo
    .create({
      title,
      complete,
    })
    .then(doc => {
      res.send(200, doc.toJSON())
    })
    .catch(err => {
      next(err)
    })
}

/**
 * 
 * @param {restify.Request} req 
 * @param {restify.Response} res 
 * @param {restify.Next} next 
 */
export function listTodo(req, res, next) {
  return Todo
    .findAll()
    .then(docs => {
      res.send(200, docs.map(doc => doc.toJSON()))
    })
    .catch(err => {
      next(err)
    })
}

/**
 * 
 * @param {restify.Request} req 
 * @param {restify.Response} res 
 * @param {restify.Next} next 
 */
export function updateTodo(req, res, next) {
  const id = req.params.id
  const title = req.body.title
  const complete = req.body.complete

  return Todo
    .update({ title, complete }, { where: { id: id } })
    .then(doc => {
      return Todo.findById(id)
    })
    .then(doc => {
      return res.send(200, doc.toJSON())
    })
    .catch(err => {
      next(err)
    })
}

/**
 * 
 * @param {restify.Request} req 
 * @param {restify.Response} res 
 * @param {restify.Next} next 
 */
export function deleteTodo(req, res, next) {
  const id = req.params.id

  return Todo
    .destroy({ where: { id } })
    .then(doc => {
      res.send(201)
    })
    .catch(err => {
      next(err)
    })
}