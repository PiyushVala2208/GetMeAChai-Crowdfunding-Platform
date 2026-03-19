# ☕ Get Me A Chai – Modern Crowdfunding Platform 

**Get Me A Chai** is a modern **Next.js-based crowdfunding platform** that enables creators to receive direct support (Chai/Donations) from their fans. The platform features smooth animations, secure payment integration, and a powerful creator dashboard for managing profiles and contributions.

---

## 🌟 Key Features

### ✨ Premium UI/UX
Built with **Tailwind CSS** and **Framer Motion**, delivering a modern dark-themed design with smooth and engaging animations.

### ⚡ Smooth Scrolling Experience
Integrated with **Lenis Scroll** to provide a seamless and premium browsing experience.

### 🧑‍💻 Creator Dashboard
Creators can manage and update their profile information as well as configure their **Razorpay payment details** directly from the dashboard.

### 🔐 Secure Payments
Supports **100% secure INR transactions** using the **Razorpay Payment Gateway**.

### 👤 Personalized Creator Profiles
Each user has a **unique public profile page** where supporters can contribute donations along with a personalized message.

### 🏆 Supporter History
Every profile displays the **top 5 recent supporters**, making it easy to recognize contributors.

---

## 🛠️ Tech Stack

| Category | Technology |
|--------|-------------|
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Scrolling** | Lenis Scroll |
| **Database** | MongoDB with Mongoose |
| **Authentication** | NextAuth.js (Google / GitHub OAuth) |
| **Payments** | Razorpay SDK |
| **Forms** | React Hook Form |

---

## 🚀 Quick Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/GetMeAChai-Crowdfunding-Platform.git
cd GetMeAChai-Crowdfunding-Platform
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

MONGODB_URI=your_mongodb_connection_string

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

NEXT_PUBLIC_KEY_ID=your_razorpay_key
KEY_SECRET=your_razorpay_secret
```

### 4️⃣ Start the Development Server

```bash
npm run dev
```

The project will run locally at:

```
http://localhost:3000
```

---

## 📂 Project Structure

```
/app        → Application routes, pages, and API handlers
/components → Reusable UI components (Navbar, PaymentPage, etc.)
/models     → MongoDB schemas (User, Payment)
/actions    → Server actions for database operations
```

---

## 🤝 Contributing

Contributions are welcome!

If you find a bug or want to suggest a new feature:

1. Open an **Issue**
2. Submit a **Pull Request**

Your contributions help improve the project for everyone...

---

## 👨‍💻 Author

Developed with ❤️ by  
**Piyush Vala**

---
