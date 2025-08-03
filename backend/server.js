const express = require("express");
const path = require("path");
const cors = require("cors");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
const dbPath = path.join(__dirname, "database.db");

let db = null;

// Sample doctors data
const sampleDoctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    profile_image: 'https://randomuser.me/api/portraits/women/1.jpg',
    availability_status: 'available',
    experience_years: 12,
    rating: 4.8,
    consultation_fee: 150,
    location: 'New York, NY',
    about: 'Experienced cardiologist specializing in heart disease prevention and treatment.'
  },
  {
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    profile_image: 'https://randomuser.me/api/portraits/men/1.jpg',
    availability_status: 'available',
    experience_years: 8,
    rating: 4.6,
    consultation_fee: 120,
    location: 'Los Angeles, CA',
    about: 'Board-certified dermatologist with expertise in skin cancer treatment and cosmetic procedures.'
  },
  {
    name: 'Dr. Emily Davis',
    specialization: 'Pediatrician',
    profile_image: 'https://randomuser.me/api/portraits/women/2.jpg',
    availability_status: 'busy',
    experience_years: 15,
    rating: 4.9,
    consultation_fee: 100,
    location: 'Chicago, IL',
    about: 'Dedicated pediatrician providing comprehensive healthcare for children and adolescents.'
  },
  {
    name: 'Dr. Robert Wilson',
    specialization: 'Orthopedic Surgeon',
    profile_image: 'https://randomuser.me/api/portraits/men/2.jpg',
    availability_status: 'available',
    experience_years: 20,
    rating: 4.7,
    consultation_fee: 200,
    location: 'Houston, TX',
    about: 'Expert orthopedic surgeon specializing in joint replacement and sports medicine.'
  },
  {
    name: 'Dr. Lisa Anderson',
    specialization: 'Neurologist',
    profile_image: 'https://randomuser.me/api/portraits/women/3.jpg',
    availability_status: 'available',
    experience_years: 10,
    rating: 4.5,
    consultation_fee: 180,
    location: 'Miami, FL',
    about: 'Neurologist with expertise in treating stroke, epilepsy, and neurodegenerative diseases.'
  },
  {
    name: 'Dr. James Thompson',
    specialization: 'General Physician',
    profile_image: 'https://randomuser.me/api/portraits/men/3.jpg',
    availability_status: 'available',
    experience_years: 6,
    rating: 4.4,
    consultation_fee: 80,
    location: 'Seattle, WA',
    about: 'General physician providing primary care and preventive medicine services.'
  },
  {
    name: 'Dr. Amanda Rodriguez',
    specialization: 'Psychiatrist',
    profile_image: 'https://randomuser.me/api/portraits/women/4.jpg',
    availability_status: 'available',
    experience_years: 14,
    rating: 4.7,
    consultation_fee: 160,
    location: 'Phoenix, AZ',
    about: 'Compassionate psychiatrist specializing in anxiety, depression, and trauma therapy.'
  },
  {
    name: 'Dr. David Kim',
    specialization: 'Ophthalmologist',
    profile_image: 'https://randomuser.me/api/portraits/men/4.jpg',
    availability_status: 'available',
    experience_years: 11,
    rating: 4.8,
    consultation_fee: 140,
    location: 'San Francisco, CA',
    about: 'Expert ophthalmologist with specialization in retinal diseases and laser surgery.'
  },
  {
    name: 'Dr. Jennifer Brown',
    specialization: 'Gynecologist',
    profile_image: 'https://randomuser.me/api/portraits/women/5.jpg',
    availability_status: 'busy',
    experience_years: 18,
    rating: 4.9,
    consultation_fee: 170,
    location: 'Boston, MA',
    about: 'Experienced gynecologist providing comprehensive womens health care services.'
  },
  {
    name: 'Dr. Mark Taylor',
    specialization: 'Urologist',
    profile_image: 'https://randomuser.me/api/portraits/men/5.jpg',
    availability_status: 'available',
    experience_years: 16,
    rating: 4.6,
    consultation_fee: 190,
    location: 'Denver, CO',
    about: 'Skilled urologist specializing in kidney stones and prostate health.'
  },
  {
    name: 'Dr. Rachel Green',
    specialization: 'Endocrinologist',
    profile_image: 'https://randomuser.me/api/portraits/women/6.jpg',
    availability_status: 'available',
    experience_years: 13,
    rating: 4.7,
    consultation_fee: 165,
    location: 'Atlanta, GA',
    about: 'Endocrinologist focused on diabetes management and thyroid disorders.'
  },
  {
    name: 'Dr. Christopher Lee',
    specialization: 'Gastroenterologist',
    profile_image: 'https://randomuser.me/api/portraits/men/6.jpg',
    availability_status: 'available',
    experience_years: 22,
    rating: 4.8,
    consultation_fee: 185,
    location: 'Dallas, TX',
    about: 'Experienced gastroenterologist specializing in digestive system disorders.'
  },
  {
    name: 'Dr. Maria Garcia',
    specialization: 'Rheumatologist',
    profile_image: 'https://randomuser.me/api/portraits/women/7.jpg',
    availability_status: 'busy',
    experience_years: 9,
    rating: 4.5,
    consultation_fee: 155,
    location: 'Las Vegas, NV',
    about: 'Rheumatologist specializing in arthritis and autoimmune diseases.'
  },
  {
    name: 'Dr. Kevin White',
    specialization: 'Pulmonologist',
    profile_image: 'https://randomuser.me/api/portraits/men/7.jpg',
    availability_status: 'available',
    experience_years: 17,
    rating: 4.6,
    consultation_fee: 175,
    location: 'Portland, OR',
    about: 'Pulmonologist expert in lung diseases and respiratory disorders.'
  },
  {
    name: 'Dr. Nicole Adams',
    specialization: 'Hematologist',
    profile_image: 'https://randomuser.me/api/portraits/women/8.jpg',
    availability_status: 'available',
    experience_years: 12,
    rating: 4.7,
    consultation_fee: 195,
    location: 'Minneapolis, MN',
    about: 'Hematologist specializing in blood disorders and cancer treatment.'
  },
  {
    name: 'Dr. Steven Clark',
    specialization: 'Oncologist',
    profile_image: 'https://randomuser.me/api/portraits/men/8.jpg',
    availability_status: 'available',
    experience_years: 19,
    rating: 4.9,
    consultation_fee: 220,
    location: 'San Diego, CA',
    about: 'Leading oncologist with expertise in cancer treatment and immunotherapy.'
  },
  {
    name: 'Dr. Michelle Turner',
    specialization: 'Allergist',
    profile_image: 'https://randomuser.me/api/portraits/women/9.jpg',
    availability_status: 'busy',
    experience_years: 7,
    rating: 4.4,
    consultation_fee: 130,
    location: 'Nashville, TN',
    about: 'Allergist specializing in food allergies and environmental sensitivities.'
  },
  {
    name: 'Dr. Brian Moore',
    specialization: 'Anesthesiologist',
    profile_image: 'https://randomuser.me/api/portraits/men/9.jpg',
    availability_status: 'available',
    experience_years: 21,
    rating: 4.8,
    consultation_fee: 200,
    location: 'Kansas City, MO',
    about: 'Experienced anesthesiologist with expertise in pain management.'
  },
  {
    name: 'Dr. Jessica Martinez',
    specialization: 'Emergency Medicine',
    profile_image: 'https://randomuser.me/api/portraits/women/10.jpg',
    availability_status: 'available',
    experience_years: 5,
    rating: 4.3,
    consultation_fee: 90,
    location: 'Salt Lake City, UT',
    about: 'Emergency medicine physician with rapid response expertise.'
  },
  {
    name: 'Dr. Thomas Jackson',
    specialization: 'Radiologist',
    profile_image: 'https://randomuser.me/api/portraits/men/10.jpg',
    availability_status: 'available',
    experience_years: 14,
    rating: 4.6,
    consultation_fee: 145,
    location: 'Indianapolis, IN',
    about: 'Radiologist specializing in medical imaging and diagnostic procedures.'
  },
  {
    name: 'Dr. Angela Lewis',
    specialization: 'Pathologist',
    profile_image: 'https://randomuser.me/api/portraits/women/11.jpg',
    availability_status: 'busy',
    experience_years: 16,
    rating: 4.7,
    consultation_fee: 180,
    location: 'Charlotte, NC',
    about: 'Pathologist expert in disease diagnosis through laboratory testing.'
  },
  {
    name: 'Dr. Richard Harris',
    specialization: 'Plastic Surgeon',
    profile_image: 'https://randomuser.me/api/portraits/men/11.jpg',
    availability_status: 'available',
    experience_years: 24,
    rating: 4.9,
    consultation_fee: 250,
    location: 'Beverly Hills, CA',
    about: 'Renowned plastic surgeon specializing in reconstructive and cosmetic surgery.'
  },
  {
    name: 'Dr. Stephanie Young',
    specialization: 'Sports Medicine',
    profile_image: 'https://randomuser.me/api/portraits/women/12.jpg',
    availability_status: 'available',
    experience_years: 8,
    rating: 4.5,
    consultation_fee: 125,
    location: 'Tampa, FL',
    about: 'Sports medicine physician helping athletes recover from injuries.'
  },
  {
    name: 'Dr. Daniel King',
    specialization: 'Infectious Disease',
    profile_image: 'https://randomuser.me/api/portraits/men/12.jpg',
    availability_status: 'available',
    experience_years: 18,
    rating: 4.8,
    consultation_fee: 190,
    location: 'Cleveland, OH',
    about: 'Infectious disease specialist with expertise in complex infections.'
  },
  {
    name: 'Dr. Laura Wright',
    specialization: 'Geriatrician',
    profile_image: 'https://randomuser.me/api/portraits/women/13.jpg',
    availability_status: 'busy',
    experience_years: 13,
    rating: 4.6,
    consultation_fee: 110,
    location: 'Milwaukee, WI',
    about: 'Geriatrician dedicated to comprehensive care for elderly patients.'
  },
  {
    name: 'Dr. Gregory Scott',
    specialization: 'Nephrologist',
    profile_image: 'https://randomuser.me/api/portraits/men/13.jpg',
    availability_status: 'available',
    experience_years: 15,
    rating: 4.7,
    consultation_fee: 175,
    location: 'San Antonio, TX',
    about: 'Nephrologist specializing in kidney disease and dialysis care.'
  },
  {
    name: 'Dr. Catherine Hill',
    specialization: 'Family Medicine',
    profile_image: 'https://randomuser.me/api/portraits/women/14.jpg',
    availability_status: 'available',
    experience_years: 11,
    rating: 4.4,
    consultation_fee: 85,
    location: 'Columbus, OH',
    about: 'Family medicine physician providing comprehensive primary care.'
  },
  {
    name: 'Dr. Jonathan Green',
    specialization: 'Otolaryngologist',
    profile_image: 'https://randomuser.me/api/portraits/men/20.jpg',
    availability_status: 'available',
    experience_years: 20,
    rating: 4.8,
    consultation_fee: 160,
    location: 'Baltimore, MD',
    about: 'ENT specialist with expertise in ear, nose, and throat disorders.'
  },
  {
    name: 'Dr. Patricia Baker',
    specialization: 'Physiatrist',
    profile_image: 'https://randomuser.me/api/portraits/women/19.jpg',
    availability_status: 'busy',
    experience_years: 9,
    rating: 4.5,
    consultation_fee: 140,
    location: 'Detroit, MI',
    about: 'Physiatrist specializing in rehabilitation and physical therapy.'
  },
  {
    name: 'Dr. Timothy Adams',
    specialization: 'Vascular Surgeon',
    profile_image: 'https://randomuser.me/api/portraits/men/21.jpg',
    availability_status: 'available',
    experience_years: 17,
    rating: 4.7,
    consultation_fee: 210,
    location: 'Louisville, KY',
    about: 'Vascular surgeon expert in blood vessel and circulation disorders.'
  },
  {
    name: 'Dr. Sandra Phillips',
    specialization: 'Pain Management',
    profile_image: 'https://randomuser.me/api/portraits/women/20.jpg',
    availability_status: 'available',
    experience_years: 12,
    rating: 4.6,
    consultation_fee: 165,
    location: 'Oklahoma City, OK',
    about: 'Pain management specialist providing comprehensive chronic pain treatment.'
  },
  {
    name: 'Dr. Andrew Carter',
    specialization: 'Thoracic Surgeon',
    profile_image: 'https://randomuser.me/api/portraits/men/22.jpg',
    availability_status: 'available',
    experience_years: 23,
    rating: 4.9,
    consultation_fee: 240,
    location: 'Richmond, VA',
    about: 'Thoracic surgeon specializing in chest and lung surgery procedures.'
  },
  {
    name: 'Dr. Kimberly Mitchell',
    specialization: 'Reproductive Endocrinologist',
    profile_image: 'https://randomuser.me/api/portraits/women/21.jpg',
    availability_status: 'busy',
    experience_years: 14,
    rating: 4.8,
    consultation_fee: 195,
    location: 'Memphis, TN',
    about: 'Reproductive endocrinologist helping families with fertility treatments.'
  },
  {
    name: 'Dr. Charles Roberts',
    specialization: 'Hand Surgeon',
    profile_image: 'https://randomuser.me/api/portraits/men/23.jpg',
    availability_status: 'available',
    experience_years: 16,
    rating: 4.7,
    consultation_fee: 185,
    location: 'Albuquerque, NM',
    about: 'Hand surgeon specializing in complex hand and wrist procedures.'
  },
  {
    name: 'Dr. Melissa Campbell',
    specialization: 'Medical Geneticist',
    profile_image: 'https://randomuser.me/api/portraits/women/22.jpg',
    availability_status: 'available',
    experience_years: 10,
    rating: 4.5,
    consultation_fee: 170,
    location: 'Tucson, AZ',
    about: 'Medical geneticist providing genetic counseling and testing services.'
  },
  {
    name: 'Dr. Ryan Evans',
    specialization: 'Interventional Cardiologist',
    profile_image: 'https://randomuser.me/api/portraits/men/24.jpg',
    availability_status: 'available',
    experience_years: 19,
    rating: 4.8,
    consultation_fee: 205,
    location: 'Fresno, CA',
    about: 'Interventional cardiologist performing advanced cardiac procedures.'
  },
  {
    name: 'Dr. Heather Parker',
    specialization: 'Maternal-Fetal Medicine',
    profile_image: 'https://randomuser.me/api/portraits/women/23.jpg',
    availability_status: 'busy',
    experience_years: 13,
    rating: 4.9,
    consultation_fee: 180,
    location: 'Mesa, AZ',
    about: 'Maternal-fetal medicine specialist caring for high-risk pregnancies.'
  },
  {
    name: 'Dr. Benjamin Cooper',
    specialization: 'Forensic Pathologist',
    profile_image: 'https://randomuser.me/api/portraits/men/25.jpg',
    availability_status: 'available',
    experience_years: 7,
    rating: 4.4,
    consultation_fee: 155,
    location: 'Virginia Beach, VA',
    about: 'Forensic pathologist specializing in legal medical investigations.'
  },
  {
    name: 'Dr. Jennifer Reed',
    specialization: 'Sleep Medicine',
    profile_image: 'https://randomuser.me/api/portraits/women/24.jpg',
    availability_status: 'available',
    experience_years: 11,
    rating: 4.6,
    consultation_fee: 135,
    location: 'Colorado Springs, CO',
    about: 'Sleep medicine specialist treating sleep disorders and breathing problems.'
  },
  {
    name: 'Dr. Matthew Bailey',
    specialization: 'Nuclear Medicine',
    profile_image: 'https://randomuser.me/api/portraits/men/26.jpg',
    availability_status: 'available',
    experience_years: 15,
    rating: 4.7,
    consultation_fee: 190,
    location: 'Omaha, NE',
    about: 'Nuclear medicine physician using radioactive materials for diagnosis and treatment.'
  }
];

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Initialize database tables
    await db.exec(`CREATE TABLE IF NOT EXISTS doctors (
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
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doctor_id INTEGER,
      patient_name TEXT NOT NULL,
      patient_email TEXT NOT NULL,
      appointment_date TEXT NOT NULL,
      appointment_time TEXT NOT NULL,
      status TEXT DEFAULT 'confirmed',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(doctor_id) REFERENCES doctors(id)
    )`);

    // Check if doctors table is empty and insert sample data
    const doctorCount = await db.get("SELECT COUNT(*) as count FROM doctors");
    console.log(`Current doctors in database: ${doctorCount.count}`);
    
    if (doctorCount.count === 0) {
      console.log(`Inserting ${sampleDoctors.length} doctors into database...`);
      for (const doctor of sampleDoctors) {
        await db.run(
          `INSERT INTO doctors 
          (name, specialization, profile_image, availability_status, experience_years, rating, consultation_fee, location, about) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            doctor.name,
            doctor.specialization,
            doctor.profile_image,
            doctor.availability_status,
            doctor.experience_years,
            doctor.rating,
            doctor.consultation_fee,
            doctor.location,
            doctor.about
          ]
        );
      }
      console.log(`Successfully inserted ${sampleDoctors.length} doctors into database`);
    } else {
      console.log('Database already contains doctors, skipping insertion');
    }

    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

// Routes

// Get all doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const { search } = req.query;
    
    let query = "SELECT * FROM doctors";
    let params = [];
    
    if (search) {
      query += " WHERE name LIKE ? OR specialization LIKE ?";
      params = [`%${search}%`, `%${search}%`];
    }
    
    const doctors = await db.all(query, params);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get doctor by ID
app.get('/api/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const doctor = await db.get("SELECT * FROM doctors WHERE id = ?", [id]);
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Book an appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const { doctor_id, patient_name, patient_email, appointment_date, appointment_time } = req.body;
    
    // Validate required fields
    if (!doctor_id || !patient_name || !patient_email || !appointment_date || !appointment_time) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(patient_email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Check if the appointment slot is already taken
    const existingAppointment = await db.get(
      "SELECT * FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ?",
      [doctor_id, appointment_date, appointment_time]
    );
    
    if (existingAppointment) {
      return res.status(400).json({ error: 'This appointment slot is already booked' });
    }
    
    // Create the appointment
    const result = await db.run(
      "INSERT INTO appointments (doctor_id, patient_name, patient_email, appointment_date, appointment_time) VALUES (?, ?, ?, ?, ?)",
      [doctor_id, patient_name, patient_email, appointment_date, appointment_time]
    );
    
    res.json({
      id: result.lastID,
      message: 'Appointment booked successfully',
      appointment: {
        id: result.lastID,
        doctor_id,
        patient_name,
        patient_email,
        appointment_date,
        appointment_time,
        status: 'confirmed'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get appointments for a doctor
app.get('/api/doctors/:id/appointments', async (req, res) => {
  try {
    const { id } = req.params;
    
    const appointments = await db.all(
      "SELECT * FROM appointments WHERE doctor_id = ? ORDER BY appointment_date, appointment_time",
      [id]
    );
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const query = `
      SELECT a.*, d.name as doctor_name, d.specialization 
      FROM appointments a 
      JOIN doctors d ON a.doctor_id = d.id 
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `;
    
    const appointments = await db.all(query);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

initializeDBAndServer();
