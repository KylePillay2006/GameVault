# 🎮 GameVault API

<p align="center">
  <img src="https://img.shields.io/badge/Project-GameVault-blue?style=for-the-badge&logo=gamepad" />
  <img src="https://img.shields.io/badge/Status-Learning%20Unit%201-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Framework-Express.js-black?style=for-the-badge&logo=express" />
</p>

<p align="center">
  A secure video game collection REST API built with Node.js and Express.
</p>

---

# 📖 About The Project

**GameVault** is a backend REST API for managing a collection of video games.

The project is being developed as part of the **Information Systems 3D semester project** and will continue expanding throughout the semester into a complete MERN application.

The goal of GameVault is to provide a secure platform where users can manage, view, and interact with video game collections.

---

# 🎯 Learning Unit 1 Overview

Learning Unit 1 focuses on establishing the backend foundation.

During this phase, GameVault includes:

✅ Node.js project setup  
✅ Express server configuration  
✅ Environment variable management  
✅ REST API development  
✅ JSON request handling  
✅ API routing  
✅ Input validation  
✅ Error handling  
✅ Secure development practices  

---

# 🏗️ Project Architecture

```
GameVault
│
├── 📄 README.md
├── 📄 .gitignore
│
└── backend
    │
    ├── 📄 server.js
    ├── 📄 package.json
    ├── 📄 package-lock.json
    └── 📄 .env.example
```

---

# 🛠️ Technologies Used

## Backend

| Technology | Purpose |
|---|---|
| 🟢 Node.js | JavaScript runtime |
| ⚡ Express.js | Web application framework |
| 🔐 dotenv | Environment configuration |
| 🔄 Nodemon | Development auto-restart |

## Development Tools

| Tool | Purpose |
|---|---|
| Git | Version control |
| GitHub | Repository hosting |
| Postman | API testing |
| VS Code | Development environment |

---

# 🚀 Getting Started

## 📥 Clone Repository

```bash
git clone https://github.com/KylePillay2006/GameVault.git
```

---

## 📂 Navigate To Backend

```bash
cd GameVault/backend
```

---

## 📦 Install Dependencies

```bash
npm install
```

This installs all required packages from `package.json`.

---

# 🔐 Environment Setup

Create a file called:

```
.env
```

inside the backend folder.

Add:

```env
PORT=5000
APP_NAME=GameVault API
NODE_ENV=development
```

Example configuration is provided in:

```
.env.example
```

⚠️ The `.env` file is ignored by Git and must never be uploaded.

---

# ▶️ Running The Application

## Development Mode

```bash
npm run dev
```

Runs the server using Nodemon.

Changes to files automatically restart the application.

---

## Production Mode

```bash
npm start
```

Starts the server normally.

---

# 🌎 API Information

Default server address:

```
http://localhost:5000
```

---

# 📡 API Endpoints

## 🏠 Root Endpoint

### GET `/`

Checks that the API is running.

Example:

```json
{
  "message": "Welcome to GameVault API!"
}
```

---

# ℹ️ About Endpoint

### GET `/about`

Returns application information.

Example:

```json
{
  "application": "GameVault API",
  "stage": "Learning Unit 1 - Backend Foundations"
}
```

---

# ❤️ Health Check

### GET `/health`

Used to verify server status.

Example response:

```json
{
  "status": "OK",
  "application": "GameVault API",
  "environment": "development",
  "timestamp": "2026-07-17T12:00:00"
}
```

---

# 🎮 Game API

## 📚 Retrieve All Games

```
GET /games
```

Returns all stored games.

---

## 🔎 Retrieve Single Game

```
GET /games/:id
```

Example:

```
GET /games/1
```

---

## ➕ Add New Game

```
POST /games
```

Example request:

```json
{
  "title": "Cyberpunk 2077",
  "genre": "RPG",
  "platform": "PC",
  "releaseYear": 2020,
  "ageRating": "M",
  "available": true
}
```

---

# 🛡️ Security Features

GameVault follows secure-by-design principles:

🔒 Environment variables for configuration  
🔒 Sensitive files excluded using `.gitignore`  
🔒 Input validation on client data  
🔒 Safe error responses  
🔒 Invalid route handling  
🔒 Appropriate HTTP status codes  

---

# 🧪 API Testing

Testing was completed using **Postman**.

The GameVault LU1 collection includes:

✅ Root endpoint test  
✅ About endpoint test  
✅ Health check test  
✅ Retrieve all games  
✅ Retrieve game by ID  
✅ Add valid game  
✅ Reject invalid game  
✅ Invalid route testing  

---

# 📊 HTTP Status Codes Used

| Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 400 | Invalid input |
| 404 | Resource not found |
| 500 | Server error |

---

# 🔮 Future Development Roadmap

GameVault will continue expanding with:

## Learning Unit 2+
- 📁 Improved folder architecture
- 🛣️ Separate routes
- 🎮 Controllers
- 🧩 Middleware

## Learning Unit 3+
- 🗄️ MongoDB database
- 👤 User accounts
- 🔑 Authentication
- 🪪 JWT security

## Final Application
- ⚛️ React frontend
- 🌐 Full MERN architecture
- 🚀 Deployment

---

# 👨‍💻 Author

**Kyle Pillay**

🎓 Information Systems 3D  
🎮 GameVault Semester Project

---

# ⭐ Project Status

```
Learning Unit 1 ✅ Complete
Backend Foundation ✅ Complete
REST API ✅ Complete
Database ⏳ Coming Soon
Frontend ⏳ Coming Soon
```

---

<p align="center">
  🎮 Built with Node.js + Express | GameVault 2026
</p>
