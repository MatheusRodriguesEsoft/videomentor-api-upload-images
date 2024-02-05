import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Request, Response } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const uploadController = (req: Request, res: Response) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Multer Error:', err)
      return res.status(500).json({ error: 'Multer Error' })
    }
    uploadHandler(req, res)
  })
}

export const uploadHandler = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const uploadedFile = req.file

    const s3Client = new S3Client({
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    })

    const params = {
      Bucket: BUCKET_NAME,
      Key: uploadedFile.originalname,
      Body: uploadedFile.buffer,
      ContentType: uploadedFile.mimetype,
    }

    await s3Client.send(new PutObjectCommand(params))

    const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${uploadedFile.originalname}`

    return res.json({ fileUrl })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
