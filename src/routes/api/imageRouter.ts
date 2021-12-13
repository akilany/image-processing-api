import express from 'express'
import sharp from 'sharp'

const router = express.Router()

const resizeImage = async (filename: string, width: number, height: number) => {
  try {
    await sharp(`public/assets/images/full/${filename}.jpg`)
      .resize(width, height)
      .toFormat('jpg')
      .jpeg({ quality: 90 })
      .toFile(`public/assets/images/thumbs/${filename}-thumb(${width}x${height}).jpg`)
  } catch (err) {
    console.log(err)
  }
}

router.get('/', async (req, res) => {
  const filename = req.query.filename as string
  const height = (req.query.height as unknown) as number
  const width = (req.query.width as unknown) as number

  await resizeImage(filename, width *1, height *1)

  res.writeHead(200, { 'Content-Type': 'text/html'})
  res.end(`<img src="../../../assets/images/thumbs/${filename}-thumb(${width}x${height}).jpg" />`)
})

export default router

