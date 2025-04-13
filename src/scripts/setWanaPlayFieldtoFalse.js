
import { connectToDatabase } from '../app/api/lib/mongodb.js';

export async function updateWanaPlayField() {
  const { db } = await connectToDatabase();

  try {
    const result = await db.collection('users').updateMany({}, {
      $set: { iWanaPlay: false }
    });

    console.log(`Matched ${result.matchedCount} users`);
    console.log(`Modified ${result.modifiedCount} users`);
  } catch (error) {
    console.error('Error updating users:', error);
  } finally {
    process.exit(0); // Graceful exit
  }
}

