import express from 'express'
import imageController from '../../controllers/imageController'

const router = express.Router()

router.get('/', imageController.imageMiddleware)

export default router
