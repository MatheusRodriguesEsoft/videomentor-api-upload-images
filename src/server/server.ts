import cors from 'cors'
import express from 'express'
import { uploadController } from '../drive/uploadController'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.get('/', (req, res) => {
  return res.send('API VideoMentor Upload Images')
})

app.post('/upload', uploadController)

export { app }
