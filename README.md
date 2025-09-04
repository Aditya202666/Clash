⚡ Clash – Anonymous Voting & Feedback App
🧪 Test Account

You can try Clash instantly using the following test credentials:

Email: pigima9170@blaxion.com

Password: 123123123

Clash is a full-stack web application that allows users to upload two images, set an expiry date, and share a link to gather real-time, anonymous votes and comments.
It’s designed to help with A/B testing (e.g., thumbnails, designs, mockups) by collecting unbiased feedback.

🚀 Features

🗳️ Anonymous Feedback – Users can vote and comment without revealing identity

⚡ Real-Time Updates – Votes & comments update instantly with Socket.io

🔐 Authentication & Security

2FA with email verification

Forgot password flow

JWT-based authentication

Helmet & rate limiting for security

📩 Scalable Background Jobs – Redis + BullMQ handle:

Image uploads

Email notifications

Vote & comment processing

🖼 Image Upload & Storage – Cloudinary integration

🛠 Robust Infrastructure – PostgreSQL with Prisma ORM & Zod for schema validation

🛠 Tech Stack
Backend

Node.js, TypeScript, Express.js

PostgreSQL + Prisma ORM

Redis + BullMQ (job queues)

Zod (validation)

EJS (email templates)

Nodemailer (email delivery)

Cloudinary (image storage)

JWT (authentication)

Socket.io (real-time votes & comments)

Helmet, Rate Limiter (security)

Frontend

React.js, Next.js, TypeScript

ShadCN/UI, TailwindCSS

📸 How Clash Works

Upload two images and set an expiry date.

Share the generated link with others.

Collect votes and comments anonymously.

See results update in real-time.

💡 Key Learnings

Designing real-time event-driven systems with Socket.io

Implementing secure authentication flows with 2FA & JWT

Handling background jobs & queues efficiently with Redis + BullMQ

Structuring a production-grade full-stack TypeScript app

🔮 Future Improvements

📊 Detailed analytics for votes & comments

📱 Mobile-friendly PWA version

👥 Group voting sessions

🌐 Multi-language support

🧑‍💻 Author

Aditya Kumar

🌐 Portfolio

💻 GitHub

🔗 LinkedIn

📜 License

This project is licensed under the MIT License – feel free to use, modify, and share.

👉 If there’s interest, I’ll continue polishing and extending Clash further based on feedback.
