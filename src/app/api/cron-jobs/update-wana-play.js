import { updateWanaPlayField } from "../../../scripts/setWanaPlayFieldtoFalse";


export default async function handler(req, res) {
  try {
    console.log('🕒 Cron triggered at', new Date().toISOString());

    // Run the script
    await updateWanaPlayField();

    res.status(200).json({ message: 'Script ran successfully' });
  } catch (error) {
    console.error('❌ Error in cron task:', error);
    res.status(500).json({ message: 'Script failed', error });
  }
}
