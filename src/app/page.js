import { redirect  } from 'next/navigation';

export default function RootPage() {
  // Automatically redirect to the login page
  redirect('/login');
}
