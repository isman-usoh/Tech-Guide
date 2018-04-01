// @ts-check
import { app } from './app'
import { sequelize } from './config/sequelize'

sequelize.sync({ force: true }).then(() => {
  app.listen(5000, function () {
    console.log('%s listening at %s', app.name, app.url)
  })
})
