import fs from 'fs'
import { Request, Response, NextFunction } from 'express'
import sharp from 'sharp'

// Resize using sharp
const resizeImage = async (
  filename: string,
  width: number,
  height: number
): Promise<void> => {
  await sharp(`public/assets/images/full/${filename}.jpg`)
    .resize(width, height)
    .toFormat('jpg')
    .jpeg({ quality: 90 })
    .toFile(
      `public/assets/images/thumbs/${filename}-thumb(${width}x${height}).jpg`
    )
}

// processing image middleware
const imageMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // check if query parameter is provided
  if (req.query.filename && req.query.width && req.query.height) {
    const filename = req.query.filename as string
    const height = parseInt(req.query.height as string)
    const width = parseInt(req.query.width as string)

    try {
      const thumbImage = fs.existsSync(
        `public/assets/images/thumbs/${filename}-thumb(${width}x${height}).jpg`
      )

      // if thumb image dose not exist in thumb folder create a new thumb image
      if (!thumbImage) await resizeImage(filename, width, height)

      // send thumb image to client
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(
        `<img src="../../../assets/images/thumbs/${filename}-thumb(${width}x${height}).jpg" />`
      )
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'text/html', error: `${err}` })
      res.end(`${err}`)
    }
  } else
    res.send(
      '<h2>Visit this query</h2> <a href="/api/image?filename=fjord&height=300&width=400">Image Resize</a>'
    )

  next()
}

export default { resizeImage, imageMiddleware }
