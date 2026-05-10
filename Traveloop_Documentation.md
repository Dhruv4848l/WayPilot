# 🌍 Traveloop — Complete Project Documentation
> Personalized Travel Planning Made Easy | Odoo Hackathon (8-Hour Sprint)

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Database Schema](#4-database-schema)
5. [API Endpoints](#5-api-endpoints)
6. [UI/UX Design System](#6-uiux-design-system)
7. [Screen-by-Screen Breakdown](#7-screen-by-screen-breakdown)
8. [Animation & Motion Guidelines](#8-animation--motion-guidelines)
9. [State Management](#9-state-management)
10. [Deployment Guide](#10-deployment-guide)
11. [8-Hour Sprint Plan](#11-8-hour-sprint-plan)
12. [Stitch UI Prompt](#12-stitch-ui-prompt)

---

## 1. Project Overview

**Traveloop** is a full-stack, multi-city travel planning platform built for the Odoo Hackathon. It enables users to dream, design, and organize personalized trips end-to-end — with itinerary building, budget tracking, packing checklists, community sharing, and invoice generation.

### Core User Goals
- Create multi-city trips with day-wise itineraries
- Discover cities and activities through search
- Track trip budgets and generate expense invoices
- Share itineraries publicly or within a community
- Manage packing checklists and trip notes/journals

### Screens (from Excalidraw Architecture)
| # | Screen Name |
|---|-------------|
| 1 | Login Screen |
| 2 | Registration Screen |
| 3 | Main Landing / Dashboard |
| 4 | Create New Trip |
| 5 | Itinerary Builder |
| 6 | User Trip Listing |
| 7 | User Profile |
| 8 | Activity / City Search |
| 9 | Itinerary View + Budget |
| 10 | Community Tab |
| 11 | Packing Checklist |
| 12 | Admin Panel |
| 13 | Trip Notes / Journal |
| 14 | Expense Invoice / Billing |

---

## 2. Tech Stack

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | TailwindCSS v3 |
| Animations | Framer Motion v11 |
| Routing | React Router v6 |
| State | Zustand |
| Data Fetching | TanStack Query (React Query) |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Icons | Lucide React |
| Date Handling | date-fns |
| Drag & Drop | @dnd-kit/core |

### Backend
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20 |
| Framework | Express.js |
| ORM | Prisma |
| Database | PostgreSQL 15 |
| Auth | JWT + bcryptjs |
| File Uploads | Multer + Cloudinary |
| Validation | Zod |
| API Docs | Swagger / OpenAPI |

### DevOps / Infra
| Purpose | Tool |
|---------|------|
| Frontend Deploy | Vercel |
| Backend Deploy | Railway / Render |
| DB Hosting | Supabase (PostgreSQL) |
| File Storage | Cloudinary |
| Environment | dotenv |

---

## 3. Project Structure

```
traveloop/
├── client/                          # React Frontend
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── api/                     # Axios API layer
│   │   │   ├── auth.api.js
│   │   │   ├── trips.api.js
│   │   │   ├── itinerary.api.js
│   │   │   ├── cities.api.js
│   │   │   ├── activities.api.js
│   │   │   ├── budget.api.js
│   │   │   └── community.api.js
│   │   ├── components/              # Reusable UI components
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Avatar.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── Toast.jsx
│   │   │   ├── trip/
│   │   │   │   ├── TripCard.jsx
│   │   │   │   ├── TripTimeline.jsx
│   │   │   │   ├── StopCard.jsx
│   │   │   │   ├── ActivityCard.jsx
│   │   │   │   └── BudgetMeter.jsx
│   │   │   ├── itinerary/
│   │   │   │   ├── DayBlock.jsx
│   │   │   │   ├── CityHeader.jsx
│   │   │   │   └── ActivityBlock.jsx
│   │   │   ├── budget/
│   │   │   │   ├── CostBreakdownChart.jsx
│   │   │   │   ├── BudgetAlert.jsx
│   │   │   │   └── InvoiceTable.jsx
│   │   │   └── community/
│   │   │       ├── PostCard.jsx
│   │   │       └── ShareButton.jsx
│   │   ├── pages/                   # Route-level pages
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── dashboard/
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── trips/
│   │   │   │   ├── CreateTrip.jsx
│   │   │   │   ├── TripList.jsx
│   │   │   │   ├── TripDetail.jsx
│   │   │   │   └── ItineraryBuilder.jsx
│   │   │   ├── itinerary/
│   │   │   │   └── ItineraryView.jsx
│   │   │   ├── search/
│   │   │   │   ├── CitySearch.jsx
│   │   │   │   └── ActivitySearch.jsx
│   │   │   ├── budget/
│   │   │   │   └── BudgetView.jsx
│   │   │   ├── packing/
│   │   │   │   └── PackingChecklist.jsx
│   │   │   ├── notes/
│   │   │   │   └── TripNotes.jsx
│   │   │   ├── community/
│   │   │   │   └── Community.jsx
│   │   │   ├── profile/
│   │   │   │   └── UserProfile.jsx
│   │   │   ├── public/
│   │   │   │   └── SharedItinerary.jsx
│   │   │   └── admin/
│   │   │       └── AdminDashboard.jsx
│   │   ├── store/                   # Zustand stores
│   │   │   ├── authStore.js
│   │   │   ├── tripStore.js
│   │   │   └── uiStore.js
│   │   ├── hooks/                   # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useTrips.js
│   │   │   ├── useItinerary.js
│   │   │   └── useBudget.js
│   │   ├── utils/
│   │   │   ├── dateUtils.js
│   │   │   ├── budgetUtils.js
│   │   │   └── formatters.js
│   │   ├── constants/
│   │   │   ├── routes.js
│   │   │   └── categories.js
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── animations.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Express Backend
│   ├── prisma/
│   │   ├── schema.prisma            # DB schema
│   │   └── seed.js                  # Seed data
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   ├── cloudinary.js
│   │   │   └── swagger.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── admin.middleware.js
│   │   │   ├── validate.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.routes.js
│   │   │   │   └── auth.service.js
│   │   │   ├── users/
│   │   │   │   ├── users.controller.js
│   │   │   │   ├── users.routes.js
│   │   │   │   └── users.service.js
│   │   │   ├── trips/
│   │   │   │   ├── trips.controller.js
│   │   │   │   ├── trips.routes.js
│   │   │   │   └── trips.service.js
│   │   │   ├── stops/
│   │   │   │   ├── stops.controller.js
│   │   │   │   ├── stops.routes.js
│   │   │   │   └── stops.service.js
│   │   │   ├── activities/
│   │   │   │   ├── activities.controller.js
│   │   │   │   ├── activities.routes.js
│   │   │   │   └── activities.service.js
│   │   │   ├── cities/
│   │   │   │   ├── cities.controller.js
│   │   │   │   ├── cities.routes.js
│   │   │   │   └── cities.service.js
│   │   │   ├── budget/
│   │   │   │   ├── budget.controller.js
│   │   │   │   ├── budget.routes.js
│   │   │   │   └── budget.service.js
│   │   │   ├── checklist/
│   │   │   │   ├── checklist.controller.js
│   │   │   │   ├── checklist.routes.js
│   │   │   │   └── checklist.service.js
│   │   │   ├── notes/
│   │   │   │   ├── notes.controller.js
│   │   │   │   ├── notes.routes.js
│   │   │   │   └── notes.service.js
│   │   │   ├── community/
│   │   │   │   ├── community.controller.js
│   │   │   │   ├── community.routes.js
│   │   │   │   └── community.service.js
│   │   │   └── admin/
│   │   │       ├── admin.controller.js
│   │   │       ├── admin.routes.js
│   │   │       └── admin.service.js
│   │   ├── utils/
│   │   │   ├── jwt.js
│   │   │   ├── apiResponse.js
│   │   │   └── invoiceGenerator.js
│   │   └── app.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 4. Database Schema

### Prisma Schema

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── USERS ───────────────────────────────────────────────
model User {
  id            String    @id @default(uuid())
  firstName     String
  lastName      String
  email         String    @unique
  phone         String?
  password      String
  photo         String?
  city          String?
  country       String?
  language      String    @default("en")
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  trips         Trip[]
  notes         Note[]
  checklists    PackingChecklist[]
  posts         CommunityPost[]
  savedCities   SavedCity[]
}

enum Role {
  USER
  ADMIN
}

// ─── TRIPS ───────────────────────────────────────────────
model Trip {
  id            String    @id @default(uuid())
  name          String
  description   String?
  coverPhoto    String?
  startDate     DateTime
  endDate       DateTime
  isPublic      Boolean   @default(false)
  shareToken    String?   @unique
  totalBudget   Float     @default(0)
  status        TripStatus @default(UPCOMING)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  stops         Stop[]
  notes         Note[]
  checklists    PackingChecklist[]
  invoices      Invoice[]
  communityPost CommunityPost?
}

enum TripStatus {
  UPCOMING
  ONGOING
  COMPLETED
}

// ─── STOPS ───────────────────────────────────────────────
model Stop {
  id            String    @id @default(uuid())
  order         Int
  startDate     DateTime
  endDate       DateTime
  budget        Float     @default(0)
  notes         String?
  createdAt     DateTime  @default(now())

  tripId        String
  trip          Trip      @relation(fields: [tripId], references: [id], onDelete: Cascade)

  cityId        String
  city          City      @relation(fields: [cityId], references: [id])

  activities    StopActivity[]
}

// ─── CITIES ──────────────────────────────────────────────
model City {
  id            String    @id @default(uuid())
  name          String
  country       String
  region        String?
  costIndex     Float     @default(1.0)   // 1=budget, 5=luxury
  popularity    Int       @default(0)
  imageUrl      String?
  description   String?
  lat           Float?
  lng           Float?
  createdAt     DateTime  @default(now())

  stops         Stop[]
  activities    Activity[]
  savedBy       SavedCity[]
}

// ─── ACTIVITIES ───────────────────────────────────────────
model Activity {
  id            String    @id @default(uuid())
  name          String
  description   String?
  type          ActivityType
  cost          Float     @default(0)
  duration      Int?      // in minutes
  imageUrl      String?
  createdAt     DateTime  @default(now())

  cityId        String
  city          City      @relation(fields: [cityId], references: [id])

  stopActivities StopActivity[]
}

enum ActivityType {
  SIGHTSEEING
  FOOD
  ADVENTURE
  SHOPPING
  CULTURE
  TRANSPORT
  STAY
  OTHER
}

// ─── STOP <-> ACTIVITY (M:N) ──────────────────────────────
model StopActivity {
  id            String    @id @default(uuid())
  scheduledTime DateTime?
  cost          Float?    // override activity cost
  notes         String?

  stopId        String
  stop          Stop      @relation(fields: [stopId], references: [id], onDelete: Cascade)

  activityId    String
  activity      Activity  @relation(fields: [activityId], references: [id])
}

// ─── BUDGET / INVOICE ─────────────────────────────────────
model Invoice {
  id            String    @id @default(uuid())
  invoiceNumber String    @unique
  generatedDate DateTime  @default(now())
  status        PaymentStatus @default(PENDING)
  subtotal      Float
  tax           Float     @default(0)
  discount      Float     @default(0)
  grandTotal    Float
  pdfUrl        String?

  tripId        String
  trip          Trip      @relation(fields: [tripId], references: [id], onDelete: Cascade)

  lineItems     InvoiceLineItem[]
}

enum PaymentStatus {
  PENDING
  PAID
  OVERDUE
}

model InvoiceLineItem {
  id            String    @id @default(uuid())
  category      String    // hotel, travel, food, activity
  description   String
  qty           Int       @default(1)
  unitCost      Float
  amount        Float

  invoiceId     String
  invoice       Invoice   @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
}

// ─── PACKING CHECKLIST ────────────────────────────────────
model PackingChecklist {
  id            String    @id @default(uuid())
  createdAt     DateTime  @default(now())

  tripId        String
  trip          Trip      @relation(fields: [tripId], references: [id], onDelete: Cascade)

  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  items         ChecklistItem[]
}

model ChecklistItem {
  id            String    @id @default(uuid())
  name          String
  category      ItemCategory @default(OTHER)
  isPacked      Boolean   @default(false)
  createdAt     DateTime  @default(now())

  checklistId   String
  checklist     PackingChecklist @relation(fields: [checklistId], references: [id], onDelete: Cascade)
}

enum ItemCategory {
  DOCUMENTS
  CLOTHING
  ELECTRONICS
  TOILETRIES
  MEDICINES
  OTHER
}

// ─── NOTES / JOURNAL ──────────────────────────────────────
model Note {
  id            String    @id @default(uuid())
  title         String
  content       String
  dayDate       DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  tripId        String
  trip          Trip      @relation(fields: [tripId], references: [id], onDelete: Cascade)

  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  stopId        String?
}

// ─── COMMUNITY ────────────────────────────────────────────
model CommunityPost {
  id            String    @id @default(uuid())
  caption       String?
  isPublic      Boolean   @default(true)
  likes         Int       @default(0)
  views         Int       @default(0)
  createdAt     DateTime  @default(now())

  tripId        String    @unique
  trip          Trip      @relation(fields: [tripId], references: [id], onDelete: Cascade)

  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// ─── SAVED CITIES ─────────────────────────────────────────
model SavedCity {
  userId        String
  cityId        String
  savedAt       DateTime  @default(now())

  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  city          City      @relation(fields: [cityId], references: [id], onDelete: Cascade)

  @@id([userId, cityId])
}
```

### Entity Relationship Overview

```
User ──< Trip ──< Stop >── City
                  Stop ──< StopActivity >── Activity
Trip ──< Note
Trip ──< PackingChecklist ──< ChecklistItem
Trip ──< Invoice ──< InvoiceLineItem
Trip ──  CommunityPost
User ──< SavedCity >── City
```

---

## 5. API Endpoints

Base URL: `https://api.traveloop.app/api/v1`

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login, returns JWT |
| POST | `/auth/logout` | Invalidate token |
| POST | `/auth/forgot-password` | Send reset email |
| POST | `/auth/reset-password` | Reset password with token |
| GET  | `/auth/me` | Get current user info |

### Users
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/users/:id` | Get user profile |
| PUT | `/users/:id` | Update profile (name, photo, etc.) |
| DELETE | `/users/:id` | Delete account |
| GET | `/users/:id/saved-cities` | Get saved cities |
| POST | `/users/:id/saved-cities/:cityId` | Save a city |
| DELETE | `/users/:id/saved-cities/:cityId` | Unsave a city |

### Trips
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/trips` | List user's trips (filter: status, search) |
| POST | `/trips` | Create new trip |
| GET | `/trips/:id` | Get trip details |
| PUT | `/trips/:id` | Update trip |
| DELETE | `/trips/:id` | Delete trip |
| POST | `/trips/:id/publish` | Make trip public (generate shareToken) |
| GET | `/trips/shared/:token` | View shared trip (public, no auth) |

### Stops
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/trips/:tripId/stops` | List stops for a trip |
| POST | `/trips/:tripId/stops` | Add stop to trip |
| PUT | `/trips/:tripId/stops/:stopId` | Update stop |
| DELETE | `/trips/:tripId/stops/:stopId` | Remove stop |
| PATCH | `/trips/:tripId/stops/reorder` | Reorder stops (drag & drop) |

### Activities on Stops
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/stops/:stopId/activities` | List activities on a stop |
| POST | `/stops/:stopId/activities` | Add activity to stop |
| PUT | `/stops/:stopId/activities/:saId` | Update scheduled activity |
| DELETE | `/stops/:stopId/activities/:saId` | Remove activity from stop |

### Cities
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/cities` | Search cities (query, country, region) |
| GET | `/cities/:id` | Get city details |
| GET | `/cities/:id/activities` | Activities in a city |
| GET | `/cities/popular` | Top popular cities |

### Activities
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/activities` | Search activities (cityId, type, maxCost) |
| GET | `/activities/:id` | Get activity detail |

### Budget & Invoice
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/trips/:tripId/budget` | Get budget summary & breakdown |
| GET | `/trips/:tripId/invoices` | List invoices for trip |
| POST | `/trips/:tripId/invoices` | Generate invoice |
| GET | `/invoices/:id` | Get invoice detail |
| PATCH | `/invoices/:id/mark-paid` | Mark invoice as paid |
| GET | `/invoices/:id/pdf` | Download invoice PDF |

### Packing Checklist
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/trips/:tripId/checklist` | Get checklist for trip |
| POST | `/trips/:tripId/checklist/items` | Add item to checklist |
| PATCH | `/trips/:tripId/checklist/items/:itemId` | Toggle packed / update item |
| DELETE | `/trips/:tripId/checklist/items/:itemId` | Remove item |
| DELETE | `/trips/:tripId/checklist/reset` | Reset all items |

### Notes / Journal
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/trips/:tripId/notes` | List notes (filter: byDay, byStop) |
| POST | `/trips/:tripId/notes` | Create note |
| PUT | `/trips/:tripId/notes/:noteId` | Update note |
| DELETE | `/trips/:tripId/notes/:noteId` | Delete note |

### Community
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/community/posts` | List public trip posts |
| POST | `/community/posts` | Share trip to community |
| GET | `/community/posts/:id` | View single post |
| POST | `/community/posts/:id/like` | Like a post |
| POST | `/community/trips/:id/copy` | Clone a public trip |

### Admin
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/admin/stats` | Platform overview stats |
| GET | `/admin/users` | Manage users (list, search) |
| DELETE | `/admin/users/:id` | Delete user |
| GET | `/admin/trips` | All trips with filters |
| GET | `/admin/cities/popular` | Top cities chart data |
| GET | `/admin/activities/popular` | Top activities chart data |

---

## 6. UI/UX Design System

### Design Concept: "Warm Horizon"
**Direction:** Warm, editorial travel magazine meets modern SaaS. Rich earth tones with vivid accent pops. Feels like a passport stamp meets clean digital product.

---

### Color Palette

```css
:root {
  /* Backgrounds */
  --bg-base:        #0F0E0B;   /* Near black warm */
  --bg-surface:     #1A1916;   /* Card backgrounds */
  --bg-elevated:    #252319;   /* Modals, dropdowns */
  --bg-subtle:      #2E2C26;   /* Hover states */

  /* Brand Colors */
  --brand-primary:  #F4A435;   /* Warm amber — CTAs, active states */
  --brand-secondary:#E8643A;   /* Burnt orange — highlights */
  --brand-accent:   #5CC8A8;   /* Teal — success, tags */

  /* Text */
  --text-primary:   #F5F0E8;   /* Main text */
  --text-secondary: #A09B8C;   /* Muted labels */
  --text-disabled:  #504E48;

  /* Status */
  --status-success: #5CC8A8;
  --status-warning: #F4A435;
  --status-danger:  #E85454;
  --status-info:    #5BA8E8;

  /* Borders */
  --border-subtle:  rgba(244, 164, 53, 0.12);
  --border-default: rgba(244, 164, 53, 0.24);
  --border-strong:  rgba(244, 164, 53, 0.48);
}
```

### Typography

```css
/* Import in index.html */
/* Display: Playfair Display — editorial, luxurious */
/* Body: DM Sans — clean, modern, readable */

--font-display: 'Playfair Display', Georgia, serif;
--font-body:    'DM Sans', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', monospace;

/* Scale */
--text-xs:   0.75rem;   /* 12px — labels, badges */
--text-sm:   0.875rem;  /* 14px — secondary text */
--text-base: 1rem;      /* 16px — body */
--text-lg:   1.125rem;  /* 18px — card titles */
--text-xl:   1.25rem;   /* 20px — section headers */
--text-2xl:  1.5rem;    /* 24px — page headers */
--text-3xl:  1.875rem;  /* 30px — hero text */
--text-4xl:  2.25rem;   /* 36px — display */
--text-5xl:  3rem;      /* 48px — large display */
```

### Spacing & Radius

```css
--radius-sm:  6px;
--radius-md:  12px;
--radius-lg:  20px;
--radius-xl:  32px;
--radius-full: 9999px;

--space-base: 8px;   /* 1 unit = 8px */
```

### Component Tokens

```css
/* Cards */
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.card:hover {
  border-color: var(--border-default);
  box-shadow: 0 8px 32px rgba(244, 164, 53, 0.08);
}

/* Primary Button */
.btn-primary {
  background: var(--brand-primary);
  color: #0F0E0B;
  font-weight: 600;
  border-radius: var(--radius-full);
  padding: 12px 28px;
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(244, 164, 53, 0.4);
}
.btn-primary:active {
  transform: translateY(0);
}
```

### TailwindCSS Config Extension

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   '#F4A435',
          secondary: '#E8643A',
          accent:    '#5CC8A8',
        },
        bg: {
          base:     '#0F0E0B',
          surface:  '#1A1916',
          elevated: '#252319',
          subtle:   '#2E2C26',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease forwards',
        'fade-in':    'fadeIn 0.3s ease forwards',
        'slide-in':   'slideIn 0.4s ease forwards',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%':   { transform: 'translateX(-20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(244, 164, 53, 0.4)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(244, 164, 53, 0)' },
        },
      },
    },
  },
}
```

---

## 7. Screen-by-Screen Breakdown

### Screen 1 — Login
**Route:** `/login`

**Layout:**
- Split layout: left = travel imagery / branding, right = form
- Logo "Traveloop" in display font at top
- Email + password inputs with floating labels
- "Forgot Password" link
- Primary CTA: "Sign In"
- Divider + "Sign up" link

**Framer Motion:**
```jsx
// Stagger form fields on mount
const formVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } })
}
```

---

### Screen 2 — Registration
**Route:** `/register`

**Fields:** First Name, Last Name, Email, Phone, Password, City, Country
**Layout:** Single column centered card with progress indicator
**Animation:** Slide between field groups with `AnimatePresence`

---

### Screen 3 — Dashboard / Home
**Route:** `/dashboard`

**Sections:**
- **Header:** "Good morning, Vinayak 🌅" with date
- **Hero Band:** Horizontal scroll of recommended destination cards (with parallax)
- **Quick Actions:** Plan New Trip | My Trips | Community | Budget
- **Your Trips Strip:** Horizontal scroll of trip cards (status badges: Ongoing / Upcoming / Completed)
- **Top Regional Selections:** Grid of city cards with cost index and popularity
- **Search Bar:** Sticky top search with filter + sort

**Key Components:**
```jsx
<DestinationCard city={city} />  // Glassmorphism card with city image
<TripStatusBadge status="ONGOING" />
<QuickActionButton icon={<MapPin />} label="Plan a Trip" />
```

---

### Screen 4 — Create Trip
**Route:** `/trips/new`

**Form Fields:**
- Trip Name (text)
- Start Date → End Date (date range picker)
- Description (textarea)
- Cover Photo (drag-drop upload)
- Initial Stop: Select City + Date Range
- "Add Another Stop" button (animated expand)
- Suggestions panel: AI-suggested places based on selected cities

**Framer Motion:** Multi-step wizard with slide transitions between steps

---

### Screen 5 — Itinerary Builder
**Route:** `/trips/:id/build`

**Layout:** Left sidebar (stop list) + Main area (selected stop detail)

**Features:**
- **Sections/Stops:** DnD reorderable stop cards (via @dnd-kit)
- Each stop: City header, date range, budget field, activity list
- **Add Activity:** Inline search → pick from results → drop into stop
- "Add Section" button → animates a new stop card into view

**Key Animation:**
```jsx
// DnD with Framer Motion layout animations
<Reorder.Group axis="y" values={stops} onReorder={setStops}>
  {stops.map(stop => <Reorder.Item key={stop.id} value={stop} />)}
</Reorder.Group>
```

---

### Screen 6 — Trip List (My Trips)
**Route:** `/trips`

**Layout:**
- Search + Filter (Group by, Sort by) bar at top
- 3-column responsive grid of Trip Cards
- Trip Card: Cover image, trip name, date range, city count, status badge, action menu (view/edit/delete)
- Filter tabs: Ongoing | Upcoming | Completed

**Animation:** Cards animate in with staggered `fadeUp` on first load

---

### Screen 7 — User Profile
**Route:** `/profile`

**Sections:**
- Avatar + cover gradient header
- Editable user details (inline editing)
- Stats row: Trips Created | Cities Visited | Activities Done
- "Preplanned Trips" tab (public trip templates)
- "Previous Trips" tab
- "Saved Cities" grid

---

### Screen 8 — City Search / Activity Search
**Route:** `/explore`

**Layout:**
- Full-width search bar (with animated placeholder cycling: "Paris", "Bali", "Tokyo"...)
- Filter bar: Country | Region | Cost Index | Type
- Results grid: City Card (image, name, country, cost index stars, popularity bar)
- Click → City Detail modal with activities list
- "Add to Trip" button on each card

**Animation:**
```jsx
// Staggered results appearance on search
<AnimatePresence>
  {results.map((city, i) => (
    <motion.div key={city.id} initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} />
  ))}
</AnimatePresence>
```

---

### Screen 9 — Itinerary View + Budget
**Route:** `/trips/:id/view`

**Layout:**
- Top: Trip hero banner (cover photo + name + date range)
- View toggle: List | Calendar | Timeline
- **List View:** Day-wise grouped blocks → City Header → Activity Blocks (time, cost, type icon)
- **Budget Section:** Sidebar panel with:
  - Total Budget vs Total Spent progress bar
  - Pie chart: Transport | Stay | Activities | Meals
  - Bar chart: Cost per day
  - Alert banner if over budget (red glow)
- Day filter tabs

---

### Screen 10 — Community
**Route:** `/community`

**Layout:**
- Search bar + filter (Group by destination / type)
- Masonry grid of community trip cards
- Trip Card: Cover image, trip name, creator avatar + name, cities count, likes, views
- "Copy Trip" → clones the itinerary to user's account

---

### Screen 11 — Packing Checklist
**Route:** `/trips/:id/checklist`

**Layout:**
- Header: Trip name + Progress "X / Y items packed"
- Progress bar (animated fill)
- Category accordion sections: Documents | Clothing | Electronics | Toiletries | Medicines | Other
  - Each item: checkbox (animated check), item name, delete icon
- Bottom: "+ Add Item" → inline add form | "Reset All" | "Share Checklist"

**Animation:**
```jsx
// Checkbox check animation
<motion.path
  initial={{ pathLength: 0 }}
  animate={{ pathLength: isPacked ? 1 : 0 }}
  transition={{ duration: 0.3 }}
/>
```

---

### Screen 12 — Admin Dashboard
**Route:** `/admin` (admin role only)

**Layout:**
- Sidebar navigation: Overview | Users | Trips | Cities | Activities
- **Overview:** KPI cards (Total Users, Total Trips, Active Today, Revenue)
- **Charts:** Line chart (trips over time), Bar chart (top cities), Donut (activity types)
- **Users Table:** Sortable, filterable, with role badge and actions
- **Popular Cities / Activities:** Ranked lists with trend indicators

---

### Screen 13 — Trip Notes / Journal
**Route:** `/trips/:id/notes`

**Layout:**
- Filter tabs: All | By Day | By Stop
- Notes list (sorted by date, newest first)
- Each note: Title, timestamp, preview text, action buttons (edit/delete)
- "+ Add Note" → slide-up modal with title + rich text area
- Note detail: Expandable inline with smooth height animation

---

### Screen 14 — Expense Invoice
**Route:** `/trips/:id/invoice`

**Layout:**
- Search + Filter + Sort bar
- Invoice card: Invoice ID, trip name, dates, generated date, payment status badge
- **Invoice Detail Panel (right side):**
  - Header: Trip name, cities, traveler details
  - Generated date + status
  - Line items table: #, Category, Description, Qty, Unit Cost, Amount
  - Subtotal / Tax / Discount / Grand Total
  - Actions: Download Invoice (PDF) | Export | Mark as Paid
- **Budget Insights sidebar:** Total Budget / Total Spent / Remaining (color coded)

---

## 8. Animation & Motion Guidelines

### Framer Motion Patterns

```jsx
// ─── PAGE TRANSITIONS ─────────────────────────────────────
const pageVariants = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:     { opacity: 0, y: -16, transition: { duration: 0.25 } },
}

// Usage in App.jsx
<AnimatePresence mode="wait">
  <motion.div key={location.pathname} {...pageVariants}>
    <Outlet />
  </motion.div>
</AnimatePresence>

// ─── STAGGER CHILDREN ──────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

// ─── MODAL / DRAWER ────────────────────────────────────────
const drawerVariants = {
  hidden:  { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 28, stiffness: 300 } },
  exit:    { x: '100%', transition: { duration: 0.2 } },
}

// ─── CARD HOVER ────────────────────────────────────────────
<motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }}>
  <TripCard />
</motion.div>

// ─── NUMBER COUNTER (budget totals) ────────────────────────
import { useMotionValue, animate } from 'framer-motion'
// Animate from 0 to total on mount

// ─── PROGRESS BAR (checklist) ──────────────────────────────
<motion.div
  initial={{ width: 0 }}
  animate={{ width: `${progress}%` }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>

// ─── DRAG & DROP (itinerary builder) ───────────────────────
// Use Framer Motion's Reorder API for native-feel DnD
import { Reorder } from 'framer-motion'
```

### Micro-interaction Checklist
- [ ] Button press: scale down to 0.97 on active
- [ ] Input focus: border glow animation (amber)
- [ ] Toast notifications: slide in from top-right, auto-dismiss
- [ ] Trip card: lift + shadow on hover
- [ ] Checklist item check: SVG path stroke animation
- [ ] Page load: staggered card/section reveals
- [ ] Tab switch: underline slides to new tab
- [ ] Budget alert: pulsing red border glow
- [ ] Empty states: gentle floating illustration animation
- [ ] Loading skeleton: shimmer effect with warm tones

---

## 9. State Management

### Zustand Stores

```js
// authStore.js
{
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) => {},
  logout: () => {},
  updateUser: (data) => {},
}

// tripStore.js
{
  trips: [],
  currentTrip: null,
  filters: { status: 'all', search: '' },
  setCurrentTrip: (trip) => {},
  setFilter: (key, value) => {},
}

// uiStore.js
{
  isSidebarOpen: true,
  activeModal: null,  // 'addStop' | 'addActivity' | 'shareTrip' | null
  toast: null,
  openModal: (name) => {},
  closeModal: () => {},
  showToast: ({ message, type }) => {},
}
```

### React Query Keys

```js
export const queryKeys = {
  trips:        (userId) => ['trips', userId],
  trip:         (tripId) => ['trip', tripId],
  stops:        (tripId) => ['stops', tripId],
  cities:       (query)  => ['cities', query],
  activities:   (cityId) => ['activities', cityId],
  budget:       (tripId) => ['budget', tripId],
  checklist:    (tripId) => ['checklist', tripId],
  notes:        (tripId) => ['notes', tripId],
  community:             => ['community'],
}
```

---

## 10. Deployment Guide

### Environment Variables

**Backend `.env`**
```env
DATABASE_URL=postgresql://user:pass@host:5432/traveloop
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PORT=5000
NODE_ENV=production
CLIENT_URL=https://traveloop.vercel.app
```

**Frontend `.env`**
```env
VITE_API_BASE_URL=https://api.traveloop.app/api/v1
VITE_APP_NAME=Traveloop
```

### Deploy Commands

```bash
# Backend (Railway)
npm run build && npm start

# Frontend (Vercel)
npm run build
# vercel.json: { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }

# DB Migration
npx prisma migrate deploy
npx prisma db seed
```

---

## 11. 8-Hour Sprint Plan

| Hour | Tasks | Owner |
|------|-------|-------|
| 0–1  | Project setup, repo, env, Prisma schema, DB seed | Backend |
| 0–1  | Vite + Tailwind setup, design tokens, routing skeleton | Frontend |
| 1–2  | Auth APIs (register, login, JWT) + Auth pages (Login, Register) | Full stack |
| 2–3  | Trip CRUD APIs + Trip List, Create Trip screens | Full stack |
| 3–4  | Stops + Activities APIs + Itinerary Builder UI | Full stack |
| 4–5  | City/Activity Search APIs + Search screens | Full stack |
| 5–6  | Budget/Invoice APIs + Budget View + Invoice screen | Full stack |
| 6–7  | Checklist + Notes APIs + Checklist + Notes screens | Full stack |
| 7–7.5 | Community tab + Public itinerary view + Share feature | Full stack |
| 7.5–8 | Admin dashboard, polish, animations, demo prep | Full stack |

### MVP Priority (Must-Have)
1. Auth (Login / Register)
2. Create & List Trips
3. Itinerary Builder (add stops + activities)
4. City & Activity Search
5. Budget view

### Should-Have
6. Packing Checklist
7. Trip Notes
8. Invoice / PDF export

### Nice-to-Have
9. Community / Sharing
10. Admin Dashboard

---

## 12. Stitch UI Prompt

> See the separate `Traveloop_Stitch_Prompt.md` file for the complete, copy-paste-ready Stitch prompt to generate all 14 screens.

---

*Documentation generated for Traveloop — Odoo Hackathon 2025*
*Stack: React + Vite + TailwindCSS + Framer Motion + Express + PostgreSQL + Prisma*
