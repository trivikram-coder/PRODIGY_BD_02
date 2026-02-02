User CRUD API (MongoDB-Based)
📌 Overview

This project is a RESTful API that performs basic CRUD (Create, Read, Update, Delete) operations on a User resource using MongoDB for persistent storage.

The API follows REST standards, supports partial updates, validates inputs, and handles errors with proper HTTP status codes.

✨ Features

Create a user

Get all users

Get a user by ID

Update user details (partial updates supported)

Delete a user

Email format validation

Email uniqueness check

Proper HTTP status codes and error handling

🧱 User Model

Each user contains:

uId (UUID – public identifier)

name (string)

email (string, unique)

age (number)

🛠 Tech Stack

Node.js

Express.js

MongoDB

Mongoose

UUID / Crypto

Swagger (API Documentation)

🚀 Running the Application

Install dependencies

Configure MongoDB connection

Start the server

Open Swagger UI to test APIs

⚠️ Note: Data is stored in MongoDB and persists even after server restarts.

📚 API Endpoints
Method	Endpoint	Description
POST	/users	Create a new user
GET	/users	Get all users
GET	/users/{id}	Get user by ID
PATCH	/users/{id}	Update user details
DELETE	/users/{id}	Delete user
📥 GET /users – Get All Users
Description

Returns a list of all users stored in the database.

Responses

200 OK → List of users

404 Not Found → No users found

Example Response
[
  {
    "uId": "uuid-1",
    "name": "John",
    "email": "john@gmail.com",
    "age": 25
  },
  {
    "uId": "uuid-2",
    "name": "Alice",
    "email": "alice@gmail.com",
    "age": 22
  }
]

🧪 Validation & Error Handling

Invalid email format → 400 Bad Request

Missing required fields → 400 Bad Request

Duplicate email → 409 Conflict

User not found → 404 Not Found

Successful delete → 200 OK

📝 Notes

Uses MongoDB for persistent storage

No in-memory data structures

Focused only on User CRUD operations

No authentication or authorization

Designed for interview preparation and learning

📄 License

Educational use only.

🔹 GET /users – Minimal Method (for understanding)
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});
