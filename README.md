# Cofy - MERN Stack E-commerce Website

A complete, clean, and simple MERN (MongoDB, Express.js, React.js, Node.js) stack e-commerce website built with beginner-friendly code.

## Project Structure

```
cofy/
├── backend/                 # Node.js + Express backend
│   ├── models/             # MongoDB models (User, Product, Category, Cart)
│   ├── routes/             # API route definitions
│   ├── controllers/        # Business logic for each feature
│   ├── middleware/         # Authentication middleware
│   ├── server.js           # Express server entry point
│   └── package.json        # Backend dependencies
│
├── src/                    # React frontend
│   ├── components/         # Reusable React components
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── AdminDashboard.jsx
│   ├── context/            # React Context for state management
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── services/           # API service functions
│   │   └── api.js
│   ├── App.jsx             # Main React component
│   └── main.jsx            # React entry point
│
├── package.json            # Frontend dependencies
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## Features

### Frontend
- ✅ Responsive landing page with Hero, Categories, Products, About, Testimonials, and Footer sections
- ✅ Product listing with category filtering
- ✅ Product detail pages with add to cart functionality
- ✅ Shopping cart with quantity management
- ✅ User authentication (Register/Login)
- ✅ Admin dashboard for managing products and categories
- ✅ Clean, modern UI with Tailwind CSS

### Backend
- ✅ RESTful API with Express.js
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ MongoDB database with Mongoose
- ✅ Product and Category CRUD operations
- ✅ Cart management (localStorage + database sync)
- ✅ Admin-only routes protection

## How Data Flows

### Authentication Flow
1. **Register/Login**: User submits credentials → Backend validates → Creates/verifies user → Returns JWT token
2. **Token Storage**: Token saved in localStorage → Automatically included in API requests via axios interceptor
3. **Protected Routes**: Middleware checks token → Verifies with JWT → Attaches user to request

### Cart Flow
1. **Add to Cart**: Product added → Saved to localStorage immediately → If logged in, syncs to database
2. **Cart Sync**: On login, local cart merges with database cart
3. **Quantity Updates**: Changes saved locally first → Then synced to database if authenticated

### API Flow
1. **Request**: Frontend calls API service function → Axios adds auth token → Sends to backend
2. **Backend**: Route receives request → Middleware checks auth (if needed) → Controller processes → Returns response
3. **Response**: Frontend receives data → Updates React state → UI re-renders

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cofy
   JWT_SECRET=your_secret_key_here_change_in_production
   ```

4. **Start MongoDB:**
   - If using local MongoDB, make sure it's running
   - Or use MongoDB Atlas connection string in `MONGODB_URI`

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to root directory:**
   ```bash
   cd ..
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:3000`

## Creating an Admin User

To create an admin user, you have two options:

### Option 1: Using MongoDB Shell
```javascript
// Connect to MongoDB
use cofy

// Create admin user (password will be hashed automatically)
db.users.insertOne({
  name: "Admin",
  email: "admin@cofy.com",
  password: "$2a$10$YourHashedPasswordHere", // Use bcrypt to hash password
  isAdmin: true
})
```

### Option 2: Register normally, then update in MongoDB
1. Register a new user through the website
2. Connect to MongoDB and update the user:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { isAdmin: true } }
)
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products (optional: `?category=categoryId`)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/item/:itemId` - Update cart item quantity (protected)
- `DELETE /api/cart/item/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart/clear` - Clear cart (protected)

## Code Quality Principles

This project follows these principles for clean, beginner-friendly code:

1. **Simple Logic**: No complex patterns or over-engineering
2. **Clear Names**: Meaningful variable and function names
3. **Comments**: Explanatory comments for authentication, cart logic, and API flow
4. **No Unused Code**: Every file and function has a purpose
5. **Straightforward Structure**: Easy to understand file organization

## Technologies Used

- **Frontend**: React 18, React Router, Tailwind CSS, Axios, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **Development**: Vite (frontend), Nodemon (backend)

## Notes

- Cart data is stored in both localStorage (for immediate access) and database (for logged-in users)
- JWT tokens expire after 7 days
- Passwords are hashed using bcrypt with 10 salt rounds
- All admin routes require both authentication and admin status

## License

This project is open source and available for educational purposes.

