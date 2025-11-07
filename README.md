🛍️ Audiophile E-Commerce App

A modern React + Convex web application that powers an Audiophile-style e-commerce store — including dynamic product pages, cart functionality, and a detailed Order Confirmation page.

🚀 Features
🧩 Core Features

Dynamic Product Pages – Display detailed information for each product (e.g. XX99 Mark II Headphones).

Add to Cart Functionality – Users can add, remove, and update items in their cart.

Convex Backend Integration – Real-time queries and mutations for storing and fetching cart and order data.

Order Confirmation Page – Displays full order details including customer info, shipping info, and totals.

Responsive Design – Fully optimized for mobile, tablet, and desktop.

Error Handling & Fallbacks – Handles missing orders, invalid IDs, and async loading gracefully.

🧠 Tech Stack
Category	Technology
Frontend	React (Vite or CRA), TypeScript, React Router
UI Styling	Tailwind CSS
Backend	Convex Cloud Functions
Icons	react-icons (Feather Icons)
Hosting	Vercel (Recommended)
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/audiophile-ecommerce.git
cd audiophile-ecommerce

2️⃣ Install Dependencies
npm install

3️⃣ Set Up Convex

If you haven’t already:

npx convex dev


This will generate your local Convex environment and create the /convex/ directory.

4️⃣ Configure Environment Variables

Create a .env.local file at the project root with:

VITE_CONVEX_URL=https://your-convex-deployment-name.convex.cloud


💡 To get your Convex deployment URL:

Visit https://dashboard.convex.dev

Create a project and deploy it.

Copy the Production Deployment URL.

🧪 Running the App Locally

Start the development server:

npm run dev
