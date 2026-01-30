# Customizable Dashboard Application

## 🚀 Overview
This is a **MERN Stack (MongoDB, Express, React, Node.js)** application that allows users to create a personalized dashboard. Users can add widgets, rearrange them via drag-and-drop, customize their content, and save their layout persistently to a database.

The project is built with a focus on **Clean Architecture**, **Scalability**, and **User Experience**, featuring a "Hacker/Developer" aesthetic with smooth animations and interactive charts.

---

## ✨ Features
* **Dynamic Layout:** Add, remove, and reorder widgets using a seamless Drag-and-Drop interface.
* **Widget Types:**
    * **System Note:** A customizable text area for quick reminders.
    * **Data Analytics:** Interactive charts (Bar, Area, Pie) powered by Recharts.
* **Persistence:** The "Save State" button stores the exact layout and content to MongoDB, so data is never lost on refresh.
* **Custom Tooltips:** Unified styling for all chart tooltips.
* **Animations:** Smooth entry/exit animations using Framer Motion.
* **Feedback:** Real-time toast notifications for user actions.

---

## 🛠️ Tech Stack

### Frontend
* **React (Vite):** For fast, component-based UI development.
* **Tailwind CSS:** For the custom "Matrix/Hacker" dark theme.
* **@dnd-kit:** For accessible and performant drag-and-drop functionality.
* **Recharts:** For data visualization.
* **Framer Motion:** For layout animations.
* **Axios:** For API communication.

### Backend
* **Node.js & Express:** For the REST API.
* **MongoDB & Mongoose:** For storing flexible JSON-based widget configurations.

---

## ⚙️ Installation & Setup

### Prerequisites
* Node.js installed.
* MongoDB installed and running locally (or a cloud URL).

### 1. Backend Setup
```bash
cd backend
npm install
# Create a .env file with:
# PORT=5000
# MONGO_URI=mongodb://127.0.0.1:27017/dashboard_db

npm start
# Server runs on http://localhost:5000

```
### 2. Frontend Setup
``` bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## Project Structure
``` bash
dashboard-app/
├── backend/
│   ├── controllers/   # Logic for fetching/saving dashboard
│   ├── models/        # Database Schema (Mongoose)
│   ├── routes/        # API Endpoints
│   └── config/        # DB Connection setup
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard/      # Grid & Drag Logic (WidgetWrapper.jsx)
    │   │   ├── Widgets/        # Individual Widgets (ChartWidget.jsx, etc.)
    │   │   └── Common/         # Reusable UI (Buttons)
    │   ├── context/            # Global State (DashboardContext)
    │   ├── hooks/              # Custom Hooks (useDashboard)
    │   └── utils/              # Widget Registry (Scalability Pattern)
```

## Design and Technical Decisions
### 1. The Widget Registry Pattern
Instead of hardcoding widgets into the grid, I created a widgetRegistry.js file. This maps widget types (e.g., 'chart', 'text') to their respective React components.
Benefit: Adding a new widget type (like a "Weather Widget") only requires adding one line to the registry, making the app highly extensible.

### 2. MongoDB for Flexible Configuration 
I chose MongoDB because widget configurations are unstructured data. A text widget stores a content string, while a chart widget stores a data array.
Benefit: MongoDB allows us to store these varying config objects in the same collection without complex SQL joins.

### 3. Context API + Custom Hooks
State management is handled via React Context (DashboardContext).
Benefit: This avoids "prop drilling" and allows any component (like the Save Button in the Navbar) to access the state and trigger a save action.

### 4. Framer Motion + Dnd-Kit Optimization
Integrating animations with drag-and-drop can cause layout thrashing.
Solution: I separated the "Drag" logic (handled by dnd-kit) from the "Animation" logic (handled by framer-motion) into nested divs inside WidgetWrapper.jsx and used React.memo to prevent heavy re-renders during dragging.

Submitted by: Sankalpa Panda 
Date: 30th January 2026
