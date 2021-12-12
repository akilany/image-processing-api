import path from 'path'
import express from 'express'
import routes from './routes/index'

const app = express()
const PORT = 3333

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server is listning on port: http://localhost:${PORT}`)
})
