import { MongoClient } from 'mongodb';

let client;
let clientPromise;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable in your .env file');
  }

  if (!clientPromise) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 30,
      minPoolSize: 0,
    });
    clientPromise = client.connect();
  }

  try {
    await clientPromise;
    return {
      client,
      db: client.db(process.env.MONGODB_DB),
    };
  } catch (error) {
    console.error('Database connection error:', error);
    await clientPromise; // Attempt to reconnect
    return {
      client,
      db: client.db(process.env.MONGODB_DB),
    };
  }
}

// Graceful shutdown handler
async function closeDatabaseConnection() {
  if (client) {
    await client.close();
  }
}

// Attach the shutdown handler to the process
process.on('SIGINT', async () => {
  await closeDatabaseConnection();
  process.exit(0);
});