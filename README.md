# ShoppyGlobe: E-Commerce Application

A fully responsive, feature-rich React e-commerce web application that lets users browse products, view detailed information, manage a shopping cart, and complete a protected checkout flow — all backed by real-time data from the DummyJSON API.

🔗 **Live Demo:** [ShoppyGlobe](https://akumar230523.github.io/e-commerce/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Authentication](#-authentication)
- [API](#-api)
- [State Management](#-state-management-&-architectural-decisions)
- [Routing Architecture](#-routing-architecture)
- [Component Architecture](#-component-architecture)
- [Key Architectural Decisions](#-key-architectural-decisions)
- [Deployment](#-deployment)


## ✨ Features

| Feature | Description |
|---|---|
| 🛍️ Product Listing | Browse 100+ products fetched live from the DummyJSON API |
| 🔍 Search & Filter | Filter products by name and category in real time using memoized logic |
| 📄 Product Detail | Full product info: brand, rating, discount, stock, warranty, shipping, reviews |
| 🛒 Cart Management | Add, remove, increase, or decrease item quantities with instant feedback |
| 🔐 Protected Checkout | Checkout route is route-guarded; unauthenticated users are redirected to Sign In |
| 🌙 Dark / Light Mode | Theme preference toggled in the header and persisted via `localStorage` |
| 📱 Responsive Design | Mobile-first layout with a collapsible hamburger navigation menu |
| 🔔 Toast Notifications | Real-time feedback on all cart, auth, and order actions via React Toastify |
| ⚡ Code Splitting | All page-level components are lazy-loaded via `React.lazy` + `Suspense` |


## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React** | Component-based UI development |
| **React Router DOM** | Hash-based client-side routing and navigation |
| **Redux Toolkit** | Centralized state management for cart and auth |
| **React Redux** | React bindings for the Redux store |
| **React Toastify** | Non-blocking toast notification system |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **Vite** | Fast build tool and development server |
| **DummyJSON API** | Mock REST API providing product data |


## 📁 Project Structure

```
e-commerce/
├── public/
│   └── ShoppyGlobe.png          # App favicon and logo
├── src/
│   ├── components/
│   │   ├── CartItem.jsx          # Individual cart item with quantity controls
│   │   ├── Footer.jsx            # Site footer with social links
│   │   ├── Header.jsx            # Fixed responsive header with nav and auth
│   │   ├── Loader.jsx            # Full-screen loading spinner (Suspense fallback)
│   │   ├── ProductItem.jsx       # Product card used in the listing grid
│   │   └── ProtectedRoute.jsx    # HOC-style auth guard for the checkout route
│   ├── context/
│   │   └── Theme.js              # React Context for dark/light theme state
│   ├── hooks/
│   │   └── useFetch.js           # Custom hook: data, loading, error from any URL
│   ├── pages/
│   │   ├── ACH.jsx               # About / Contact / Help static page
│   │   ├── Cart.jsx              # Shopping cart page
│   │   ├── Checkout.jsx          # Order summary and place-order page
│   │   ├── Home.jsx              # Landing hero section
│   │   ├── NotFound.jsx          # 404 error boundary page
│   │   ├── ProductDetail.jsx     # Single product detail view with reviews
│   │   ├── ProductList.jsx       # Filterable product grid
│   │   └── SignIn.jsx            # Login form
│   ├── store/
│   │   ├── authSlice.js          # Auth state: login / logout reducers
│   │   ├── cartSlice.js          # Cart state: add / remove / quantity reducers
│   │   └── store.js              # Redux store configuration
│   ├── App.jsx                   # Root layout with ThemeContext provider
│   ├── index.css                 # Tailwind directives + custom animations
│   └── main.jsx                  # Entry point: router, Redux provider, lazy pages
├── index.html                    # HTML shell (Font Awesome CDN)
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```


## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/akumar230523/e-commerce.git

# 2. Navigate into the project directory
cd e-commerce

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the app for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over all source files |
| `npm run deploy` | Build and deploy to GitHub Pages |


## 🔑 Authentication

The app uses a hardcoded demo account for authentication (no backend required):

| Field | Value |
|---|---|
| **Username** | `user@example.com` |
| **Password** | `password123` |

> ⚠️ This is a demo credential for development and testing purposes only. Credentials are validated entirely on the client via the Redux `authSlice` reducer. Do not use real credentials.

Users must be signed in to:
- Add items to the cart
- Access the `/checkout` route


## 🌐 API

The app sources all product data from the **[DummyJSON API](https://dummyjson.com/)**, a free public REST API providing realistic mock e-commerce data.

| Endpoint | Used In | Purpose |
|---|---|---|
| `GET /products` | `ProductList.jsx` | Fetches all products (up to 30 by default) |
| `GET /products/:id` | `ProductDetail.jsx` | Fetches a single product with full details |

All API calls are made through the custom `useFetch` hook, which manages `loading`, `data`, and `error` state internally and is re-usable across any page.

```js
// hooks/useFetch.js
const { data, loading, error } = useFetch('https://dummyjson.com/products');
```


## 🗃️ State Management & Architectural Decisions

### Redux Toolkit — Centralized State

Two slices manage global state:

#### `cartSlice`
Handles all shopping cart operations. The cart state is an array of `{ id, product, quantity }` objects.

| Reducer | Action |
|---|---|
| `addProduct(product)` | Adds a new item or increments quantity if already in cart |
| `removeProduct(cartItemId)` | Removes a specific cart item by its unique ID |
| `increaseQuantity(cartItemId)` | Increments the quantity of a cart item |
| `decreaseQuantity(cartItemId)` | Decrements quantity; auto-removes the item if it reaches 0 |
| `clearCart()` | Empties the entire cart (called after a successful order) |

> **Design note:** Each cart entry gets a unique `id` generated with `Date.now()` at the time it is added. This separates the cart-item identity from the product identity, making quantity management straightforward even if the same product appears across multiple sessions.

#### `authSlice`
Handles authentication state. Credentials are validated synchronously in the reducer — no async thunk needed for this demo.

| Reducer | Action |
|---|---|
| `login({ username, password })` | Validates credentials; throws on mismatch (caught by the component) |
| `logout()` | Resets `isAuthenticated` and `user` to their initial values |

### React Context — Theme

Dark/light mode state lives in `ThemeContext` rather than Redux, since it is purely a UI concern and not shared with reducers. The preference is persisted to `localStorage` on every change via a `useEffect` in `App.jsx`, and the `dark` class is toggled on `<html>` to activate Tailwind's `dark:` variants.


## 🗺️ Routing Architecture

The app uses **Hash-based routing** (`createHashRouter`) from React Router v7. This is intentional: GitHub Pages does not support server-side rewrites for SPAs, so hash routing (`/#/product-list`) ensures deep links work correctly in the deployed environment.

```
/                   → Home + ProductList (index route)
/product-list       → ProductList
/product-detail/:id → ProductDetail
/cart               → Cart
/checkout           → Checkout (protected — requires auth)
/sign-in            → SignIn
/ach                → About / Contact / Help
*                   → NotFound (error element)
```

### Protected Routes

`ProtectedRoute` is a thin wrapper component that reads `isAuthenticated` from the Redux store. If the user is not authenticated, it renders `<Navigate to="/sign-in" replace />`, preventing access to `/checkout` without modifying the router configuration.

### Code Splitting

Every page component is wrapped in `React.lazy()` at the router level in `main.jsx`, with `<Suspense fallback={<Loader />}>` at the provider level. This means the JS bundle for each page is only downloaded when the user navigates to it.


## 🧩 Component Architecture

### Reusable / Shared Components (`/components`)

| Component | Responsibility |
|---|---|
| `Header` | Fixed top nav with theme toggle, cart badge, auth button, and mobile hamburger menu |
| `Footer` | Bottom bar with navigation links and social media icons |
| `Loader` | Centered spinner shown as the Suspense fallback and during data fetching |
| `ProductItem` | Self-contained product card: image, title, price, rating, and Add to Cart button |
| `CartItem` | Cart row with increment/decrement/remove controls and subtotal display |
| `ProtectedRoute` | Auth guard HOC that redirects unauthenticated users to Sign In |

### Pages (`/pages`)

Each page is a lazy-loaded route component. Data-fetching pages use the `useFetch` hook and handle their own loading and error UI.


## 🏗️ Key Architectural Decisions

### 1. Hash Routing for GitHub Pages Compatibility
`createHashRouter` is used instead of `createBrowserRouter` because GitHub Pages serves static files and cannot redirect all paths to `index.html`. Hash routing works without server configuration.

### 2. Custom `useFetch` Hook
Rather than repeating `fetch` + state logic in every component, all API calls are centralized into a single reusable `useFetch(url)` hook. It returns `{ data, loading, error }` and re-fetches whenever the URL changes.

### 3. Memoization in `ProductList`
Both the category list and the filtered product array are computed with `useMemo`. This prevents re-running the filter logic on every render and ensures the category chips only rebuild when the underlying product data changes.

### 4. Cart Item ID vs. Product ID
Cart items carry their own `id` (via `Date.now()`) separate from `product.id`. This avoids ambiguity in reducers like `removeProduct` and `increaseQuantity`, which target the cart-entry ID rather than the product ID, making the logic simpler and collision-proof.

### 5. Theme via Context, Auth/Cart via Redux
UI-only state (theme) is scoped to React Context to avoid polluting the Redux store with non-business concerns. Shared application state (cart, auth) lives in Redux so it can be accessed by any component without prop drilling.

### 6. Toast Notifications for All Mutations
Every cart action and auth event triggers a toast notification via React Toastify, giving users immediate, non-blocking feedback without requiring dedicated UI state for success/error messages.


## 🚢 Deployment

The app is deployed to **GitHub Pages** using the `gh-pages` package.

```bash
# Build and deploy in one step
npm run deploy
```

This runs `vite build` (via the `predeploy` script) and then pushes the `dist/` folder to the `gh-pages` branch of the repository.

The `homepage` field in `package.json` is set to the GitHub Pages URL so that Vite generates correct asset paths in the production build.


---

