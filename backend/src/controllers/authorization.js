// @ts-check
import R from 'ramda'
import errors from 'restify-errors'
import restify from 'restify'
import { Op } from 'sequelize'

import { AccessToken, User } from '../config/sequelize'

/**
 *
 * @param {restify.Request} req
 * @param {restify.Response} res
 * @param {restify.Next} next
 */
export function authorization (req, res, next) {
  const authorization = req.header('Authorization', null)
  if (R.isNil(authorization)) {
    return next(new errors.UnauthorizedError('Required AccessToken'))
  }

  const authorizations = authorization.split(' ')
  if (authorizations.length !== 2 || authorizations[0] !== 'Bearer' || R.isNil(authorizations[1])) {
    return next(new errors.UnauthorizedError('Required AccessToken'))
  }

  const accessToken = authorizations[1]

  return AccessToken
    .findOne({ where: { token: accessToken, expired: { [Op.gt]: new Date() } } })
    .then(doc => {
      if (!doc) {
        throw next(new errors.UnauthorizedError('AccessToken invalid'))
      }
      return User.findById(doc.dataValues.userId, { attributes: ['id', 'firstname', 'lastname', 'email'] })
    })
    .then(doc => {
      if (!doc) {
        throw next(new errors.UnauthorizedError('User notfount'))
      }
      req['user'] = doc.toJSON()
      next()
    })
    .catch(err => {
      next(err)
    })
}
