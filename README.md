# MERN URL Shortener

A full-stack URL shortening application built using the MERN stack.

This application converts long URLs into short, shareable links and redirects users to the original URL when the short link is opened.

## Live Demo

- Frontend: https://mern-url-shortener-frontend-omega.vercel.app
- Backend: https://mern-url-shortener-ikk9.onrender.com

## Features

- Convert long URLs into short URLs
- Generate unique short codes
- Redirect short URLs to original URLs
- Validate URLs before saving
- Track the number of clicks
- Store URL data in MongoDB
- Responsive React frontend
- REST API-based backend
- Deployed using Vercel and Render

## Tech Stack

### Frontend

- React
- Vite
- Axios
- CSS

### Backend

- Node.js
- Express.js
- Mongoose
- Nanoid
- CORS
- dotenv

### Database

- MongoDB Atlas

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

```text
mern-url-shortener/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    ├── public/
    ├── .env
    ├── package.json
    └── index.html
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/urls/shorten` | Create a short URL |
| GET | `/:shortCode` | Redirect to the original URL |
| GET | `/` | Check backend status |

## Environment Variables

### Backend

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=your_frontend_url
BACKEND_URL=your_backend_url
```

### Frontend

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=your_backend_url
```

Never commit your `.env` files to GitHub.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/aditya56-ctrl/mern-url-shortener.git
cd mern-url-shortener
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## How It Works

1. The user enters a long URL.
2. React sends the URL to the Express backend.
3. The backend validates the URL.
4. Nanoid generates a unique short code.
5. The URL information is stored in MongoDB.
6. The backend returns the shortened URL.
7. When the short URL is opened, the backend redirects the user to the original URL.

## Future Improvements

- User authentication
- URL history
- Custom short codes
- QR code generation
- URL expiration
- Detailed click analytics
- Copy-to-clipboard functionality

## Author

Aditya Mahajan

GitHub: https://github.com/aditya56-ctrl
