const Sequelize = require('sequelize')

const sequelize = new Sequelize('mydb', 'root', 'pass1234', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
})

const Todo = sequelize.import('./../models/Todo')
const User = sequelize.import('./../models/User')
const AccessToken = sequelize.import('./../models/AccessToken')

User.AccessToken = User.hasMany(AccessToken)
AccessToken.User = AccessToken.belongsTo(User, { as: 'user' })

export {
  AccessToken,
  Todo,
  User,
  Sequelize,
  sequelize
}
