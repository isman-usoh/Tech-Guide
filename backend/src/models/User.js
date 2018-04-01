// @ts-check
import Sequelize from 'sequelize'

/**
 *
 * @param {Sequelize.Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: 'email',
      validate: {
        isLowercase: true
      }
    },
    password: DataTypes.STRING
  })
}
