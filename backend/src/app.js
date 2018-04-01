// @ts-check
import path from 'path'
import restify from 'restify'
import restifyPlugins from 'restify-plugins'

import {
  createTodo,
  listTodo,
  updateTodo,
  deleteTodo
} from './controllers/v1/todos.controller'
import {
  register,
  login,
  userInfo
} from './controllers/v1/auth.controller'
import { authorization } from './controllers/authorization'

const app = restify.createServer({
  name: 'test',
  version: '1.0.0'
})

app.use(restifyPlugins.acceptParser(app.acceptable))
app.use(restifyPlugins.queryParser())
app.use(restifyPlugins.bodyParser())
app.use(restifyPlugins.fullResponse())

app.get('/v1/todo', listTodo)
app.post('/v1/todo', createTodo)
app.patch('/v1/todo/:id', updateTodo)
app.del('/v1/todo/:id', deleteTodo)

app.post('/v1/auth/register', register)
app.post('/v1/auth/login', login)
app.get('/v1/auth/info', authorization, userInfo)

app.get('*', restifyPlugins.serveStatic({
  directory: path.join(__dirname, '..', 'public'),
  default: 'index.html'
}))

export {
  app
}
