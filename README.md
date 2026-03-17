🚀 JobScribe — AI-Powered Job Application Tracker

JobScribe is a full-stack web application that helps job seekers organize, track, and optimize their job applications in one place. It combines traditional tracking tools with AI-powered insights to improve application success.

---

✨ Features

🔐 Authentication

- Email & Password login
- Google OAuth Sign-In
- JWT-based authentication
- Secure HTTP-only cookies
- Persistent sessions
- Protected routes

📊 Dashboard

- Overview of total applications
- Status breakdown (Applied, Interview, Offer, Rejected)
- Recent activity tracking

🧾 Application Management

- Add new job applications
- Update application status
- Delete applications
- Track company, role, and notes
- Organized view of all submissions

📁 Resume Management

- Upload and manage multiple resumes
- Select resume for specific applications
- Centralized storage

🤖 AI Resume Analyzer

- Compare resume against job description
- Match scoring
- Suggestions for improvement
- Identify skill gaps

📱 User Experience

- Modern responsive interface
- Clean dashboard design
- Seamless navigation

---

🛠️ Tech Stack

Frontend

- React
- Context API (State Management)
- React Router
- Axios
- Modern CSS

Backend

- Node.js
- Express.js
- MongoDB + Mongoose

Authentication

- JWT (JSON Web Tokens)
- Google OAuth 2.0
- Passport.js

AI Integration

- OpenAI API

Deployment

- Frontend hosted on [Vercel]
- Backend hosted on [Render]
- Database hosted on MongoDB Atlas

---

🌐 Live Demo

👉 [Add Live URL]

---

⚡ Getting Started (Local Setup)

Prerequisites

- Node.js installed
- MongoDB database
- Google OAuth credentials
- OpenAI API key

---

1️⃣ Clone the Repository

git clone https://github.com/your-username/jobscribe.git
cd jobscribe

---

2️⃣ Backend Setup

cd backend
npm install

Create a ".env" file:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
OPENAI_API_KEY=your_api_key

Run server:

npm run dev

---

3️⃣ Frontend Setup

cd frontend
npm install
npm start

---

📌 Future Improvements

- Job scraping integrations
- Email reminders for follow-ups
- Interview scheduling tools
- Analytics & insights
- Mobile app version

---

👨‍💻 Author

Divyaraj Purohit
BCA Student | Aspiring Full-Stack Developer

---

⭐ Show Your Support

If you found this project useful, consider giving it a star ⭐
