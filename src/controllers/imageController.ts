import fs from 'fs'
import { Request, Response, NextFunction } from 'express'
import sharp from 'sharp'

// processing image middleware
export default async (req: Request, res: Response, next: NextFunction) => {
  // check if query parameter is provided
  if (req.query.filename && req.query.width && req.query.height) {
    const filename = req.query.filename as string
    const height = req.query.height as unknown as number
    const width = req.query.width as unknown as number

    try {
      const thumbImage = fs.existsSync(
        `public/assets/images/thumbs/${filename}-thumb(${width}x${height}).jpg`
      )

      // if thumb image dose not exist in thumb folder create a new thumb image
      if (!thumbImage) {
        await sharp(`public/assets/images/full/${filename}.jpg`)
          .resize(width * 1, height * 1)
          .toFormat('jpg')
          .jpeg({ quality: 90 })
          .toFile(
            `public/assets/images/thumbs/${filename}-thumb(${width}x${height}).jpg`
          )
      }

      // send thumb image to client
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
  } else
    res.send(
      '<h2>Visit this query</h2> <a href="/api/image?filename=fjord&height=300&width=400">Image Resize</a>'
    )

  next()
}
