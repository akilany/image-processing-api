import express from 'express'
import imageRouter from './api/imageRouter'

const router = express.Router()

router.route('/').get((req, res) => {
  res.send('<h1>Main API Route</h1><a href="/api/image">Visit Image API</a>')
})

router.use('/image', imageRouter)

export default router
