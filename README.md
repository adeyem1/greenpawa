# GreenPaWa — Solar Energy Platform

Full-stack solar energy e-commerce platform built with React, Node.js, Express, and MongoDB.

---

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 18 + Vite, Tailwind CSS, Framer Motion |
| Backend  | Node.js, Express.js                     |
| Database | MongoDB + Mongoose                      |
| Auth     | JWT + bcryptjs                          |

---

## Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm v9+

---

## Setup

### 1. Clone & Install

```bash
git clone <repo-url>
cd greenpawa

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/greenpawa
JWT_SECRET=your_super_secret_key_change_this
FRONTEND_URL=http://localhost:5173
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This creates:
- 9 sample products (3 inverters, 3 batteries, 3 solar panels)
- 1 admin user → `admin@greenpawa.com` / `admin123`

### 4. Run Development Servers

**Backend** (port 5000):
```bash
cd backend
npm run dev
```

**Frontend** (port 5173):
```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Admin Access

| Field    | Value                  |
|----------|------------------------|
| URL      | `/admin`               |
| Email    | `admin@greenpawa.com`  |
| Password | `admin123`             |

> Change the password immediately in production.

---

## Pages

| Route         | Description                         |
|---------------|-------------------------------------|
| `/`           | Landing page with hero & features   |
| `/products`   | Product catalog with filters & cart |
| `/services`   | Services, pricing & installation    |
| `/calculator` | Solar savings calculator            |
| `/about`      | Team & company story                |
| `/contact`    | Contact form & WhatsApp             |
| `/login`      | Sign in / Register                  |
| `/admin`      | Admin dashboard (admin role only)   |

---

## Project Structure

```
greenpawa/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT protect + admin guard
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js          # /api/auth/*
│   │   ├── products.js      # /api/products/*
│   │   ├── orders.js        # /api/orders/*
│   │   └── contact.js       # /api/contact
│   ├── seed.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ProductCard.jsx
    │   │   └── Cart.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── Services.jsx
    │   │   ├── Calculator.jsx
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Login.jsx
    │   │   └── Admin.jsx
    │   ├── App.jsx
    │   └── index.css
    ├── tailwind.config.js
    └── vite.config.js
```

---

## API Endpoints

### Auth
| Method | Endpoint             | Access  |
|--------|----------------------|---------|
| POST   | `/api/auth/register` | Public  |
| POST   | `/api/auth/login`    | Public  |
| GET    | `/api/auth/profile`  | Private |

### Products
| Method | Endpoint              | Access  |
|--------|-----------------------|---------|
| GET    | `/api/products`       | Public  |
| GET    | `/api/products/:id`   | Public  |
| POST   | `/api/products`       | Admin   |
| PUT    | `/api/products/:id`   | Admin   |
| DELETE | `/api/products/:id`   | Admin   |

### Orders
| Method | Endpoint           | Access  |
|--------|--------------------|---------|
| POST   | `/api/orders`      | Public  |
| GET    | `/api/orders`      | Admin   |
| PUT    | `/api/orders/:id`  | Admin   |

### Contact
| Method | Endpoint          | Access |
|--------|-------------------|--------|
| POST   | `/api/contact`    | Public |

---

## Brand Colors

| Token           | Hex       | Usage               |
|-----------------|-----------|---------------------|
| `green-dark`    | `#0B3D2E` | Primary background  |
| `green-mid`     | `#1A5C3A` | Hover states        |
| `green-light`   | `#6FAF73` | Accents, icons      |
| `yellow-accent` | `#F4B942` | CTAs, highlights    |
| `yellow-dark`   | `#D4942A` | CTA hover           |

---

## Production Build

```bash
# Frontend
cd frontend && npm run build
# Output → frontend/dist/

# Serve backend
cd backend && npm start
```

Serve `frontend/dist` as static files from Express or deploy to a CDN (Vercel, Netlify). Point `FRONTEND_URL` and CORS origin to your production domain.
