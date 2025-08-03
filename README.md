# 🏥 NirogGyan Healthcare Appointment Booking System

> A modern, full-stack healthcare appointment booking application designed to streamline the process of finding and booking appointments with healthcare professionals.

![Healthcare App](https://img.shields.io/badge/Healthcare-App-blue)
![React](https://img.shields.io/badge/React-18+-blue)
![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Development](#development)
- [Contributing](#contributing)

## 🎯 Overview

NirogGyan is a comprehensive healthcare appointment booking system that connects patients with healthcare professionals. The application provides an intuitive interface for browsing doctors, viewing their profiles, checking availability, and booking appointments seamlessly.

## ✨ Features

### 🔍 **Doctor Discovery**
- Browse through a comprehensive list of healthcare professionals
- Advanced search functionality by name, specialization, or location
- Filter doctors by availability status
- Grid and list view options for better user experience

### 👨‍⚕️ **Doctor Profiles**
- Detailed doctor information including specialization, experience, and qualifications
- Real-time availability status (Available/Busy)
- Professional ratings and reviews
- Contact information and consultation fees

### 📅 **Appointment Management**
- Easy-to-use appointment booking form
- Date and time slot selection
- Patient information collection
- Appointment confirmation system
- View all scheduled appointments

### 📱 **Responsive Design**
- Mobile-first responsive design
- Cross-platform compatibility
- Modern and intuitive user interface
- Optimized for all screen sizes

## 🛠 Technology Stack

### **Frontend**
- **React.js 19+** - Modern React with hooks and functional components
- **Vite** - Fast development build tool
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Context** - State management
- **Modern JavaScript** - ES6+ features, async/await

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **SQLite** - Lightweight relational database
- **CORS** - Cross-origin resource sharing
- **RESTful API** - Clean API architecture

## 📁 Project Structure

```
NirogGyan Assignment/
├── 📁 frontend/                    # React.js Frontend Application
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 components/          # Reusable UI Components
│   │   │   ├── DoctorCard.jsx      # Doctor grid view card
│   │   │   ├── DoctorListCard.jsx  # Doctor list view card
│   │   │   ├── Navbar.jsx          # Navigation component
│   │   │   ├── Footer.jsx          # Footer component
│   │   │   ├── SearchBar.jsx       # Search functionality
│   │   │   ├── LoadingSpinner.jsx  # Loading states
│   │   │   ├── ErrorMessage.jsx    # Error handling
│   │   │   └── Toast.jsx           # Notification system
│   │   ├── 📁 pages/              # Page Components
│   │   │   ├── HomePage.jsx        # Landing page
│   │   │   ├── DoctorProfile.jsx   # Doctor details page
│   │   │   ├── BookAppointment.jsx # Booking form page
│   │   │   └── Appointments.jsx    # Appointments list
│   │   ├── 📁 context/            # State Management
│   │   │   └── AppContext.jsx      # Global app state
│   │   ├── 📁 assets/             # Static Assets
│   │   ├── App.jsx                # Main app component
│   │   └── main.jsx               # React entry point
│   ├── package.json
│   └── vite.config.js
├── 📁 backend/                     # Node.js Backend API
│   ├── server.js                  # Express server setup
│   ├── database.db                # SQLite database
│   └── package.json
├── 📁 .github/                    # GitHub Configuration
│   └── copilot-instructions.md    # AI assistant instructions
├── 📁 .vscode/                    # VS Code Configuration
│   └── tasks.json                 # Development tasks
├── package.json                   # Root package coordination
├── .gitignore                     # Git ignore rules
└── README.md                      # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "NirogGyan Assignment"
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Access the application**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:3000

The application will automatically open in your default browser. Both frontend and backend servers will run concurrently.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start both frontend and backend servers |
| `npm run start:all` | Alias for npm start |
| `npm run frontend` | Start only the frontend development server |
| `npm run backend` | Start only the backend API server |
| `npm run build` | Build the frontend for production |
| `npm run install:all` | Install dependencies for all packages |
| `npm run dev` | Development mode (same as start) |

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 👨‍⚕️ Doctors
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/doctors` | Get all doctors | `?search=query` (optional) |
| `GET` | `/doctors/:id` | Get specific doctor details | `id` (required) |

#### 📅 Appointments
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/appointments` | Book new appointment | See example below |
| `GET` | `/appointments` | Get all appointments | - |
| `GET` | `/doctors/:id/appointments` | Get doctor's appointments | - |

#### Example API Calls

**Get all doctors:**
```javascript
fetch('http://localhost:3000/api/doctors')
```

**Search doctors:**
```javascript
fetch('http://localhost:3000/api/doctors?search=cardio')
```

**Book appointment:**
```javascript
fetch('http://localhost:3000/api/appointments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    doctorId: 1,
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    patientPhone: '+1234567890',
    appointmentDate: '2025-08-10',
    appointmentTime: '10:00',
    reason: 'Regular checkup'
  })
})
```

## 🖼 Screenshots

### 🏠 Landing Page
- Hero section with search functionality
- Doctor grid/list view with toggle
- Real-time availability status

### 👨‍⚕️ Doctor Profile
- Comprehensive doctor information
- Availability calendar
- Direct booking button

### 📅 Appointment Booking
- Step-by-step booking process
- Form validation
- Confirmation system

## 🔧 Development

### Development Workflow

1. **Frontend Development**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Backend Development**
   ```bash
   cd backend
   npm run dev
   ```

3. **Full Stack Development**
   ```bash
   npm run start:all
   ```

### Code Style & Standards
- **ESLint** configured for code linting
- **Modern JavaScript** features (ES6+, async/await)
- **Component-based architecture** with React
- **RESTful API** design principles
- **Responsive design** with Tailwind CSS

### Database Schema

The SQLite database includes:
- **Doctors table**: Complete doctor profiles with specializations
- **Appointments table**: Booking information and scheduling
- **Pre-loaded data**: 40 sample doctors for testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ for better healthcare accessibility</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
