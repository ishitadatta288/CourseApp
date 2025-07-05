📘 Project Title:
Edulocity – Online Learning Platform

📝 Project Description:

Edulocity is a modern, full-stack web application that allows users to browse, purchase, and access educational courses. The platform is built to simplify online learning and course enrollment with a clean interface and responsive design.
It features user authentication, dynamic course listing using a carousel, integration with a backend API, and a secure login/logout flow using JWT (JSON Web Tokens).

💡 Key Features:
✅ Frontend (React.js)

Landing Page: Eye-catching homepage with a course showcase carousel (using react-slick).
Authentication: Login and signup functionality, conditionally rendering login/logout buttons based on user token.
Course Display: Fetches and displays courses from backend using Axios.
Responsive UI: Tailored for mobile and desktop views.
Navigation: Integrated routing via react-router-dom.

✅ Backend (Node.js + Express)

Authentication: JWT-based login with token stored in either localStorage or cookies.
Course API: Provides course data to frontend.
Logout: Clears the user token (via header or cookie, based on implementation).
CORS & Secure Headers: Allows secure communication between frontend and backend.

🛠️ Technology Stack:
Frontend:

React.js
Tailwind CSS
Axios
React Router DOM
React Icons
React Toastify (for notifications)
React Slick (carousel)

Backend:

Node.js
Express.js
MongoDB (via Mongoose)
JWT for authentication
CORS for frontend-backend communication

🔐 Authentication Flow:

Upon login, the backend sends a JWT token to the client.
The token is stored in localStorage (or cookie, depending on setup).
Protected routes check for the presence of the token to display appropriate options like Logout or Enroll.

🎯 Project Goals:

Provide a user-friendly and mobile-responsive platform for browsing and enrolling in courses.
Implement secure login/logout handling using JWT.
Build a scalable and modular full-stack application using MERN stack principles.
