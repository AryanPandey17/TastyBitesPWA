# 🍔 Tasty Bites - PWA Meal Ordering App

## 🔗 Live Demo (Vercel Deployment)

Check out the live version of the Tasty Bites PWA here:

👉 https://tasty-bites-pwa.vercel.app/

You can open this link on both desktop and mobile to experience the Progressive Web App (PWA) features.  
On supported browsers (Chrome/Edge), you can also install it using the **Install icon** in the address bar or the browser menu.


![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-Vite%20%7C%20React%20%7C%20TypeScript-blue)
![PWA](https://img.shields.io/badge/PWA-Offline%20Ready-orange)

**Tasty Bites** is a lightweight, offline-capable Progressive Web App (PWA) designed for fast-food meal ordering. This project demonstrates how to build a modern web application that functions like a native mobile app, complete with a CRUD-based shopping cart system.

## 🚀 Features

### PWA Capabilities
* **Offline Support:** Browse the menu and view the cart even without an internet connection (cached via Service Workers).
* **Installable:** Can be installed to the home screen on iOS and Android devices.
* **App-like Feel:** Runs in standalone mode without browser UI bars.

### Shopping Cart CRUD Operations
This app demonstrates client-side state management through CRUD:
* **Create:** Add new items from the menu to the shopping cart.
* **Read:** View current cart contents, prices, and live total calculations.
* **Update:** Increase or decrease item quantities dynamically.
* **Delete:** Remove items from the cart or clear the cart upon checkout.
* **Persistence:** Data is saved to `localStorage`, so the cart survives page reloads.

## 🛠️ Tech Stack

* **Build Tool:** [Vite](https://vitejs.dev/) (Fast & Lightweight)
* **Framework:** React 18
* **Language:** TypeScript (TSX)
* **Styling:** Tailwind CSS
* **PWA Plugin:** `vite-plugin-pwa` (Auto-generates Service Worker & Manifest)
* **Icons:** Lucide React

## ⚙️ Installation & Running the App

1. Clone the repository or download the ZIP
2. Open terminal in the project folder
3. Install dependencies:

```bash
npm install
```

4. Run the project:

```bash
npm run dev
```

5. Open in browser:

```
http://localhost:5173
```
