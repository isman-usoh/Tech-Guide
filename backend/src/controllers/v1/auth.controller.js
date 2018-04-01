// @ts-check
import R from 'ramda'
import errors from 'restify-errors'
import restify from 'restify'
import randomstring from 'randomstring'

import { User, AccessToken } from '../../config/sequelize'
/**
 *
 * @param {restify.Request} req
 * @param {restify.Response} res
 * @param {restify.Next} next
 */
export function register (req, res, next) {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email
  const password = req.body.password

  if (R.isNil(firstname) || R.empty(String(firstname).trim())) {
    return next(new errors.BadRequestError(`required firstname field`))
  }
  if (R.isNil(lastname) || R.empty(String(lastname).trim())) {
    return next(new errors.BadRequestError(`required lastname field`))
  }
  if (R.isNil(email) || R.empty(String(email).trim())) {
    return next(new errors.BadRequestError(`required email field`))
  }
  if (R.isNil(password) || R.empty(String(password).trim())) {
    return next(new errors.BadRequestError(`required password field`))
  }

  return User
    .create({
      firstname,
      lastname,
      email: String(email).toLowerCase(),
      password
    })
    .then(doc => {
      const data = R.omit(['password'], doc.toJSON())
      res.send(200, data)
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError' && err.fields && err.fields.email) {
        return next(new errors.BadRequestError('Email duplicate other account'))
      }
      next(err)
    })
}

/**
 *
 * @param {restify.Request} req
 * @param {restify.Response} res
 * @param {restify.Next} next
 */
export function login (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  if (R.isNil(email) || R.empty(String(email).trim())) {
    return next(new errors.BadRequestError(`required firstname field`))
  }
  if (R.isNil(password) || R.empty(String(password).trim())) {
    return next(new errors.BadRequestError(`required lastname field`))
  }

  return User
    .findOne({ where: { email } })
    .then(doc => {
      if (!doc) {
        throw new errors.UnauthorizedError('email or password invalid')
      }

      if (doc.dataValues.password !== password) {
        throw new errors.UnauthorizedError('email or password invalid')
      }
      return doc
    })
    .then(doc => {
      return AccessToken.create({
        token: randomstring.generate(64),
        expired: new Date(Date.now() + (30 * 24 * 60 * 1000)),
        userId: doc.dataValues.id
      })
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
export function userInfo (req, res, next) {
  const user = R.path(['user'], req)
  res.send(200, user || {})
}
