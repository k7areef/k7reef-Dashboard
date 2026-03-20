# My-Dashboard | Full-Stack Portfolio CMS

A comprehensive personal dashboard built to manage portfolio content, services, and projects dynamically. This project focuses on clean architecture, state management, and seamless integration with cloud services.

## 🚀 Tech Stack

- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Backend/Database:** Supabase
- **Deployment:** Vercel

## ✨ Features

- **Dynamic Project Management:** Add, edit, and delete portfolio projects.
- **Service Control:** Manage professional services offered via a dedicated dashboard.
- **Authentication:** Secure login system using Supabase Auth.
- **Responsive Design:** Fully optimized for all screen sizes.
- **Clean Code:** Implementation of Atomic Design and Conventional Commits.

## 🛠️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/your-username/my-dashboard.git](https://github.com/your-username/my-dashboard.git)

   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file and add your Supabase credentials:

   ```bash
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

`src/components`: Reusable UI and layout components.

`src/contexts`: Global state management for Auth and Features.

`src/pages`: Main application views.

`src/services`: API logic and Supabase integration.
