import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME

export const deleteImages = async (req: Request, res: Response) => {
  const imageKey = req.params.imageKey

  try {
    if (!imageKey) {
      return res.status(400).json({ error: 'No image key provided' })
    }

    const s3Client = new S3Client({
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    })

    const deleteParams = {
      Bucket: BUCKET_NAME,
      Key: imageKey,
    }

    await s3Client.send(new DeleteObjectCommand(deleteParams))

    return res.json({ success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
