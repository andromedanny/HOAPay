// config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Create instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Optional: Connect function if needed
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);
  }
};

export { sequelize, connectDB }; // 👈 make sure both are exported
