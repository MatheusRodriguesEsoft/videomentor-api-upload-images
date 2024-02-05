import { app } from './server/server'

import dotenv from 'dotenv'

dotenv.config()

app.listen(process.env.PORT || 3001, () =>
  console.log('Server running on 3001: http://localhost:3001')
)
