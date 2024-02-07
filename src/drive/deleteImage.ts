import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'
import { Request, Response } from 'express'

dotenv.config()

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { fileName } = req.params

    if (!fileName) {
      return res.status(400).json({ error: 'Missing fileName parameter' })
    }

    const s3Client = new S3Client({
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    })

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    }

    await s3Client.send(new DeleteObjectCommand(params))

    return res.json({ message: 'Image deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
