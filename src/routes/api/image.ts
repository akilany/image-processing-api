import express from 'express'
import sharp from 'sharp'

const image = express.Router()

const writeFile = async (filename: string, width: number, height: number) => {
  try {
    await sharp(`${__dirname}/../../public/assets/images/full/${filename}.jpg`)
      .resize(width, height)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${__dirname}/../../public/assets/images/thumbs/${filename}-thumb(${width}x${height}).jpg`)
  } catch (err) {
    console.log(err)
  }
  
}

image.get('/', async (req, res) => {
  const filename = req.query.filename as string
  const height = (req.query.height as unknown) as number
  const width = (req.query.width as unknown) as number

  await writeFile(filename, width *1, height *1)

  res.writeHead(200, { 'Content-Type': 'text/html'})
  res.end(`<img src="../assets/images/thumbs/${filename}-thumb(${width}x${height}).jpg" />`)
})

export default image
