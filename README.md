# PERN Shop Sphere

PERN Shop Sphere is a full-stack e-commerce web application built with PostgreSQL, Express, React, and Node.js. It features a dynamic product catalog, shopping cart, category management, and a responsive UI.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Database Setup](#database-setup)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Notes](#notes)

## Features

- Product catalog with images
- Shopping cart (add, update, remove, clear)
- Category management
- RESTful API
- Responsive React frontend
- Automated backend and frontend tests

## Tech Stack

- **Backend:** Node.js, Express, PostgreSQL
- **Frontend:** React (Vite), Tailwind CSS
- **Testing:** Jest, Supertest (backend); Vitest, React Testing Library (frontend)

## Setup & Installation

### Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
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

## API Endpoints

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item
- `DELETE /api/cart` - Clear cart
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## Notes

- Product images use Unsplash URLs stored in the database.
- The cart icon is sourced from [heroicons.com](https://heroicons.com/).
- For any issues or contributions, please open an issue or submit a pull request.
