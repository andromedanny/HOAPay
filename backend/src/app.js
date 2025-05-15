import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'
import announcementRoutes from './routes/announcementRoutes.js';
import { sequelize } from './config/database.js';
import createAdmin from './seeders/adminSeeders.js';
import updatePaymentsTable from './migrations/updatePaymentsTable.js';
import createAnnouncementsTable from './migrations/createAnnouncementsTable.js';
import createSampleAnnouncements from './seeders/announcementSeeders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/payments', paymentRoutes);
app.use('/announcements', announcementRoutes);

const initializeApp = async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Run migrations
    await updatePaymentsTable();
    await createAnnouncementsTable();

    // Create admin user if doesn't exist
    await createAdmin();
    
    // Create sample announcements
    await createSampleAnnouncements();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error initializing app:', error);
    process.exit(1);
  }
};

initializeApp();
