import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,        // Database name
  process.env.DB_USER,        // Database user
  process.env.DB_PASSWORD,    // Database password
  {
    host: process.env.DB_HOST,    // Database host (e.g., localhost)
    dialect: 'mysql',             // Dialect for MySQL
    logging: false,               // Disable logging, can be true for debugging
  }
);

// Optional: Create a function to connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate();  // Test the database connection
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);  // Exit process if connection fails
  }
};

// Export sequelize instance and connect function
export { sequelize, connectDB };
