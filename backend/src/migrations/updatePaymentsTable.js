import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

const updatePaymentsTable = async () => {
  try {
    // Drop existing payments table if it exists
    await sequelize.query('DROP TABLE IF EXISTS payments');

    // Create fresh payments table
    await sequelize.query(`
      CREATE TABLE payments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT NOT NULL,
        amount FLOAT NOT NULL,
        paymentMethod VARCHAR(255) NOT NULL,
        paymentPlan VARCHAR(255) NOT NULL,
        dueDate DATETIME NOT NULL,
        status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
        rejectionReason TEXT,
        lateFee FLOAT DEFAULT 0.00,
        penalty FLOAT DEFAULT 0.00,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);

    console.log('✅ Payments table created successfully');
  } catch (error) {
    console.error('Error creating payments table:', error);
    throw error;
  }
};

export default updatePaymentsTable; 