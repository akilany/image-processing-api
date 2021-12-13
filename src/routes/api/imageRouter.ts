import express from 'express'
import sharp from 'sharp'

const router = express.Router()

router.get('/', async (req, res) => {
  if (req.query.filename) {
    const filename = req.query.filename as string
    const height = req.query.height as unknown as number
    const width = req.query.width as unknown as number

    try {
      await sharp(`public/assets/images/full/${filename}.jpg`)
        .resize(width * 1, height * 1)
        .toFormat('jpg')
        .jpeg({ quality: 90 })
        .toFile(
          `public/assets/images/thumbs/${filename}-thumb(${width}x${height}).jpg`
        )

      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(
        `<img src="../../../assets/images/thumbs/${filename}-thumb(${width}x${height}).jpg" />`
      )
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'text/html', error: `${err}` })
      res.end(
        `There was an error: there is no file with this name (${filename})`
      )
      console.log(err)
    }
  } else res.end('Try to add this query "?filename=fjord&height=300&width=400"')
})

export default router
