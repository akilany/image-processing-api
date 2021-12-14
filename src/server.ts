import path from 'path'
import express from 'express'
import routes from './routes/index'

const app = express()
const PORT = 3333

app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', routes)

app.get('/', (req, res) => {
  res.send(
    '<h1>Image Processing API</h1><a href="/api/image">Visit Image API</a>'
  )
})

app.listen(PORT, () => {
  console.log(`Server is listning on port: http://localhost:${PORT}`)
})

export default app
