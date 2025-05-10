# Badminton League Management System

## Description
This is a hobby project I made for the local badminton club. Badminton is like the only hobby I have; I have got to give back to the community. The goal is to allow members to track their games and facilitate more competivitive games among different members.

## Features
- **User Registration**: Players can request to join the league, and admins can approve or decline requests. Automatically sends email for verification.
- **Match Management**:  Players can create, confirm, and decline matches. Players can confirm their participation in matches.
- **Score Settlement**: Automatically calculates and updates player scores based on match results.
- **Match-Making**: Automatically generates match groups based on player availability. Used vercel cron job for automatic generation.
- **Responsive UI**: The interface is optimized for both desktop and mobile devices.

## Technologies Used
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Notifications**: Nodemailer
- **Deployment**: Vercel

## Installation
1. Clone the repo
2. Navigate to the project directory:
   ```bash
   cd badminton-league
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB=your_database_name
   NEXT_PUBLIC_SECRET_KEY=your_jwt_secret_key
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## License
This project is licensed under the [MIT License](LICENSE).