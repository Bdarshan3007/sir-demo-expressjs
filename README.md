# Project Overview & Explanation (Roman Hindi)

Yeh ek **Express.js (Node.js)** backend REST API project hai jisme **MongoDB (via Mongoose)** ka use karke **Todo Management System** banaya gaya hai. Project ka structure **MVC (Model - View - Controller)** pattern follow karta hai.

---

## 1. Project me kya ho raha hai? (What is happening?)

Yeh project ek typical backend server hai jo:
1. **Express Server** chalata hai (Port `3000` par).
2. **MongoDB Database** ke saath connect karta hai (`mongodb://localhost:27017/collegeDB`).
3. **Todo Create** karne aur **Todos Fetch (Read)** karne ki API provide karta hai.

---

## 2. File Structure & Explanation (Kaha kya hai?)

- **`bin/www`**:
  - Server start hone ki entry point file.
  - Yaha HTTP server create hota hai, port 3000 assign hota hai aur Mongoose ke through MongoDB connect hota hai.
- **`app.js`**:
  - Express app ka core configuration file.
  - Middlewares setup hain:
    - `express.json()`: JSON format me request body read karne ke liye.
    - `express.urlencoded()`: Form data parse karne ke liye.
    - `morgan`: Request logging ke liye console me.
    - `cookie-parser`: Cookies handle karne ke liye.
    - `views/ejs`: Template engine set hai.
  - Routes register kiye gaye hain: `/` aur `/users`.
- **`models/usermodel.js`**:
  - File ka naam `usermodel.js` hai, lekin isme **Todo Schema** define hai.
  - Fields:
    - `title`: String (Required)
    - `description`: String (Optional, default empty)
    - `completed`: Boolean (Default: `false`)
    - `timestamps: true`: Automatic `createdAt` aur `updatedAt` add karta hai.
- **`controllers/usercontroller.js`**:
  - Business logic yaha likhi gayi hai:
    - `createTodo`: `req.body` se `title` aur `description` lekar database me new Todo save karta hai (`Todo.create()`).
    - `getTodo`: Database se saare todos fetch karta hai (`Todo.find()`).
- **`routes/index.js`**:
  - Endpoints define kiye gaye hain:
    - `POST /todo` -> `usercon.createTodo`
    - `GET /todo` -> `usercon.getTodo`
- **`routes/users.js`**:
  - Default Express boilerplate route jo dummy response deta hai (`/users`).

---

## 3. Request Flow (Kaise kaam karta hai?)

Jab koi client (Postman, Browser ya Frontend) request bhejta hai:

```
Client Request (e.g. POST /todo)
          ↓
     app.js (Middlewares check hote hain, JSON parse hota hai)
          ↓
  routes/index.js (Route match hota hai: '/todo')
          ↓
controllers/usercontroller.js (createTodo function execute hota hai)
          ↓
  models/usermodel.js (Mongoose Schema ke through MongoDB me data save hota hai)
          ↓
Client Response (JSON: { success: true, message: "...", data: {...} })
```

---

## 4. Available API Endpoints (Kaise test karein?)

Base URL: `http://localhost:3000`

### A. Todo Create Karna (POST)
- **URL**: `http://localhost:3000/todo`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body (JSON)**:
  ```json
  {
    "title": "Study Express",
    "description": "Complete assignment today"
  }
  ```
- **Response**: Status `201 Created`

### B. Saare Todos Fetch Karna (GET)
- **URL**: `http://localhost:3000/todo`
- **Method**: `GET`
- **Response**: Status `200 OK` (Saare todos ka array)

---

## 5. Abhi kya karna hai? (Next Steps & Fixes)

1. **Typo Fix (`bin/www`)**:
   - `bin/www` line 22 par extra backticks (`` `` ``) hain. Unhe remove karna zaroori hai warna syntax error aa sakta hai.
2. **MongoDB Start Karein**:
   - Make sure local MongoDB server (Compass / MongoDB service) running ho `mongodb://localhost:27017` par.
3. **Files Naming Organize Karein (Optional but Recommended)**:
   - File ka naam `models/usermodel.js` hai jabki model `Todo` ka hai. Ise `models/todomodel.js` aur `controllers/todocontroller.js` rename karna best practice hai.
4. **Baaki CRUD Operations Add Karein**:
   - **Update Todo**: `PUT /todo/:id` ya `PATCH /todo/:id`
   - **Delete Todo**: `DELETE /todo/:id`
   - **Get Single Todo**: `GET /todo/:id`
5. **Project Run Karne Ka Command**:
   ```bash
   npm install
   npm start
   ```
