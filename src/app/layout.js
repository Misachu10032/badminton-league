import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NotificationProvider from "../context/NotificationContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Badminton League",
  description: "A simple badminton league management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <NotificationProvider>
          {children}


        </NotificationProvider>
      </body>
    </html>
  );
}
