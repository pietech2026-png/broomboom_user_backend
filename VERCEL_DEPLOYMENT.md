# BroomBoom Cabs Vercel Deployment Documentation

# 1. Overview

This document explains how to deploy the BroomBoom Cabs Node.js backend on Vercel using:

- Node.js
- Express.js
- MongoDB Atlas
- Vercel Hosting

---

# 2. Recommended Project Structure

```text
broomboom_backend/
│
├── api/
│   └── index.js
│
├── node_modules/
├── routes/
├── controllers/
├── models/
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
npm install express mongoose dotenv cors
```

---

# 4. package.json Setup

## `package.json`

```json
{
  "name": "broomboom_backend",
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

# 6. MongoDB Connection Setup

Create:

## `db.js`

```js
const mongoose = require("mongoose");

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully");

    } catch (error) {

        console.log("MongoDB Connection Failed");

        console.log(error);

    }

};

module.exports = connectDB;
```

---

# 7. Express Server Setup

Create:

## `api/index.js`

```js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("../db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.send("BroomBoom Backend Running Successfully");

});

module.exports = app;
```

---

# 8. Vercel Configuration

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

# 9. MongoDB Atlas Setup

---

## Step 1 → Create Cluster

Go to:

```text
MongoDB Atlas
→ Database
→ Create Cluster
```

Select:

```text
M0 Free Tier
```

---

## Step 2 → Create Database User

Go to:

```text
Security
→ Database Access
```

Create User:

| Field | Value |
|---|---|
| Username | txigo |
| Password | txigo123 |
| Role | readWriteAnyDatabase |

---

# 10. Network Access Configuration

IMPORTANT STEP

Go to:

```text
Security
→ Network Access
```

Click:

```text
ADD IP ADDRESS
```

Select:

```text
Allow Access From Anywhere
```

MongoDB adds:

```text
0.0.0.0/0
```

This allows Vercel servers to access MongoDB Atlas.

---

# 11. Push Project To GitHub

Run:

```bash
git init
git add .
git commit -m "Initial Commit"
```

Create GitHub repository and push:

```bash
git remote add origin YOUR_GITHUB_URL
git branch -M main
git push -u origin main
```

---

# 12. Deploy On Vercel

Go to:

```text
https://vercel.com
```

---

## Import Repository

Click:

```text
Add New Project
```

Select your GitHub repository.

---

# 13. Add Environment Variables In Vercel

Go to:

```text
Project
→ Settings
→ Environment Variables
```

Add:

| Key | Value |
|---|---|
| PORT | 5004 |
| MONGO_URI | mongodb uri |
| NODE_ENV | development |

---

# 14. Redeploy Project

After adding environment variables:

```text
Redeploy Project
```

---

# 15. Verify Deployment

Open:

```text
https://your-project-name.vercel.app
```

Expected Output:

```text
BroomBoom Backend Running Successfully
```

---

# 16. Common Vercel Errors

| Error | Cause | Solution |
|---|---|---|
| FUNCTION_INVOCATION_FAILED | Backend crashed | Check logs |
| Cannot GET / | Missing routes | Verify vercel.json |
| MONGO_URI undefined | Missing env vars | Add in Vercel |
| MongoNetworkError | MongoDB blocked | Add Network Access |
| Authentication failed | Wrong credentials | Verify DB user |

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

# 18. Testing API

Example:

```text
https://your-project.vercel.app/
```

---

# 19. Example API Route

```js
app.get("/api/test", (req, res) => {

    res.json({
        success: true,
        message: "API Working Successfully"
    });

});
```

---

# 20. Example JSON Response

```json
{
  "success": true,
  "message": "API Working Successfully"
}
```

---

# 21. Backend Flow Architecture

```text
Flutter App
     ↓
REST API Calls
     ↓
Vercel Hosted Backend
     ↓
Express.js Server
     ↓
MongoDB Atlas
```

---

# 22. Deployment Checklist

✅ MongoDB Cluster Active  
✅ Database User Created  
✅ Network Access Added  
✅ Environment Variables Added  
✅ vercel.json Created  
✅ GitHub Repository Connected  
✅ Deployment Successful  

---

# 23. Search Old Txigo References

Since BroomBoom is cloned from Txigo:

Search project for:

```text
txigo
localhost
127.0.0.1
mongodb://
```

Replace old values if necessary.

---

# 24. Recommended Production Improvements

For production:

- Use strong passwords
- Restrict IP access
- Enable JWT Authentication
- Use HTTPS
- Use separate production DB
- Add API rate limiting
- Add logging system

---

# 25. Example Successful Deployment Logs

```text
MongoDB Connected Successfully
Server Running Successfully
```
