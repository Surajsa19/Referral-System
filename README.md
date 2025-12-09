# FileSure - Referral & Credit System

A full-stack referral system built with **Next.js**, **Express**, **TypeScript**, and **MongoDB**.
Designed to simulate a digital product platform where users earn credits for referring friends.

## Features
- **User Authentication**: Secure Login/Register with JWT.
- **Referral System**: Unique referral links, tracking of referred users.
- **Purchase Simulation**: Simulates product purchase to trigger credit rewards.
- **Credit Logic**:
    - **Referred User**: Earns 2 credits on first purchase.
    - **Referrer**: Earns 2 credits when their referral makes a first purchase.
    - **Dashboard**: Real-time stats (Referrals, Conversions, Credits).

## Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Zustand, Lucide React.
- **Backend**: Node.js, Express, TypeScript, Mongoose.
- **Database**: MongoDB.

## Prerequisities
- Node.js (v18+)
- MongoDB (Running locally on default port 27017 or update `.env`)

## Setup & Run



1.  **Install Dependencies** (Root, Client, Server)
    ```bash
    npm install
    cd client && npm install
    cd ../server && npm install
    ```
    *(Note: Root `npm install` installs `concurrently`)*

2.  **Environment Variables**
    The server comes with a default `.env` file for local development:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/referral-system
    JWT_SECRET=supersecretkey123
    ```
    Modify `server/.env` if needed.

3.  **Run Application**
    From the root directory (`referral-system`):
    ```bash
    npm run dev
    ```
    This will start both:
    - **Frontend**: http://localhost:3000
    - **Backend**: http://localhost:5000

## Architecture
- `client/`: Next.js App Router application.
    - `store/`: Zustand global state (Auth).
    - `components/`: Reusable UI components.
- `server/`: Express REST API.
    - `models/`: Mongoose schemas.
    - `controllers/`: Business logic.
    - `routes/`: API route definitions.

## API Documentation
- `POST /api/auth/register`: Register user.
- `POST /api/auth/login`: Login user.
- `GET /api/auth/me`: Get current user info.
- `GET /api/referrals/stats`: Get dashboard stats.
- `POST /api/purchase`: Simulate purchase.

## Testing the Flow
1.  **Register User A** (No referral code).
2.  **Copy Link** from User A's dashboard.
3.  **Open Incognito Window** (or logout) and paste link.
4.  **Register User B** (Referral code should be auto-filled).
5.  **User B Dashboard**: 0 Credits.
6.  **Go to Purchase** page as User B and click "Buy".
7.  **Check User B Dashboard**: 2 Credits!
8.  **Check User A Dashboard**: 1 Converted, +2 Credits!
