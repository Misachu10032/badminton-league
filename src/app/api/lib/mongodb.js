import { MongoClient } from 'mongodb';

let client;
let clientPromise;

export async function connectToDatabase() {
  // Use the MongoDB URI from environment variables
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable in your .env file');
  }

  if (!client) {
    // Create a new MongoClient
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connect to the MongoDB server
    clientPromise = client.connect();
  }

  // Wait for the client to be ready
  await clientPromise;

  // Return the database and client
  return {
    client,
    db: client.db(process.env.MONGODB_DB), // Use the database name from .env
  };
}
