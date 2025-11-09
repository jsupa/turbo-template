import * as http from 'node:http'
import { logger } from '@monorepo/utils/logger'

import app from './app'

logger.filename = 'index.ts'

const port = 3001

const init = async (): Promise<void> => {
  const server = http.createServer(app)

  server.listen(port, '::', () => {
    logger.success(`Server is running at http://localhost:${port}`)
  })
}

init()
