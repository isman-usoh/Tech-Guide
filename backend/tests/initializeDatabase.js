// @ts-check
import { sequelize } from '../src/config/sequelize';

export const initializeDatabase = (done) => {
  return sequelize.sync({ force: true })
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })
}