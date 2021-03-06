import supertest from 'supertest'
import app from '../server'
import imageController from '../controllers/imageController'

const req = supertest(app)

describe('Test endpoint responses', () => {
  it('gets api endpoint', async (done) => {
    const res = await req.get('/api')
    expect(res.status).toBe(200)
    done()
  })

  it('gets image endpoint', async (done) => {
    const res = await req.get('/api/image')
    expect(res.status).toBe(200)
    done()
  })

  it('resizes the image', async (done) => {
    const res = await req.get('/api/image?filename=fjord&height=300&width=400')
    expect(res.status).toBe(200)
    done()
  })

  it('expects resize to throw an specific error', async (done) => {
    const res = await req.get('/api/image?filename=file&height=400&width=300')
    expect(res.header.error).toBe('Error: Input file is missing')
    done()
  })

  it('expects resize to throw error bad request', async (done) => {
    const res = await req.get('/api/image?filename=file&height=400&width=300')
    expect(res.status).toEqual(400)
    done()
  })
})

describe('Image processing functionality', () => {
  it('expects to be defined', () => {
    expect(imageController.imageMiddleware).toBeDefined()
  })

  it('expects resize image to be success', async () => {
    const res = await imageController.resizeImage('fjord', 400, 350)
    expect(res).toBe('Success')
  })
})
