import mongoose from 'mongoose'
import { MONGO_DB_URI } from '@monorepo/utils/config'
import { logger } from '@monorepo/utils/logger'

logger.filename = 'database/connection.ts'

let isConnected = false

export const connectToDatabase = async (): Promise<void> => {
  if (isConnected) {
    logger.info('Using existing MongoDB connection')
    return
  }

  try {
    const connection = await mongoose.connect(MONGO_DB_URI)
    logger.success(`Connected to MongoDB: ${MONGO_DB_URI}`)
    isConnected = true
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

export const disconnectFromDatabase = async (): Promise<void> => {
  if (!isConnected) {
    logger.info('No active MongoDB connection to disconnect')
    return
  }

  try {
    await mongoose.disconnect()
    isConnected = false
    logger.info('Disconnected from MongoDB')
  } catch (error) {
    logger.error('Failed to disconnect from MongoDB:', error)
    throw error
  }
}

export { mongoose }
