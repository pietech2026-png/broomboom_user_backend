# BroomBoom Auth API Setup Documentation

# 1. Overview

This document explains how to create and test authentication APIs for the BroomBoom backend deployed on Vercel.

Included APIs:

- Register API
- Login API
- Logout API
- Profile API

---

# 2. Current Backend URL

```text
https://broomboom-user-backend-mq8g.vercel.app
```

---

# 3. Folder Structure

```text
broomboom_backend/
│
├── api/
│   └── index.js
│
├── routes/
│   └── authRoutes.js
│
├── controllers/
│   └── authController.js
│
├── models/
│   └── userModel.js
│
├── middleware/
│   └── authMiddleware.js
│
├── package.json
├── vercel.json
└── .env
```

---

# 4. Basic Express Server

## `api/index.js`

```js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.send("BroomBoom Backend Running Successfully");

});

module.exports = app;
```

---

# 5. Add Auth APIs

Inside `api/index.js`

```js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.send("BroomBoom Backend Running Successfully");

});





// REGISTER API

app.post("/api/auth/register", (req, res) => {

    res.status(200).json({

        success: true,
        message: "Register API Working"

    });

});





// LOGIN API

app.post("/api/auth/login", (req, res) => {

    res.status(200).json({

        success: true,
        message: "Login API Working"

    });

});





// LOGOUT API

app.post("/api/auth/logout", (req, res) => {

    res.status(200).json({

        success: true,
        message: "Logout API Working"

    });

});





// PROFILE API

app.get("/api/auth/profile", (req, res) => {

    res.status(200).json({

        success: true,
        user: {

            name: "Rhythm",
            email: "rhythm@gmail.com"

        }

    });

});

module.exports = app;
```

---

# 6. Push Changes To GitHub

Run:

```bash
git add .

git commit -m "Added Auth APIs"

git push
```

---

# 7. Vercel Auto Deployment

After pushing:

```text
Vercel automatically redeploys backend
```

---

# 8. Auth API URLs

---

## Register API

```text
POST
https://broomboom-user-backend-mq8g.vercel.app/api/auth/register
```

---

## Login API

```text
POST
https://broomboom-user-backend-mq8g.vercel.app/api/auth/login
```

---

## Logout API

```text
POST
https://broomboom-user-backend-mq8g.vercel.app/api/auth/logout
```

---

## Profile API

```text
GET
https://broomboom-user-backend-mq8g.vercel.app/api/auth/profile
```

---

# 9. Important Note

 These are POST APIs.

Opening directly in browser sends GET request.

So browser may show:

```text
Cannot GET /api/auth/login
```

This is normal.

---

# 10. How To Test APIs

Use:

- Postman
- Thunder Client
- Flutter App
- curl command

---

# 11. Example Register API Test

## Method

```text
POST
```

## URL

```text
https://broomboom-user-backend-mq8g.vercel.app/api/auth/register
```

## Body

```json
{
  "name": "Rhythm",
  "email": "rhythm@gmail.com",
  "password": "123456"
}
```

## Response

```json
{
  "success": true,
  "message": "Register API Working"
}
```

---

# 12. Example Login API Test

## Method

```text
POST
```

## URL

```text
https://broomboom-user-backend-mq8g.vercel.app/api/auth/login
```

## Body

```json
{
  "email": "rhythm@gmail.com",
  "password": "123456"
}
```

## Response

```json
{
  "success": true,
  "message": "Login API Working"
}
```

---

# 13. Example Logout API Test

## Method

```text
POST
```

## URL

```text
https://broomboom-user-backend-mq8g.vercel.app/api/auth/logout
```

## Response

```json
{
  "success": true,
  "message": "Logout API Working"
}
```

---

# 14. Example Profile API Test

## Method

```text
GET
```

## URL

```text
https://broomboom-user-backend-mq8g.vercel.app/api/auth/profile
```

## Response

```json
{
  "success": true,
  "user": {
    "name": "Rhythm",
    "email": "rhythm@gmail.com"
  }
}
```

---

# 15. Example curl Commands

## Register

```bash
curl -X POST https://broomboom-user-backend-mq8g.vercel.app/api/auth/register
```

---

## Login

```bash
curl -X POST https://broomboom-user-backend-mq8g.vercel.app/api/auth/login
```

---

## Logout

```bash
curl -X POST https://broomboom-user-backend-mq8g.vercel.app/api/auth/logout
```

---

## Profile

```bash
curl https://broomboom-user-backend-mq8g.vercel.app/api/auth/profile
```

---

# 16. Common Errors

| Error | Reason | Solution |
|---|---|---|
| 404 NOT FOUND | Route missing | Add API route |
| Cannot GET | Using GET on POST API | Use POST |
| FUNCTION_INVOCATION_FAILED | Backend crash | Check Vercel logs |
| CORS Error | Missing cors() | Add CORS middleware |

---

# 17. View Vercel Logs

Go to:

```text
Vercel Dashboard
→ Deployments
→ Latest Deployment
→ Functions Logs
```

---

# 18. Next Recommended Features

After auth APIs:

```text
JWT Authentication
MongoDB User Storage
Password Hashing
Ride Booking APIs
Driver APIs
Payment APIs
Live Tracking
```

---

# 19. Final Backend Architecture

```text
Flutter App
      ↓
REST API Calls
      ↓
Vercel Backend
      ↓
Express APIs
      ↓
MongoDB Atlas
```

---

# 20. Successful API Response Example

```json
{
  "success": true,
  "message": "API Working Successfully"
}
```
