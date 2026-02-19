# Micro-MarketPlace

A full-stack e-commerce application that allows users to browse, create, update, and manage products, with user authentication and favorites management.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Environment Variables](#environment-variables)

---

##  Project Overview

**Micro-MarketPlace** is a MERN stack application that provides:
- User authentication (Register/Login with JWT)
- Product management (Create, Read, Update, Delete)
- Product search and pagination
- Favorites/Wishlist management
- Secure API endpoints with token-based authorization

---

##  Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Validation**: express-validator
- **CORS**: Enabled for cross-origin requests

### Frontend
- **Library**: React 19.2.0
- **Build Tool**: Vite
- **Styling**: TailwindCSS with Shadcn UI
- **Routing**: React Router DOM
- **HTTP Client**: Axios with interceptors
- **Form Management**: React Hook Form with Zod validation
- **Icons**: Lucide React

---

## 📁 Project Structure

```
Micro-MarketPlace/
├── Backend/                    # Express.js server
│   ├── controllers/            # Route handlers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/             # Custom middleware
│   │   └── authMiddleware.js
│   ├── utils/                  # Utility functions
│   │   └── generateToken.js
│   ├── .env                    # Environment variables
│   ├── server.js               # Main server file
│   └── package.json
│
└── web/                        # React frontend
    ├── src/
    │   ├── components/         # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   └── ui/             # shadcn UI components
    │   ├── context/            # React Context
    │   │   ├── AuthContext.jsx
    │   │   └── ProductContext.jsx
    │   ├── pages/              # Page components
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── ProductDetails.jsx
    │   │   └── CreateProduct.jsx
    │   ├── utils/              # Utility functions
    │   │   └── api.js          # Axios instance
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup

#### 1. Navigate to Backend Directory
```bash
cd Backend
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the Backend directory:

```env
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/Mini_Cart?appName=Cluster0
JWT_SECRET=your_jwt_secret_key
```

**Note**: Replace with your actual MongoDB URI and JWT secret.

#### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:8000`

---

### Frontend Setup

#### 1. Navigate to Web Directory
```bash
cd web
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start Development Server
```bash
npm run dev
```

The frontend will typically run on `http://localhost:5173`

#### 4. Build for Production
```bash
npm run build
```

#### 5. Preview Production Build
```bash
npm run preview
```


