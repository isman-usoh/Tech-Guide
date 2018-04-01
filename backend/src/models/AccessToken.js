// @ts-check
import Sequelize from 'sequelize'

/**
 *
 * @param {Sequelize.Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes
 */
export default function (sequelize, DataTypes) {
  const AccessToken = sequelize.define('access_token', {
    token: DataTypes.STRING,
    expired: DataTypes.DATE
  })

  return AccessToken
}
