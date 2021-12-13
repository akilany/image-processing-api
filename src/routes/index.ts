import express from 'express'
import imageRouter from './api/imageRouter'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('Main API Route')
})

routes.use('/image', imageRouter)

export default routes
