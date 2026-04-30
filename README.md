# ElectroShop - Electronics Shop Management System

A web application to manage electronics products with login system.

---

## What This App Does

- Register and Login with your account
- Add, Edit, Delete products
- Only the person who added a product can edit or delete it
- Stay logged in even after refreshing the page

---

## Technologies Used

- **MongoDB** - Database
- **Express.js** - Backend framework
- **React.js** - Frontend
- **Node.js** - Server
- **JWT** - For login and authentication

---

## Project Folders

```
electronics-shop/
├── backend/         → Server and database code
└── frontend/        → Website code
```

---

## How to Run This Project

### Step 1 - Make sure you have these installed
- Node.js
- MongoDB

### Step 2 - Setup Backend

Open terminal and run:

```bash
cd backend
npm install
```

Create a file called `.env` inside the backend folder and add:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/electronics_shop
JWT_SECRET=mysecretkey123456
JWT_EXPIRES_IN=7d
```

Start the backend:

```bash
npm run dev
```

### Step 3 - Setup Frontend

Open a new terminal and run:

```bash
cd frontend
npm install
npm start
```

### Step 4 - Open the app

Go to your browser and open:
```
http://localhost:3000
```

---

## How to Use

1. Click **Register** and create your account
2. Click **Login** and enter your email and password
3. Click **Add Product** to add a new product
4. You will see **Edit** and **Delete** buttons only on your own products
5. Other users cannot edit or delete your products

---

## API Endpoints

| Method | URL | What it does |
|--------|-----|-------------|
| POST | /api/auth/register | Create new account |
| POST | /api/auth/login | Login to account |
| GET | /api/products | Get all products |
| POST | /api/products | Add new product |
| PUT | /api/products/:id | Update a product |
| DELETE | /api/products/:id | Delete a product |

---

## Product Fields

| Field | Example |
|-------|---------|
| Product Name | Samsung Galaxy S24 |
| Category | Mobile / Laptop / Accessories |
| Price | 79999 |
| Stock | 50 |

---

## Important Notes

- Password is stored in encrypted form in the database (this is normal and safe)
- You must be logged in to add, edit or delete products
- You can only edit or delete products that YOU created
- Login session is saved so you don't need to login again after refresh