# 🏥 NirogGyan - Healthcare Appointment Booking System

A modern, full-stack healthcare appointment booking application that connects patients with healthcare professionals. Built with React.js and Node.js, featuring a clean, responsive design and intuitive user experience.

## 🚀 Features

### 🎯 Core Functionality
- **Doctor Discovery**: Browse and search through 40+ verified healthcare professionals
- **Smart Search**: Real-time search by doctor name, specialization, or location
- **Appointment Booking**: Easy-to-use booking system with form validation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Doctor Profiles**: Detailed information including experience, ratings, and specializations

### 🎨 User Experience
- **Dual View Modes**: Toggle between grid and list views (desktop only)
- **Interactive Cards**: Hover animations and visual feedback
- **Status Indicators**: Real-time availability status for doctors
- **Toast Notifications**: User-friendly feedback for actions
- **Clean UI**: Modern healthcare-focused design with consistent color scheme

### 📱 Responsive Behavior
- **Mobile/Tablet (xs, sm, md)**: Grid view only with responsive columns
- **Desktop (lg, xl)**: Full feature set with view toggle and enhanced layouts

## 🛠️ Tech Stack

### Frontend
- **React.js 19.1.0** - Modern React with hooks and context
- **Vite 7.0.4** - Fast development and build tool
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React Router 7.7.1** - Client-side routing
- **React Context API** - State management

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **SQLite** - Lightweight database
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-restart

## 📁 Project Structure

```
NirogGyan Assignment/
├── 📁 backend/
│   ├── server.js           # Express server with API routes
│   ├── database.db         # SQLite database with 40 doctors
│   └── package.json        # Backend dependencies
├── 📁 src/
│   ├── 📁 components/
│   │   ├── DoctorCard.jsx          # Grid view doctor card
│   │   ├── DoctorListCard.jsx      # List view doctor card
│   │   ├── SearchBar.jsx           # Search functionality
│   │   ├── ViewToggle.jsx          # Grid/List view switcher
│   │   ├── LoadingSpinner.jsx      # Loading animation
│   │   ├── ErrorMessage.jsx        # Error display
│   │   ├── Toast.jsx               # Notification component
│   │   ├── Navbar.jsx              # Navigation header
│   │   └── Footer.jsx              # Footer component
│   ├── 📁 pages/
│   │   ├── HomePage.jsx            # Main landing page
│   │   ├── DoctorProfile.jsx       # Doctor details page
│   │   ├── BookAppointment.jsx     # Booking form page
│   │   └── Appointments.jsx        # Appointments list page
│   ├── 📁 context/
│   │   └── AppContext.jsx          # Global state management
│   ├── 📁 assets/
│   │   └── niroggyan logo.png      # App logo
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # App entry point
│   └── index.css                   # Global styles & animations
├── package.json                    # Frontend dependencies
├── vite.config.js                  # Vite configuration
├── eslint.config.js                # ESLint configuration
└── README.md                       # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git** (optional)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "NirogGyan Assignment"
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 3. Database Setup
The SQLite database is automatically initialized with 40 sample doctors when you first run the backend server.

### 4. Start the Application

#### Option 1: Start Both Frontend & Backend Together (Recommended)
```bash
npm run start:all
```

#### Option 2: Start Separately
```bash
# Terminal 1 - Backend Server
npm run server

# Terminal 2 - Frontend Development Server
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 📚 API Endpoints

### Doctors
- `GET /api/doctors` - Get all doctors (with optional search)
- `GET /api/doctors/:id` - Get specific doctor details
- `GET /api/doctors/:id/appointments` - Get doctor's appointments

### Appointments
- `POST /api/appointments` - Book new appointment
- `GET /api/appointments` - Get all appointments

### Search
- `GET /api/doctors?search=<query>` - Search doctors by name/specialization

## 🎨 Design Features

### Color Scheme
- **Primary**: `#2B7A78` (Dark teal)
- **Secondary**: `#3AAFA9` (Light teal)
- **Success**: `#28C76F` (Green)
- **Error**: `#FF6B6B` (Red)
- **Text**: `#17252A` (Dark gray)

