# PERN Shop Sphere

PERN Shop Sphere is a full-stack e-commerce web application built with PostgreSQL, Express, React, and Node.js. It features a dynamic product catalog, shopping cart, category management, and a responsive UI.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Authentication](#authentication)
- [Cart & Session Management](#cart--session-management)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Notes](#notes)

## Features

- Product catalog with images
- Shopping cart (add, update, remove, clear)
- User authentication (register, login, logout) with JWT
- Category management
- RESTful API
- Responsive React frontend
- Automated backend and frontend tests

## Tech Stack

- **Backend:** Node.js, Express, PostgreSQL
- **Frontend:** React (Vite), Tailwind CSS, Headless UI (for dropdowns)
- **State Management:** React Context API (Auth, Cart)
- **Testing:** Jest, Supertest (backend); Vitest, React Testing Library (frontend)

## Setup & Installation

### Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/asaadb/PERN-Shop-Sphere.git
   cd PERN-shop-sphere
   ```
2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

## Database Setup

1. Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/).
2. Create a new database (e.g., `pern_shop_sphere`).
3. Run the schema script to create tables:
   ```bash
   psql -U your_username -d pern_shop_sphere -f database/schema.sql
   ```
4. Run the seed script to insert initial data:
   ```bash
   psql -U your_username -d pern_shop_sphere -f database/seed.sql
   ```
5. In the `server` folder, create a `.env` file:
   ```
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/pern_shop_sphere
   ```
   Replace `your_username` and `your_password` with your PostgreSQL credentials.

## Environment Variables

**Backend (.env in /server):**

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`

**Frontend:**

- No required .env by default, but you may set Vite environment variables as needed.

## Running the App

Start the backend:

```bash
cd server
npm start
```

Start the frontend:

```bash
cd client
npm run dev
```

## Authentication

User authentication is handled via JWT tokens stored in httpOnly cookies. The frontend uses an `AuthContext` to manage login state and user info.

**Endpoints:**

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT cookie
- `POST /api/auth/logout` — Logout (clears cookie)

**Frontend:**

- `AuthContext` provides `user`, `setUser`, and `isLoggedIn` to all components
- Registration and login pages update context on success

## Cart & Session Management

- Each user (or guest) is assigned a `sessionId` stored in `localStorage` as `cart_session_id`.
- Cart state is managed globally via `CartContext` and a reducer.
- Cart actions (add, update, remove, clear) sync with the backend and update local state.

## Environment Variables

**Backend (.env in /server):**

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`

## Setup & Installation

### Prerequisites

- Node.js
- PostgreSQL

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/asaadb/PERN-Shop-Sphere.git
   cd PERN-shop-sphere
   ```
2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

## Database Setup

1. Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/).
2. Create a new database (e.g., `pern_shop_sphere`).
3. Run the schema script to create tables:
   ```bash
   psql -U your_username -d pern_shop_sphere -f database/schema.sql
   ```
4. Run the seed script to insert initial data:
   ```bash
   psql -U your_username -d pern_shop_sphere -f database/seed.sql
   ```
5. In the `server` folder, create a `.env` file:
   ```
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/pern_shop_sphere
   ```
   Replace `your_username` and `your_password` with your PostgreSQL credentials.

## Running the App

Start the backend:

```bash
cd server
npm start
```

Start the frontend:

```bash
cd client
npm run dev
```

## API Endpoints

### Auth

- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login
- `POST /api/auth/logout` — Logout

### Products

- `GET /api/products` — List all products
- `GET /api/products/:id` — Get product by ID
- `POST /api/products` — Create product
- `PUT /api/products/:id` — Update product
- `DELETE /api/products/:id` — Delete product

### Cart

- `GET /api/cart` — Get cart
- `POST /api/cart` — Add to cart
- `PUT /api/cart/:id` — Update cart item
- `DELETE /api/cart/:id` — Remove cart item
- `DELETE /api/cart` — Clear cart
- `POST /api/cart/merge` — Merge guest cart into user cart (requires auth)

### Categories

- `GET /api/categories` — List all categories
- `GET /api/categories/:id` — Get category by ID
- `POST /api/categories` — Create category
- `PUT /api/categories/:id` — Update category
- `DELETE /api/categories/:id` — Delete category

## Testing

Run backend tests:

```bash
cd server
npm test
```

Run frontend tests:

```bash
cd client
npm run test:ui
```

## Notes

- Product images use Unsplash URLs stored in the database.
- The cart icon is sourced from [heroicons.com](https://heroicons.com/).
