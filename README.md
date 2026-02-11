# ☕ Get Me A Chai - Modern Crowdfunding Platform

**Get Me A Chai** ek Next.js based platform hai jo creators ko unke fans se directly support (Chai/Donations) lene mein madad karta hai. Isme smooth animations, secure payments, aur ek powerful creator dashboard hai.



---

## 🌟 Key Features

* **Premium UI/UX:** Tailwind CSS aur Framer Motion ka use karke buttery smooth animations aur dark-themed design banaya gaya hai.
* **Buttery Scrolling:** Lenis Scroll integration ke saath ek premium browsing experience milta hai.
* **Creator Dashboard:** Creators apni profile edit kar sakte hain aur apni Razorpay details manage kar sakte hain.
* **Secure Payments:** Razorpay integration ke saath 100% secure INR payments support karta hai.
* **Personalized Profiles:** Har user ki apni ek unique public profile hoti hai jahan supporters unhe message ke saath donate kar sakte hain.
* **Supporter History:** Har profile par top 5 recent supporters ki list dikhti hai.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Scrolling** | Lenis Scroll |
| **Database** | MongoDB with Mongoose |
| **Auth** | NextAuth.js (Google/GitHub) |
| **Payments** | Razorpay SDK |
| **Forms** | React Hook Form |

---

## 🚀 Quick Setup

1.  **Repo Clone Karein:**
    ```bash
    git clone [https://github.com/your-username/GetMeAChai-Crowdfunding-Platform.git](https://github.com/your-username/GetMeAChai-Crowdfunding-Platform.git)
    cd GetMeAChai-Crowdfunding-Platform
    ```

2.  **Dependencies Install Karein:**
    ```bash
    npm install
    ```

3.  **Environment Variables (.env.local):**
    ```env
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_secret
    MONGODB_URI=your_mongodb_url
    GITHUB_ID=your_id
    GITHUB_SECRET=your_secret
    NEXT_PUBLIC_KEY_ID=your_razorpay_key
    KEY_SECRET=your_razorpay_secret
    ```

4.  **Project Start Karein:**
    ```bash
    npm run dev
    ```

---

## 📸 Project Structure

* `/app`: Saare pages aur routing (Dashboard, Profile, API).
* `/components`: Reusable UI elements jaise PaymentPage, Navbar, etc.
* `/models`: MongoDB schemas (User, Payment).
* `/actions`: Server actions database handle karne ke liye.

---

## 🤝 Contributing
Agar aapko koi bug milta hai ya koi naya feature suggest karna chahte hain, toh be-jhijhak Issue open karein ya Pull Request bhejein!

---

**Developed with ❤️ by [Piyush Vala](https://github.com/PiyushVala2028)**