### Animations
- **Fade In Scale**: Entry animations for sections
- **Slide In**: Directional animations for elements
- **Hover Scale**: Interactive button feedback
- **Smooth Transitions**: 300ms duration for all interactions

### Responsive Breakpoints
- **xs**: < 640px (1 column)
- **sm**: 640px+ (2 columns)
- **md**: 768px+ (3 columns)
- **lg**: 1024px+ (3 columns + view toggle)
- **xl**: 1280px+ (4 columns + view toggle)

## 🚀 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm run dev          # Start with nodemon (auto-restart)
npm start            # Start production server
```

### Combined
```bash
npm run start:all    # Start both frontend and backend
npm run server       # Start only backend
```

## 🗄️ Database Schema

### Doctors Table
```sql
CREATE TABLE doctors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  profile_image TEXT,
  availability_status TEXT DEFAULT 'available',
  experience_years INTEGER,
  rating REAL DEFAULT 4.5,
  consultation_fee INTEGER,
  location TEXT,
  about TEXT
);
```

### Appointments Table
```sql
CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  doctor_id INTEGER,
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  appointment_date TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(doctor_id) REFERENCES doctors(id)
);
```

## 🔍 Key Components

### HomePage.jsx
- Responsive hero sections with different backgrounds for mobile/desktop
- Dual rendering system for grid/list views
- Real-time search integration
- Doctor count display and view toggles

### DoctorCard.jsx (Grid View)
- Compact card design with doctor avatar
- Status indicators and rating display
- Hover animations and action buttons
- Responsive image handling with fallbacks

### DoctorListCard.jsx (List View)
- Horizontal layout optimized for desktop
- Detailed information in organized rows
- Interactive buttons with scale animations
- Toast notifications for busy doctors

### AppContext.jsx
- Centralized state management
- API integration with error handling
- Loading states and data persistence
- Search functionality

## 🎯 User Flow

1. **Landing Page**: Users see hero section with search and featured doctors
2. **Browse Doctors**: View all 40 doctors in grid or list format
3. **Search**: Real-time search by name, specialization, or keywords
4. **Doctor Profile**: Click to view detailed doctor information
5. **Book Appointment**: Fill form with patient details and preferred time
6. **Confirmation**: Receive booking confirmation and appointment details

## 🚨 Error Handling

- **API Errors**: Displayed with ErrorMessage component
- **Network Issues**: Retry mechanisms and user feedback
- **Form Validation**: Real-time validation with clear error messages
- **Image Loading**: Fallback to initials if profile images fail
- **Busy Doctors**: Toast notifications for unavailable bookings

## 🔧 Development Features

- **Hot Reload**: Instant updates during development
- **ESLint**: Code quality and consistency checks
- **Concurrent Execution**: Run frontend and backend simultaneously
- **Auto-restart**: Backend automatically restarts on code changes
- **Error Boundaries**: Graceful error handling in React

## 🎨 Custom Animations

```css
/* Fade in with scale */
@keyframes fade-in-scale {
  0% { opacity: 0; transform: scale(0.95) translateY(10px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

/* Slide in from left */
@keyframes slide-in-left {
  0% { opacity: 0; transform: translateX(-30px); }
  100% { opacity: 1; transform: translateX(0); }
}

/* Hover scale effect */
.hover:scale-105:hover {
  transform: scale(1.05);
}
```

## 🏗️ Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Backend Production
```bash
cd backend
npm start
```

## 📝 Dependencies

### Frontend Dependencies
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.7.1",
  "tailwindcss": "^4.1.11"
}
```

### Backend Dependencies
```json
{
  "express": "^4.x.x",
  "sqlite3": "^5.x.x",
  "cors": "^2.x.x",
  "sqlite": "^5.x.x"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For any questions or support, please contact the development team.

---

**Built with ❤️ using React.js, Node.js, and modern web technologies**
