// @ts-check
import Sequelize from 'sequelize'

/**
 *
 * @param {Sequelize.Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('todos', {
    title: {
      type: DataTypes.STRING
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
}
