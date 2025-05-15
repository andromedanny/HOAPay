// models/paymentModels.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

// Define the Payment model
const Payment = sequelize.define('Payment', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentPlan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
  },
  rejectionReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  lateFee: {
    type: DataTypes.FLOAT,
    defaultValue: 0.00,
  },
  penalty: {
    type: DataTypes.FLOAT,
    defaultValue: 0.00,
  }
}, {
  tableName: 'payments',
  timestamps: true
});

// Export the Payment model
export default Payment;
