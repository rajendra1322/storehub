# Storehub

**Storehub** is a role-based Store Rating & Management System built using **React, Node.js, Express.js, and MySQL**. It allows users to rate stores, store owners to monitor reviews, and administrators to manage users, stores, change password option and platform analytics through responsive dashboards.

## Features

* Role-based authentication (Admin, Store Owner & User)
* Secure login using JWT and BCrypt
* User signup and profile management
* Store rating system (1–5 stars)
* Admin dashboard with analytics and charts
* Store owner dashboard with reviews & average ratings
* Responsive design for desktop and mobile

## Tech Stack

| Layer          | Technology                  |
| -------------- | --------------------------- |
| Frontend       | React + Vite + Tailwind CSS |
| Backend        | Node.js + Express.js        |
| Database       | MySQL                       |
| Authentication | JWT + BCrypt                |
| Charts         | Recharts                    |
| API Testing    | Postman                     |

## Project Structure

```text
storehub/
├── store-backend/
├── store-frontend/
└── README.md
```

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/rajendra1322/storehub.git
cd storehub
```

### 2. Backend Setup

```bash
cd store-backend
npm install
```

Create a **.env** file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=storesphere
JWT_SECRET=storesphere_secret
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd store-frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Backend URL:

```text
http://localhost:5000
```

## Default Admin Login

| Email                                                     | Password     |
| --------------------------------------------------------- | ------------ |
| **[admin@storehub.com](mailto:admin@storehub.com)** | **admin123** |

> The default admin account is created automatically when the backend starts if it does not already exist.

## User Roles

* **Admin** – Manage users, stores, dashboards & analytics ,update password 
* **Store Owner** – View owned stores and customer reviews ,update password
* **User** – View stores and submit ratings ,update password

## API Modules

* Authentication
* Users
* Stores
* Ratings
* Owner Dashboard
* Admin Dashboard

## Author

**Rajendra Acharya**
