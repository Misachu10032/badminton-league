# Badminton League Management System

## Description
The **Badminton League Management System** is a web application designed to manage a badminton league. It allows admins to handle user registrations, match scheduling, score tracking, and user management. Players can register, view their matches, and confirm their participation. The system also includes features for match-making, score settlement, and user ranking.

## Features
- **User Registration**: Players can request to join the league, and admins can approve or decline requests.
- **Match Management**: Admins can create, confirm, and decline matches. Players can confirm their participation in matches.
- **Score Settlement**: Automatically calculates and updates player scores based on match results.
- **Match-Making**: Automatically generates match groups based on player availability.
- **User Management**: Admins can view, edit, and delete users.
- **Responsive UI**: The interface is optimized for both desktop and mobile devices.

## Technologies Used
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Notifications**: Nodemailer
- **Deployment**: Vercel (or any other platform)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/badminton-league.git
   ```
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

## Usage
### Admin Features
- **User Management**: Admins can view, edit, and delete users from the `UserManagementTable`.
- **Match Management**: Admins can create, confirm, and decline matches.
- **Match-Making**: Admins can generate match groups based on player availability.
- **Score Settlement**: Admins can settle scores after matches are completed.

### Player Features
- **Registration**: Players can request to join the league by submitting their email and name.
- **Match Confirmation**: Players can confirm their participation in assigned matches.
- **Score Tracking**: Players can view their scores and rankings.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).