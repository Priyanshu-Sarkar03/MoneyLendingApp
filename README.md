# MoneyLendingApp

This is a backend implementation for a money lending application, similar to apps like Slice and KreditBee. It provides APIs for user signup, login, fetching user data, and borrowing money.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [API Documentation](#api-documentation)
    - [User Signup](#user-signup)
    - [User Login](#user-login)
    - [Get User Data](#get-user-data)
    - [Borrow Money](#borrow-money)
5. [API Response Screenshots](#api-response-screenshots)

## Features

- User registration with age and salary validation
- User authentication using JWT
- Fetch user data including purchase power
- Borrow money with interest calculation

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- bcryptjs for password hashing
- JSON Web Tokens (JWT) for authentication

## Setup and Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Priyanshu-Sarkar03/MoneyLendingApp.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd money-lending-backend
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Set up MongoDB:**
    - Ensure MongoDB is installed and running on your system
    - The application will connect to `mongodb://localhost:27017/MoneyLendingApp`

5. **Start the server:**
    ```bash
    npm start
    ```
    The server should now be running on `http://localhost:5000`.

## API Documentation

Here I'm providing some examples and the API documentation.

### User Signup

- **URL:** `POST /api/signup`
- **Description:** Register a new user
- **Request Body:**
    ```json
    {
      "phoneNumber": "0987678905",
      "email": "user@gmail.com",
      "name": "Priyanshu Sarkar",
      "dob": "2000-01-01",
      "monthlySalary": 80000,
      "password": "password123"
    }
    ```

- **Success Response: HTTP 201 (Created)**
    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **Error Response: HTTP 400 (Bad Request)**
    ```json
    {
      "message": "User does not meet age or salary requirements"
    }
    ```

### User Login

- **URL:** `POST /api/login`
- **Description:** Authenticate a user and receive a JWT
- **Request Body:**
    ```json
    {
      "email": "user@gmail.com",
      "password": "password123"
    }
    ```

- **Success Response: HTTP 200 (OK)**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- **Error Response: HTTP 400 (Bad Request)**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

### Get User Data

- **URL:** `GET /api/user`
- **Description:** Fetch authenticated user's data
- **Headers:** `Authorization: Bearer <JWT Token>`

- **Success Response: HTTP 200 (OK)**
    ```json
    {
      "phoneNumber": "0987678905",
      "email": "user@gmail.com",
      "name": "Priyanshu Sarkar",
      "dateOfRegistration": "2024-07-20T10:30:00.000Z",
      "dob": "2000-01-01T00:00:00.000Z",
      "monthlySalary": 80000,
      "status": "Approved",
      "purchasePower": 0
    }
    ```

- **Error Response: HTTP 404 (Not Found)**
    ```json
    {
      "message": "User not found"
    }
    ```

### Borrow Money

- **URL:** `POST /api/borrow`
- **Description:** Borrow money and calculate repayments
- **Headers:** `Authorization: Bearer <JWT Token>`
- **Request Body:**
    ```json
    {
      "amount": 20000,
      "tenure": 12
    }
    ```

- **Success Response: HTTP 200 (OK)**
    ```json
    {
      "purchasePower": 20000,
      "monthlyRepayment": 1800.00
    }
    ```

- **Error Response: HTTP 404 (Not Found)**
    ```json
    {
      "message": "User not found"
    }
    ```

## API Response Screenshots

I used the Postman extension in VSCode to test the APIs. Here are the screenshots:

### Signup API Response
![Signup API Response](screenshots/Signup_Sucess.png)

### Signup (Failure) API Response
![Signup (Failure) API Response](screenshots/Signup_Failure.png)

### Login API Response
![Login API Response](screenshots/Login.png)

### Login (Failure) API Response
![Login (Failure) API Response](screenshots/Login_Error.png)

### Get User Data API Response
![Get User Data API Response](screenshots/User.png)

### Borrow Money API Response
![Borrow Money API Response](screenshots/Borrow.png)
