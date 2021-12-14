import express from 'express'
import imageRouter from './api/imageRouter'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('<h1>Main API Route</h1><a href="/api/image">Visit Image API</a>')
})

routes.use('/image', imageRouter)

export default routes
