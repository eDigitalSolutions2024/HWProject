import mongoose from 'mongoose';
import logger from '@logger';

const connection = async () => {
  const MONGO_URI = process.env.MONGODB_CNN;

  if (!MONGO_URI) {
    logger.error('[MongoDB Connection] Missing MONGODB_CNN in environment variables.');
    throw new Error('Missing MongoDB URI in environment variables.');
  }

  try {
    logger.verbose('[MongoDB Connection]', 'Initializing database connection...');
    logger.debug(`[MongoDB Connection] Connecting to: ${MONGO_URI}`);

    await mongoose.connect(MONGO_URI, { family: 4 });

    logger.silly('[MongoDB Connection]', 'Successfully connected to MongoDB.');
  } catch (error) {
    logger.error('[MongoDB Connection] Connection failed:', error);
    throw new Error('Error connecting to MongoDB.');
  }
};

const disconnect = async () => {
  try {
    await mongoose.connection.close();
    logger.info('[MongoDB Connection] Disconnected from MongoDB.');
  } catch (error) {
    logger.error('[MongoDB Disconnect]', error);
    throw new Error('Error disconnecting from MongoDB.');
  }
};

export { connection, disconnect };
