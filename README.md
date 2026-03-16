# 💊 AI Pharmacy Assistant

An intelligent full-stack pharmacy assistant app powered by AI — providing instant medicine information, drug interaction checking, nearby pharmacy finder, medicine ordering, and personalised reminders.

---

## 🚀 Quick Start

```bash
# 1. Install backend dependencies
npm install

# 2. Start the backend server
npm run dev          # development (with nodemon)
npm start            # production

# 3. Open the frontend
# With server running, open: http://localhost:3000
# Or open frontend/src/pages/Home.html directly in a browser
```

---

## 📁 Project Structure

```
ai-pharmacy-assistant/
├── backend/
│   ├── server.js              # Express app entry point
│   ├── config/database.js     # MongoDB connection
│   ├── routes/                # API route definitions
│   ├── controllers/           # Business logic
│   ├── models/                # Mongoose schemas
│   └── services/              # AI/helper services
├── frontend/src/
│   ├── pages/                 # HTML pages
│   │   ├── Home.html          # Landing + search + medicine preview
│   │   ├── Chatbot.html       # AI chat interface
│   │   ├── NearbyMedical.html # Map + pharmacy finder
│   │   ├── OrderMedicine.html # Medicine catalogue + cart
│   │   └── Reminder.html      # Medicine reminder manager
│   ├── components/Navbar.html # Shared navbar snippet
│   ├── services/api.js        # Frontend API client
│   └── css/style.css          # Full design system + animations
└── database/
    └── medicines.json         # 8 medicines with full data
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login + get JWT |
| GET  | `/api/medicines` | List/search medicines (`?q=`, `?category=`) |
| GET  | `/api/medicines/:id` | Get single medicine |
| POST | `/api/medicines/interaction-check` | Check drug interaction |
| POST | `/api/chatbot/ask` | Ask the AI chatbot |
| POST | `/api/chatbot/symptom-check` | Symptom-based suggestions |
| POST | `/api/orders` | Place order |
| GET  | `/api/orders/user/:userId` | User's orders |
| GET  | `/api/pharmacies` | List all pharmacies |
| GET  | `/api/pharmacies/nearby` | Nearby pharmacies |

---

## ✨ Features

- 🤖 **AI Chatbot** — Rule-based NLP for medicine queries and symptom checking
- 💊 **Medicine Database** — 8 medicines with dosages, interactions, warnings
- ⚠️ **Drug Interaction Checker** — Real-time safety check
- 📍 **Nearby Pharmacies** — Interactive SVG map with filter and directions
- 🛒 **Online Ordering** — Cart, promo codes, order placement
- ⏰ **Smart Reminders** — Schedule doses with browser notifications
- 🎨 **Beautiful UI** — Dark theme, animations, responsive design

---

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3 (animations), Vanilla JS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose) + JSON file store
- **Auth**: JWT + bcryptjs
- **Fonts**: Plus Jakarta Sans + Syne (Google Fonts)

---

## 🔧 Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ai_pharmacy
JWT_SECRET=your_secret_key_here
```

---

## 📄 License

MIT — Free to use and modify.
