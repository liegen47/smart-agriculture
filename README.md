# NatureSense - Smart Agriculture Management System 🌾

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-000000?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0.1-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)

A modern full-stack application for agricultural management, AI analysis, and payment processing. Built with Next.js (TypeScript) frontend and Node.js/Express.js backend.

![System Overview](https://raw.githubusercontent.com/liegen47/smart-agriculture/main/docs/images/image.png)

## ✨ Features

### Frontend
- 🌓 Light/Dark mode toggle
- 📊 Interactive data visualization with Recharts
- 🔍 Command menu interface (CMDK)
- 📱 Responsive mobile-first design
- 🛒 Stripe payment integration
- 📝 Form validation with Zod & React Hook Form
- 🚀 Server-side rendering (SSR) with Next.js
- 🧩 Component library with Radix UI & Tailwind CSS

### Backend
- 🔐 JWT Authentication & Authorization
- 🧠 AI-powered crop health analysis
- 💳 Stripe payment processing with webhooks
- 📈 REST API with Swagger documentation
- 🗃️ MongoDB database management
- 📡 WebSocket support for real-time updates
- ⚙️ Role-based access control (Admin/Farmer)

### Admin Panel
- 👨‍💼 **User Management**: Approve/disapprove farmers, manage roles, and view user activity.
- 📊 **Analytics Dashboard**: Monitor system-wide metrics, including crop health, subscription status, and revenue.
- 💼 **Subscription Management**: View and manage user subscriptions, including upgrades, downgrades, and cancellations.
- 🔒 **Security Settings**: Configure system-wide security policies, including password requirements and session management.
- 📝 **Logs & Audits**: Access detailed logs for user actions, system events, and API requests.

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS + `tailwind-merge`
- Radix UI Primitives
- TanStack Table v8
- `react-hook-form` + Zod
- Stripe Elements
- Axios for API calls

**Backend:**
- Node.js 20 + Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Stripe Node SDK
- Swagger UI for API docs
- Date-fns for date handling

## 🚀 Getting Started

### Prerequisites

- Node.js ≥18.x
- MongoDB Atlas account
- Stripe account
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/liegen47/smart-agriculture.git
cd smart-agriculture
```

2. **Install dependencies:**
```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

3. **Environment Setup**

Create `.env` files with these variables:
or else check respective repos for .env.example file
**Backend (`backend/.env`):**
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/agriculture
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_51...
```

4. **Run the application:**
```bash
# Backend
cd backend && npm start

# Frontend (in new terminal)
cd frontend && npm run dev
```

Access the application at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- API Docs: `http://localhost:5000/api-docs`

## 💳 Stripe Integration

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Configure webhook in Stripe Dashboard:
   - Endpoint URL: `http://localhost:5000/api/payments/webhook`
   - Events: `checkout.session.completed`
3. Test using Stripe test cards:
   - Successful payment: `4242 4242 4242 4242`
   - Payment failure: `4000 0000 0000 0002`

## 📦 Deployment

### Backend (Node.js)
1. Deploy to [Render](https://render.com) or [Heroku](https://heroku.com)
2. Set production environment variables:
   ```env
   NODE_ENV=production
   MONGO_URI=your_production_mongo_uri
   ```
3. Configure CORS for frontend domain

### Frontend (Next.js)
1. Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
2. Set environment variables:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_live_stripe_key
   ```

## 📂 Project Structure

```
smart-agriculture/
├── frontend/
│   ├── app/               # Next.js app router
│   ├── components/        # Reusable UI components
│   ├── lib/               # API clients, configs
│   ├── styles/            # Global CSS & Tailwind
│   └── types/             # TypeScript definitions
│
└── backend/
    ├── config/            # DB & environment setup
    ├── controllers/       # Business logic
    ├── models/            # Mongoose schemas
    ├── routes/            # API endpoints
    ├── middleware/        # Auth & error handling
    └── utils/             # Helper functions
```

## 📄 API Documentation

[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger)](http://localhost:5000/api-docs)

Interactive API documentation available at `/api-docs` endpoint. Includes:
- Authentication endpoints
- CRUD operations for field management
- Payment processing routes
- AI analysis endpoints

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

**Vansh Kapoor**  
- Email: [vanshkapoor418@gmail.com](mailto:vanshkapoor418@gmail.com)
- GitHub: [@liegen47](https://github.com/liegen47)
- LinkedIn: [vanshkapoor418](https://linkedin.com/in/vanshkapoor418)

---

### **Admin Panel Features**

#### **User Management**
- **Approve/Disapprove Farmers**: Admins can approve or disapprove farmer accounts.
- **Role Management**: Assign roles (Admin, Farmer) to users.
- **Activity Tracking**: View user login history and activity logs.

#### **Analytics Dashboard**
- **System Metrics**: Monitor total users, active subscriptions, and revenue.
- **Crop Health**: View AI-generated crop health reports.
- **Subscription Trends**: Track subscription growth and churn rates.

#### **Subscription Management**
- **View Subscriptions**: List all active, inactive, and trialing subscriptions.
- **Modify Plans**: Upgrade or downgrade user subscription plans.
- **Cancel Subscriptions**: Cancel subscriptions on behalf of users.

#### **Security Settings**
- **Password Policies**: Configure password complexity requirements.
- **Session Management**: Set session timeout and logout policies.
- **Audit Logs**: Track changes made by admins and users.

#### **Logs & Audits**
- **User Actions**: Log all user actions, including login attempts and profile updates.
- **System Events**: Track system events, such as API requests and errors.
- **Audit Trails**: Maintain a detailed audit trail for compliance and troubleshooting.

---

### **Admin Panel Screenshots**

#### **User Management**
![User Management](https://raw.githubusercontent.com/liegen47/smart-agriculture/main/docs/images/admin-user-management.png)

#### **Analytics Dashboard**
![Analytics Dashboard](https://raw.githubusercontent.com/liegen47/smart-agriculture/main/docs/images/admin-analytics.png)

#### **Subscription Management**
![Subscription Management](https://raw.githubusercontent.com/liegen47/smart-agriculture/main/docs/images/admin-subscriptions.png)

---
