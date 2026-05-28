# BroomBoom Cabs Backend Setup Documentation

# 1. Project Overview

This document explains the complete backend setup for the BroomBoom Cabs application using:

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv

---

# 2. Backend Folder Structure

```text
broomboom_backend/
│
├── node_modules/
├── routes/
├── controllers/
├── models/
├── middleware/
├── config/
│
├── .env
├── package.json
├── server.js
├── db.js
│
└── README.md
```

---

# 3. Install Required Packages

Run the following command:

```bash
npm install express mongoose dotenv cors nodemon
```

---

# 4. Configure package.json

```json
{
  "name": "broomboom_backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "nodemon": "^3.0.0"
  }
}
```

---

# 5. Environment Variables Setup

Create a `.env` file in the backend root folder.

## `.env`

```env
PORT=5004

MONGO_URI=mongodb+srv://txigo:txigo123@clusterpie.q0dn72b.mongodb.net/broomboom_user_db?retryWrites=true&w=majority

NODE_ENV=development
```

---

# 6. MongoDB Database Connection

Create `db.js`

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

        process.exit(1);
    }
};

module.exports = connectDB;
```

---

# 7. Express Server Setup

Create `server.js`

## `server.js`

```js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("BroomBoom Backend Running Successfully");
});

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});
```

---

# 8. MongoDB Atlas Setup

## Step 1 → Login

Open MongoDB Atlas.

---

## Step 2 → Create Cluster

Go to:

```text
Database → Create Cluster
```

Select:

```text
M0 Free Tier
```

---

## Step 3 → Create Database User

Go to:

```text
Security → Database Access
```

Create User:

| Field | Value |
|---|---|
| Username | txigo |
| Password | txigo123 |
| Database Role | readWriteAnyDatabase |

Save user.

---

# 9. Network Access Configuration

## IMPORTANT STEP

Go to:

```text
Security → Network Access
```

Click:

```text
ADD IP ADDRESS
```

Select:

```text
Allow Access From Anywhere
```

MongoDB Atlas adds:

```text
0.0.0.0/0
```

This allows backend connection from your current machine.

---

# 10. MongoDB Connection URI

Current Connection String:

```env
mongodb+srv://txigo:txigo123@clusterpie.q0dn72b.mongodb.net/broomboom_user_db?retryWrites=true&w=majority
```

### Structure Explanation

| Part | Meaning |
|---|---|
| mongodb+srv:// | MongoDB Atlas SRV connection |
| txigo | Database username |
| txigo123 | Database password |
| clusterpie.q0dn72b.mongodb.net | Cluster URL |
| broomboom_user_db | Database name |
| retryWrites=true | Retry failed writes |
| w=majority | Write concern |

---

# 11. Start Backend Server

Run:

```bash
npm start
```

Expected Output:

```text
MongoDB Connected Successfully
Server Running On Port 5004
```

---

# 12. Testing API

Open Browser:

```text
http://localhost:5004
```

Expected Response:

```text
BroomBoom Backend Running Successfully
```

---

# 13. MongoDB Connection Testing File

Create `test.js`

## `test.js`

```js
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB Connected Successfully");

    process.exit();

})
.catch((err) => {

    console.log(err);

    process.exit(1);

});
```

Run:

```bash
node test.js
```

---

# 14. Common MongoDB Errors

| Error | Reason | Solution |
|---|---|---|
| MongoNetworkError | IP blocked | Add Network Access |
| Authentication failed | Wrong credentials | Check username/password |
| ECONNREFUSED | Server stopped | Start backend |
| querySrv ENOTFOUND | DNS issue | Check internet |
| buffering timed out | DB connection failed | Verify URI |

---

# 15. Verify Port Usage

Check running process:

```bash
lsof -i :5004
```

Kill process:

```bash
kill -9 PID
```

---

# 16. Mobile Testing

If testing frontend on mobile/emulator:

DO NOT USE:

```text
localhost:5004
```

Use Mac local IP:

```bash
ipconfig getifaddr en0
```

Example:

```text
http://192.168.1.5:5004
```

---

# 17. Search Old Txigo References

Since BroomBoom is cloned from Txigo project:

Search project for:

```text
txigo
mongodb://
localhost
27017
```

Replace old configurations if needed.

---

# 18. Recommended Backend Commands

## Install Packages

```bash
npm install
```

## Start Server

```bash
npm start
```

## Run Using Nodemon

```bash
nodemon server.js
```

---

# 19. Production Recommendations

For production environment:

- Use strong passwords
- Restrict MongoDB IP access
- Enable JWT Authentication
- Separate dev/prod databases
- Use HTTPS
- Store secrets securely

---

# 20. Final Working Flow

```text
Frontend Request
        ↓
Express Server
        ↓
Routes
        ↓
Controllers
        ↓
MongoDB Atlas
        ↓
Response Sent Back
```

---

# 21. Backend Connection Architecture

```text
Flutter App
     ↓
REST API Calls
     ↓
Node.js + Express Backend
     ↓
Mongoose ODM
     ↓
MongoDB Atlas Cluster
```

---

# 22. Backend Startup Checklist

✅ MongoDB Cluster Active  
✅ Database User Created  
✅ Network Access Added  
✅ .env Configured  
✅ Packages Installed  
✅ Server Running  
✅ MongoDB Connected  

---

# 23. Example Successful Terminal Output

```text
MongoDB Connected Successfully
Server Running On Port 5004
```

---

# 24. Example API Route

```js
app.get("/api/test", (req, res) => {

    res.json({
        success: true,
        message: "API Working Successfully"
    });

});
```

---

# 25. Example Response

```json
{
  "success": true,
  "message": "API Working Successfully"
}
```
