import express from 'express'
import teachers from './api/teachers'

const routes = express.Router()

routes.get('/', (Req, res) => {
  res.send('Main API Route')
})

routes.use('/teachers', teachers)

export default routes
