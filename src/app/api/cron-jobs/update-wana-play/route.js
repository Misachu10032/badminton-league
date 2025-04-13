
import { NextResponse } from 'next/server';
import { updateWanaPlayField } from '../../../../scripts/setWanaPlayFieldtoFalse';

export async function GET() {
  try {
    console.log('🕒 Cron triggered at', new Date().toISOString());

    await updateWanaPlayField();

    return NextResponse.json({ message: 'Script ran successfully' });
  } catch (error) {
    console.error('❌ Error in cron task:', error);
    return NextResponse.json(
      { message: 'Script failed', error: error.message },
      { status: 500 }
    );
  }
}
