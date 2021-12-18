import path from 'path'
import express from 'express'
import { Request, Response } from 'express'
import morgan from 'morgan'
import router from './routes/index'

const app = express()
const PORT = 3333

app.use(express.static(path.join(__dirname, '../public')))
app.use(morgan('dev'))

// Router
app.use('/api', router)
app.get('/', (req: Request, res: Response): void => {
  res
    .status(200)
    .send(
      '<h1>Image Processing API</h1><a href="/api/image">Visit Image API</a>'
    )
})

// Server
app.listen(PORT, () => {
  console.log(`Server is listning on port: http://localhost:${PORT}`)
})

export default app
