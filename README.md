# 🩺 **Doc-Dex Client**

> **Doc-Dex** is a modern, comprehensive Telemedicine platform built to streamline the interaction between doctors, patients, and administrators. It features role-based dashboards, appointment scheduling, and secure authentication.

---

## 🚀 **Tech Stack**

The project leverages the latest web technologies for a robust and scalable frontend.

### **Core Framework**
![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)

### **Styling & UI**
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css)
![Shadcn/UI](https://img.shields.io/badge/Shadcn%2FUI-Radix-black?style=flat&logo=radix-ui)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-purple?style=flat&logo=framer)
![Lucide Icons](https://img.shields.io/badge/Lucide-Icons-orange?style=flat)

### **State & Logic**
![Zod](https://img.shields.io/badge/Zod-Validation-blue?style=flat&logo=zod)
![Date-fns](https://img.shields.io/badge/Date--fns-Time_Manipulation-purple?style=flat)
![Recharts](https://img.shields.io/badge/Recharts-Data_Viz-red?style=flat)

---

## 🌟 **Key Features**

### **🔐 Authentication & Security**
- **Secure Login/Signup**: Role-based authentication (Admin, Doctor, Patient).
- **JWT Handling**: Secure token management with HttpOnly cookies.
- **Protection**: Protected routes using Next.js Middleware.

### **🏥 Doctors**
- **Dashboard**: Overview of upcoming appointments and statistics.
- **Schedule Management**: Create and manage availability slots.
- **Consultations**: manage patient interactions.

### **👤 Patients**
- **Easy Booking**: Browse doctors, view profiles, and book appointments.
- **Dashboard**: Track upcoming and past appointments.
- **Payment Integration**: Secure payment processing for appointments.

### **🛡️ Admins**
- **User Management**: Manage doctors, patients, and other admins.
- **Master Schedule**: Create global scheduling parameters.
- **Analytics**: View platform-wide statistics and charts.

---

## 📂 **Project Structure**

```bash
src/
├── app/                    # Next.js App Router (Pages & Layouts)
│   ├── (commonLayout)/     # Public pages (Landing, Login, Register)
│   ├── (dashboardLayout)/  # Protected Dashboards (Admin, Doctor, Patient)
│   └── layout.tsx          # Root Layout
├── components/             # Reusable UI Components
│   ├── ui/                 # Shadcn/Radix Primitives
│   └── modules/            # Feature-specific components (Admin, Doctor, etc.)
├── services/               # API Integration Services (Auth, Doctor, Schedule)
├── lib/                    # Utilities (Server Fetch, Zod Validators)
├── types/                  # TypeScript Interfaces
└── zod/                    # Zod Validation Schemas
```

---

## 🛠️ **Installation Guide**

Follow these steps to set up the project locally.

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/doc-dex-client.git
cd doc-dex-client
```

### **2. Install Dependencies**
```bash
npm install
# or
yarn install
```

### **3. Environment Setup**
Create a `.env` file in the root directory and add the following variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1  # Example Backend URL
```

### **4. Run Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## 📦 **Workflow**

1.  **Landing Page**: Users arrive at the landing page to explore services.
2.  **Authentication**: Users sign up or log in.
    *   *Doctors* need approval or verification (depending on backend config).
3.  **Dashboard Access**:
    *   **Patient** navigates to `Dashboard` -> `Book Appointment`.
    *   **Doctor** navigates to `Dashboard` -> `My Schedules` to set availability.
    *   **Admin** oversees the platform and manages master data.

---

## 🤝 **Contributing**

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.
