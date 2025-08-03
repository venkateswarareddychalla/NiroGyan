<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Healthcare Appointment Booking System

This is a full-stack healthcare appointment booking application built with:

### Frontend
- React.js with Vite for fast development
- Tailwind CSS v4 for styling
- React Router for navigation
- React Context for state management
- Fetch API with async/await for API calls

### Backend
- Node.js with Express.js
- SQLite database with modern async/await interface
- RESTful API design
- CORS enabled for frontend communication

### Key Features
1. **Landing Page**: List doctors with search functionality
2. **Doctor Profile**: Detailed doctor information and availability
3. **Appointment Booking**: Form validation and confirmation system

### Development Guidelines
- Use modern JavaScript features (async/await, destructuring, etc.)
- Follow responsive design principles with Tailwind CSS
- Implement proper error handling and loading states
- Use React hooks for state management
- Maintain clean component structure with proper separation of concerns

### API Endpoints
- GET /api/doctors - Get all doctors with optional search
- GET /api/doctors/:id - Get specific doctor details
- POST /api/appointments - Book new appointment
- GET /api/appointments - Get all appointments
- GET /api/doctors/:id/appointments - Get doctor-specific appointments
