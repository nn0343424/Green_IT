# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# ♻️ E-Waste Community Exchange Platform

The E-Waste Community Exchange is a full-stack MERN application designed to facilitate the responsible disposal and reuse of electronic waste (e-waste) within a community. It connects users who have unwanted or broken electronics with others who can repair, repurpose, or properly recycle them.

## ✨ Features

### Community & Exchange
* **Item Listing:** Users can post details and images of their e-waste items (e.g., old laptops, watches, peripherals).
* **Product View:** A dedicated page to browse all available e-waste items.
* **Request Pickup:** Users can express interest in an item for reuse or recycling (as seen in the "Available E-Waste Products" screen).

### Core Functionality
* **Contact Form:** A dedicated contact page to handle user inquiries, with data saved to the database and email notification sent to the administrator.
* **AI-Assisted Processing:** Integration of the Gemini API (using the `aiRoutes`) for generating item descriptions or providing disposal insights.

### Technology Stack
* **Frontend:** React, React Router, Tailwind CSS, SweetAlert2 for notifications.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (via Mongoose).
* **Email Service:** Nodemailer (configured with Gmail App Passwords for secure communication).

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* Node.js (v18+) and npm
* MongoDB Atlas account (or a local MongoDB instance)
* A Gmail account with **2-Step Verification** enabled (for Nodemailer)

### 1. Backend Setup (`server` folder)

1.  **Install Dependencies:** Navigate to the `server` directory and install the necessary packages.
    ```bash
    cd server
    npm install
    ```

2.  **Environment Variables:** Create a file named `.env` in the `server` directory and add your configuration keys:
    ```env
    # MongoDB Atlas Connection String (IMPORTANT: Add your database name at the end, e.g., /ewaste)
    MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@clusterone.cvieati.mongodb.net/ewaste

    # Gmail SMTP Credentials for Nodemailer (Must use a 16-character App Password)
    NODEMAILER_USER=nn0343424@gmail.com
    NODEMAILER_PASS=xnngjksbxvghtiwd 

    # Gemini API Key for AI functionality
    GEMINI_API_KEY=AIzaSyBkBM8lro5E8Y0zDBd3FsdMzNyZPXXfobg
    ```
    * **Note on MONGODB_URI:** Ensure your current development IP address is **whitelisted** in your MongoDB Atlas Security settings.
    * **Note on NODEMAILER_PASS:** This **must** be a 16-character **App Password** generated from your Google Security page, not your primary Gmail password.

3.  **Start the Server:**
    ```bash
    node index.js
    ```
    The server will run on `http://localhost:5000`.

### 2. Frontend Setup (`client` folder)

1.  **Install Dependencies:** Navigate to the `client` directory and install the necessary packages.
    ```bash
    cd ../client
    npm install
    ```

2.  **Start the Client:**
    ```bash
    npm run dev
    ```
    The frontend application will typically open at `http://localhost:5173` (or similar port).

## 📂 Project Structure
