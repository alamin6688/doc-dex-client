<h1 align="center">🩺 Doc Dex</h1>

<p align="center">
  <b>A modern, full‑featured Telemedicine Platform for Doctors & Patients</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1-black?style=flat&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-blue?style=flat&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Shadcn%2FUI-Radix-black?style=flat&logo=radix-ui" />
</p>

---

<h2>📌 About the Project</h2>

<p>
<b>Doc Dex</b> is a comprehensive Telemedicine platform designed to streamline interactions between doctors, patients, and administrators. It provides role‑based dashboards, appointment scheduling, secure authentication, and analytics — all built with a modern, scalable frontend stack.
</p>

---

<h2>🔗 Live & Repositories</h2>

<ul>
  <li><b>Live App:</b> <a href="https://doc-dex-client.vercel.app" target="_blank">https://doc-dex-client.vercel.app</a></li>
  <li><b>Backend API:</b> <a href="https://doc-dex-server-production.up.railway.app/api/v1" target="_blank">https://doc-dex-server-production.up.railway.app/api/v1</a></li>
  <li><b>Backend Source Code:</b> <a href="https://github.com/alamin6688/doc-dex-server.git" target="_blank">https://github.com/alamin6688/doc-dex-server.git</a></li>
</ul>

---

<h2>🚀 Tech Stack</h2>

<h3>Core Framework</h3>
<p>
  <img src="https://img.shields.io/badge/Next.js-16.1-black?style=flat&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-blue?style=flat&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript" />
</p>

<h3>Styling & UI</h3>
<p>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Shadcn%2FUI-Radix-black?style=flat&logo=radix-ui" />
  <img src="https://img.shields.io/badge/Framer_Motion-Animation-purple?style=flat&logo=framer" />
  <img src="https://img.shields.io/badge/Lucide-Icons-orange?style=flat" />
</p>

<h3>State & Logic</h3>
<p>
  <img src="https://img.shields.io/badge/Zod-Validation-blue?style=flat&logo=zod" />
  <img src="https://img.shields.io/badge/Date--fns-Time_Manipulation-purple?style=flat" />
  <img src="https://img.shields.io/badge/Recharts-Data_Viz-red?style=flat" />
</p>

---

<h2>🌟 Key Features</h2>

<h3>🤖 AI-Powered Features</h3>
<ul>
  <li><b>Smart Symptom Matching:</b> Patients can enter symptoms and receive intelligent suggestions for relevant medical specialties.</li>
  <li><b>Best Doctor Recommendation:</b> AI recommends the most suitable doctors based on symptoms, specialization, availability, and past performance.</li>
  <li><b>Faster Appointment Decisions:</b> Reduces booking time by guiding patients directly to the right expert.</li>
</ul>

<h3>🔐 Authentication & Security</h3>
<ul>
  <li>Role‑based authentication (Admin, Doctor, Patient)</li>
  <li>JWT with HttpOnly cookies</li>
  <li>Protected routes using Next.js Middleware</li>
</ul>

<h3>🏥 Doctors</h3>
<ul>
  <li>Dashboard with appointment overview</li>
  <li>Schedule & availability management</li>
  <li>Patient consultation tools</li>
</ul>

<h3>👤 Patients</h3>
<ul>
  <li>Browse doctors & book appointments</li>
  <li>Track upcoming and past visits</li>
  <li>Secure payment integration</li>
</ul>

<h3>🛡️ Admins</h3>
<ul>
  <li>User & role management</li>
  <li>Global scheduling control</li>
  <li>Analytics & charts</li>
</ul>

---

<h2>📂 Project Structure</h2>

<pre><code>src/
├── app/                    # Next.js App Router (Pages & Layouts)
│   ├── (commonLayout)/     # Public pages (Landing, Login, Register)
│   ├── (dashboardLayout)/  # Protected Dashboards (Admin, Doctor, Patient)
│   └── layout.tsx          # Root Layout
├── components/             # Reusable UI Components
│   ├── ui/                 # Shadcn/Radix Primitives
│   └── modules/            # Feature-specific components
├── services/               # API Integration Services
├── lib/                    # Utilities & Validators
├── types/                  # TypeScript Interfaces
└── zod/                    # Zod Schemas
</code></pre>

---

<h2>🛠️ Installation Guide</h2>

<h3>1️⃣ Clone the Repository</h3>
<pre><code>git clone https://github.com/your-username/doc-dex-client.git
cd doc-dex-client
</code></pre>

<h3>2️⃣ Install Dependencies</h3>
<pre><code>npm install
# or
yarn install
</code></pre>

<h3>3️⃣ Environment Setup</h3>
<p>Create a <b>.env</b> file in the root directory:</p>
<pre><code>NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
</code></pre>

<h3>4️⃣ Run Development Server</h3>
<pre><code>npm run dev
</code></pre>

<p>The app will be running at:</p>
<pre><code>http://localhost:3000</code></pre>

---

<h2>📦 Workflow</h2>
<ol>
  <li>Users visit the landing page</li>
  <li>Authentication (Signup / Login)</li>
  <li>Dashboard access based on role</li>
  <li>Appointments, schedules, payments, and analytics</li>
</ol>

---

<h2>🧪 Test Credentials</h2>

<h3>Admin</h3>
<ul>
  <li><b>Email:</b> admin04@gmail.com</li>
  <li><b>Password:</b> admin7890</li>
</ul>

<h3>Patient</h3>
<ul>
  <li><b>Email:</b> alamin.dpi06@gmail.com</li>
  <li><b>Password:</b> patient123</li>
</ul>

<h3>Doctor</h3>
<ul>
  <li><b>Email:</b> nahidul@gmail.com</li>
  <li><b>Password:</b> doctor7890</li>
</ul>

---

<h2>📜 License</h2>
<p>
This project is licensed under the MIT License.
</p>

<p align="center">🚀 Built with passion for modern healthcare systems</p>
