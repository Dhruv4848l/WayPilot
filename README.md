# Traveloop 🌍

> Personalized Travel Planning Made Easy

**🌐 Live Project Link:** [https://odoo-x-pu-hackathon-3zdpk1ssm-dhruv-majis-projects-9df80bb8.vercel.app/](https://odoo-x-pu-hackathon-3zdpk1ssm-dhruv-majis-projects-9df80bb8.vercel.app/)

Traveloop is a comprehensive, full-stack travel planning platform that helps users organize their trips, track budgets, manage checklists, and connect with a community of fellow explorers.

## 🛠 Tech Stack

**Frontend:**
- **React 19** - UI Library
- **Vite** - Build tool and development server
- **Tailwind CSS v4** - CSS framework (configured using the modern `@theme` CSS-first approach)
- **Zustand** - Lightweight state management (used for Authentication and User State)
- **Framer Motion** - UI animations
- **React Router DOM** - Client-side routing

**Backend:**
- **Node.js & Express.js** - RESTful API server
- **MySQL** - Relational Database
- **Sequelize** - Modern TypeScript/Node.js ORM for SQL
- **JWT (JSON Web Tokens)** - Secure authentication
- **Bcrypt.js** - Password hashing
- **Cloudinary & Multer** - Image upload and storage management

---

## 📁 Project Structure

The repository is organized into two main workspaces:

### `/frontend`
The React application.
- `src/components/` - Reusable UI components (Navbar, Footer, etc.)
- `src/screens/` - The 14 main application views (Login, Dashboard, UserProfile, CreateTrip, etc.)
- `src/store/` - Zustand global state stores (`authStore.js`)
- `src/utils/` - Helper functions (`api.js` for centralized fetch logic)
- `src/index.css` - Global CSS and Tailwind v4 theme configuration

### `/backend`
The Node/Express API server.
- `config/` - Database (`db.js`) and third-party service configurations (`cloudinary.js`)
- `controllers/` - Core business logic for endpoints (e.g., `authController.js`, `tripController.js`)
- `middleware/` - Custom Express middleware (`authMiddleware.js`, `uploadMiddleware.js`)
- `models/` - Sequelize SQL Table definitions (User, Trip, Stop, Expense, etc.)
- `routes/` - Express route definitions mapping URLs to Controllers
- `server.js` - The main entry point that initializes Express and syncs the MySQL database

---

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites
- Node.js (v18 or higher recommended)
- MySQL Server (v8.0+)
- Cloudinary Account (for image uploads)

### 1. Database Setup
1. Open MySQL Workbench or your terminal.
2. Create the database:
   ```sql
   CREATE DATABASE traveloop;
   ```
*(Note: You do not need to create tables manually. Sequelize will automatically create all 13+ relational tables when the backend server starts).*

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `/backend` directory with the following variables:
   ```env
   PORT=5000
   
   # MySQL Configuration
   DB_NAME=traveloop
   DB_USER=root
   DB_PASS=your_mysql_password
   DB_HOST=localhost
   DB_PORT=3306
   
   # Authentication
   JWT_SECRET=your_super_secret_jwt_key
   
   # Cloudinary (Image Uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the backend server:
   ```bash
   node server.js
   # Or use nodemon for auto-reloading: npm run dev (if installed)
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

---

## 🌊 Application Flow

1. **Authentication:** Users must register or log in. The frontend sends credentials to the backend, which verifies them against MySQL and returns a JWT. The frontend stores this JWT in `localStorage` and Zustand state.
2. **Dynamic UI:** Upon login, the user is redirected to the Dashboard (`MainLanding`). The frontend automatically includes the JWT in the `Authorization: Bearer <token>` header for all subsequent API requests using the `api.js` utility.
3. **Profile Management:** Users can edit their profile and upload a custom avatar. The image is sent via `multipart/form-data` to the backend, handled by Multer, uploaded to Cloudinary, and the secure URL is saved in MySQL.
4. **Trip Planning:** Users can create trips. This creates a `Trip` record in MySQL linked to the `User` via a Foreign Key. Users can then view these trips on their Dashboard and Profile.

---

## 🤝 Contributing

If you are a collaborator adding new features to Traveloop, please follow this workflow:

1. **Database Changes:** If you need to add a new table or column, update or create the appropriate file in `backend/models/`. Then, update `backend/models/index.js` to define any necessary relational associations (e.g., `hasMany`, `belongsTo`). Restart the backend server, and Sequelize will automatically `sync({ alter: true })` the database.
2. **API Logic:** Add your routes in `backend/routes/` and your logic in `backend/controllers/`. Always use the `protect` middleware for routes that require a logged-in user.
3. **Frontend API Calls:** Do not use raw `fetch()` in React components. Instead, use the centralized `api.get()`, `api.post()`, or `api.putFormData()` methods in `frontend/src/utils/api.js` so that Authentication headers are automatically applied.
4. **Styling:** We use Tailwind CSS v4. Stick to the design tokens defined in `frontend/src/index.css` (e.g., `text-brand-primary`, `bg-bg-surface`, `card`, `btn-primary`) to maintain visual consistency across all 14 screens.

Happy Coding! ✈️
