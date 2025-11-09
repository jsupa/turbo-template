import { connectToDatabase } from '@monorepo/database'
import { logger } from '@monorepo/utils/logger'

// import app from './app'

logger.filename = 'index.ts'

const port = 3001

const init = async () => {
  await connectToDatabase()

  // server.listen(port, '::', () => {
  //   logger.success(`Server is running at http://localhost:${port}`)
  // })
}

init()
