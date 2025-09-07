# ⚡ Clash – Anonymous Voting & Feedback App  

## 🧪 Test Account  
You can try Clash instantly using the following test credentials:  

- **Email:** `pigima9170@blaxion.com`  
- **Password:** `123123123`  

---

Clash is a full-stack web application that allows users to **upload two images, set an expiry date, and share a link** to gather **real-time, anonymous votes and comments**.  
It’s designed to help with **A/B testing** (e.g., thumbnails, designs, mockups) by collecting unbiased feedback.  

---

## 🚀 Features  
- 🗳️ **Anonymous Feedback** – Users can vote and comment without revealing identity  
- ⚡ **Real-Time Updates** – Votes & comments update instantly with Socket.io  
- 🔐 **Authentication & Security**  
  - NextAuth.js for seamless authentication  
  - 2FA with email verification  
  - Forgot password flow  
  - JWT-based authentication  
  - Helmet & rate limiting for security  
- 📩 **Scalable Background Jobs** – Redis + BullMQ handle:  
  - Image uploads  
  - Email notifications  
  - Vote & comment processing  
- 🖼 **Image Upload & Storage** – Cloudinary integration  
- 🛠 **Robust Infrastructure** – PostgreSQL with Prisma ORM & Zod for schema validation  

---

## 🛠 Tech Stack  

### Backend  
- **Node.js**, **TypeScript**, **Express.js**  
- **PostgreSQL** + **Prisma ORM**  
- **Redis** + **BullMQ** (job queues)  
- **Zod** (validation)  
- **EJS** (email templates)  
- **Nodemailer** (email delivery)  
- **Cloudinary** (image storage)  
- **JWT** (authentication)  
- **Socket.io** (real-time votes & comments)  
- **Helmet**, **Rate Limiter** (security)  

### Frontend  
- **React.js**, **Next.js**, **TypeScript**  
- **NextAuth.js** (authentication)  
- **ShadCN/UI**, **TailwindCSS**  

---

## 📸 How Clash Works  
1. Upload two images and set an expiry date.  
2. Share the generated link with others.  
3. Collect **votes and comments anonymously**.  
4. See results update in **real-time**.  

---

## 💡 Key Learnings  
- Designing **real-time event-driven systems** with Socket.io  
- Implementing **secure authentication flows** with NextAuth.js & 2FA  
- Handling **background jobs & queues** efficiently with Redis + BullMQ  
- Structuring a **production-grade full-stack TypeScript app**  

---

## 🔮 Future Improvements  
- 📊 Detailed analytics for votes & comments  
- 📱 Mobile-friendly PWA version  
- 👥 Group voting sessions  
- 🌐 Multi-language support  

---

## 🧑‍💻 Author  
**Aditya Kumar**  
- 🌐 [Portfolio](https://portfolio-rq9c.onrender.com/)  
- 💻 [GitHub](https://github.com/Aditya202666)  
- 🔗 [LinkedIn](https://www.linkedin.com/in/aditya-kumar-614007361/)  

---

## 📜 License  
This project is licensed under the **MIT License** – feel free to use, modify, and share.  

---

👉 *If there’s interest, I’ll continue polishing and extending Clash further based on feedback.*  
