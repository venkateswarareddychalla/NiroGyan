import { createContext, useContext, useReducer, useCallback } from 'react';

const AppContext = createContext();

const initialState = {
  doctors: [],
  loading: false,
  error: null,
  selectedDoctor: null,
  appointments: []
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_DOCTORS':
      return { ...state, doctors: action.payload, loading: false, error: null };
    case 'SET_SELECTED_DOCTOR':
      return { ...state, selectedDoctor: action.payload };
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload };
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // API Base URL
  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

  // Fetch all doctors
  const fetchDoctors = useCallback(async (searchQuery = '') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const url = searchQuery 
        ? `${API_BASE_URL}/doctors?search=${encodeURIComponent(searchQuery)}`
        : `${API_BASE_URL}/doctors`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const doctors = await response.json();
      dispatch({ type: 'SET_DOCTORS', payload: doctors });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  // Fetch doctor by ID
  const fetchDoctorById = useCallback(async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/${id}`);
      if (!response.ok) {
        throw new Error('Doctor not found');
      }
      const doctor = await response.json();
      dispatch({ type: 'SET_SELECTED_DOCTOR', payload: doctor });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  // Book appointment
  const bookAppointment = useCallback(async (appointmentData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to book appointment');
      }

      const result = await response.json();
      dispatch({ type: 'ADD_APPOINTMENT', payload: result.appointment });
      dispatch({ type: 'SET_LOADING', payload: false });
      return result;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments`);
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const appointments = await response.json();
      dispatch({ type: 'SET_APPOINTMENTS', payload: appointments });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    fetchDoctors,
    fetchDoctorById,
    bookAppointment,
    fetchAppointments,
    clearError
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
