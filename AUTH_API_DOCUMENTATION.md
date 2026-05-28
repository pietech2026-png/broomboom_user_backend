# BroomBoom Backend Authentication API Documentation

# 1. Project Overview

This document explains the complete authentication backend setup for the BroomBoom Cabs application using:

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Vercel Deployment

Includes:

- Login API
- Register API
- MongoDB Connection
- Request Body Handling
- Vercel Deployment
- Error Fixes

---

# 2. Project Structure

```text
broomboom_backend/
│
├── api/
│   └── index.js
│
├── controllers/
│   └── authController.js
│
├── routes/
│   └── authRoutes.js
│
├── models/
│   └── userModel.js
│
├── config/
│   └── db.js
│
├── middleware/
│
├── package.json
├── vercel.json
├── .env
│
└── README.md
```

---

# 3. Install Required Packages

Run:

```bash
npm install express mongoose cors dotenv
```

Optional:

```bash
npm install bcryptjs jsonwebtoken
```

---

# 4. package.json

## `package.json`

```json
{
  "name": "broomboom-backend",
  "version": "1.0.0",
  "main": "api/index.js",
  "scripts": {
    "start": "node api/index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.2",
    "mongoose": "^8.0.0"
  }
}
```

---

# 5. Environment Variables

Create `.env`

## `.env`

```env
PORT=5004

MONGO_URI=mongodb+srv://txigo:txigo123@clusterpie.q0dn72b.mongodb.net/broomboom_user_db?retryWrites=true&w=majority

NODE_ENV=development
```

---

# 6. MongoDB Connection

Create:

## `config/db.js`

```js
const mongoose = require("mongoose");

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("Mongo Connected");

    } catch (error) {

        console.log(error);

        process.exit(1);

    }

};

module.exports = connectDB;
```

---

# 7. Main Express Server

Create:

## `api/index.js`

```js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("../config/db");

const authRoutes = require("../routes/authRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());





// ROOT ROUTE

app.get("/", (req, res) => {

    res.send("Backend Working");

});





// AUTH ROUTES

app.use("/api/auth", authRoutes);

module.exports = app;
```

---

# 8. Authentication Routes

Create:

## `routes/authRoutes.js`

```js
const express = require("express");

const router = express.Router();

const {
    login,
    register
} = require("../controllers/authController");





// LOGIN

router.post("/login", login);





// REGISTER

router.post("/register", register);

module.exports = router;
```

---

# 9. Authentication Controller

Create:

## `controllers/authController.js`

```js
exports.login = async (req, res) => {

    try {

        if (!req.body) {

            return res.status(400).json({
                success: false,
                message: "Request body missing"
            });

        }

        const { phone } = req.body || {};

        return res.status(200).json({

            success: true,
            message: "Login API Working",
            phone

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};





exports.register = async (req, res) => {

    try {

        if (!req.body) {

            return res.status(400).json({
                success: false,
                message: "Request body missing"
            });

        }

        const { name, email, password } = req.body || {};

        return res.status(200).json({

            success: true,
            message: "Register API Working",
            user: {
                name,
                email
            }

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};
```

---

# 10. Vercel Configuration

Create:

## `vercel.json`

```json
{
  "version": 2,

  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],

  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js"
    }
  ]
}
```

---

# 11. Push Code To GitHub

Run:

```bash
git add .

git commit -m "Added auth APIs"

git push
```

---

# 12. Vercel Deployment

Go to:

```text
https://vercel.com/dashboard
```

Import GitHub repository.

---

# 13. Add Environment Variables In Vercel

Go to:

```text
Project
→ Settings
→ Environment Variables
```

Add:

| KEY | VALUE |
|---|---|
| MONGO_URI | your mongodb uri |
| NODE_ENV | development |

---

# 14. Live Backend URL

```text
https://broomboom-user-backend.vercel.app
```

---

# 15. API Endpoints

---

## Root Route

```text
GET /
```

Example:

```text
https://broomboom-user-backend.vercel.app
```

---

## Login API

```text
POST /api/auth/login
```

Example:

```text
https://broomboom-user-backend.vercel.app/api/auth/login
```

---

## Register API

```text
POST /api/auth/register
```

Example:

```text
https://broomboom-user-backend.vercel.app/api/auth/register
```

---

# 16. IMPORTANT Browser Note

Browser sends:

```text
GET REQUEST
```

But login/register are:

```text
POST APIs
```

So browser may show:

```text
Cannot GET /api/auth/login
```

This is normal.

---

# 17. Correct curl Login Test

```bash
curl -X POST https://broomboom-user-backend.vercel.app/api/auth/login \
-H "Content-Type: application/json" \
-d '{"phone":"9876543210"}'
```

---

# 18. Expected Login Response

```json
{
  "success": true,
  "message": "Login API Working",
  "phone": "9876543210"
}
```

---

# 19. Correct curl Register Test

```bash
curl -X POST https://broomboom-user-backend.vercel.app/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Rhythm","email":"rhythm@gmail.com","password":"123456"}'
```

---

# 20. Expected Register Response

```json
{
  "success": true,
  "message": "Register API Working",
  "user": {
    "name": "Rhythm",
    "email": "rhythm@gmail.com"
  }
}
```

---

# 21. Previous Error Explanation

Error:

```text
Cannot destructure property 'phone' of 'req.body' as it is undefined
```

Reason:

```text
Request body was missing
```

Fix:

```js
const { phone } = req.body || {};
```

---

# 22. Common Errors

| Error | Cause | Solution |
|---|---|---|
| 404 NOT FOUND | Route missing | Add route |
| Cannot GET | GET instead of POST | Use POST |
| Internal Server Error | Controller crash | Check logs |
| req.body undefined | Missing JSON body | Send JSON body |
| MongoNetworkError | Atlas blocked | Add Network Access |

---

# 23. View Vercel Logs

Go to:

```text
Vercel Dashboard
→ Deployments
→ Latest Deployment
→ Functions Logs
```

---

# 24. Flutter Base URL

```dart
const String baseUrl =
    "https://broomboom-user-backend.vercel.app";
```

---

# 25. Example Flutter Login API

```dart
final response = await http.post(
  Uri.parse("$baseUrl/api/auth/login"),

  headers: {
    "Content-Type": "application/json"
  },

  body: jsonEncode({
    "phone": "9876543210"
  }),
);
```

---

# 26. Backend Architecture

```text
Flutter App
      ↓
REST API Calls
      ↓
Vercel Backend
      ↓
Express Controllers
      ↓
MongoDB Atlas
```

---

# 27. Recommended Next Features

After auth API:

- JWT Authentication
- bcrypt Password Hashing
- User Schema
- OTP Verification
- Protected Routes
- Driver APIs
- Ride Booking APIs
- Razorpay Integration
- Live Tracking

---

# 28. Final Backend Status

✅ Vercel Deployment Working  
✅ MongoDB Connected  
✅ API Routes Working  
✅ Controllers Working  
✅ Request Body Handling Fixed  
✅ Flutter Integration Ready
