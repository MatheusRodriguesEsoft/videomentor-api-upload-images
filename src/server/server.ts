import { uploadController } from '../drive/uploadController'
import { deleteImages } from '../drive/deleteImages'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.get('/', (req, res) => {
  return res.send('API VideoMentor Upload Images')
})

app.post('/upload', uploadController)

app.delete('/delete/:imageId', deleteImages)

export { app }
