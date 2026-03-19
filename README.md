# 🚀 CodeCraftHub: Full-Stack Course Tracker

CodeCraftHub is a lightweight, full-stack application designed for developers to track their learning goals. It features a Node.js/Express API for data persistence and a React/Tailwind CSS dashboard for a modern user experience.

---

## 📂 Project Structure

```
CodeCraftHub/
├── backend/           # Node.js + Express API
│   ├── app.js         # Server logic & CRUD routes
│   ├── courses.json   # Local JSON database
│   └── package.json
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/           # Components & API hooks
│   ├── public/        # Static assets
│   └── package.json
└── README.md          # Project documentation
```

---

## 🛠️ Features

- **Full CRUD:** Create, Read, Update, and Delete courses seamlessly.
- **Live Statistics:** Real-time dashboard showing "In Progress," "Completed," and "Total" counts.
- **Persistent Storage:** Data is saved to a local `courses.json` file — no heavy database setup required.
- **Modern UI:** Responsive dashboard built with React and Tailwind CSS.
- **CORS Enabled:** Seamless communication between the frontend (Port 5173) and backend (Port 5000).

---

## 🚀 Getting Started

To run this project, you must start both the backend and the frontend in **separate terminal windows**.

### 1. Backend Setup

```bash
cd backend
npm install
node app.js
```

The API will be available at `http://localhost:5000`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Dashboard will be available at `http://localhost:5173`.

---

## 📡 API Reference

| Method   | Endpoint             | Description                          |
|----------|----------------------|--------------------------------------|
| `GET`    | `/api/courses`       | Retrieve all courses                 |
| `GET`    | `/api/courses/stats` | Get course statistics for dashboard  |
| `POST`   | `/api/courses`       | Add a new learning goal              |
| `PUT`    | `/api/courses/:id`   | Update status or course details      |
| `DELETE` | `/api/courses/:id`   | Remove a course                      |

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v14.0 or higher
- NPM *(included with Node.js)*
