import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; // If using named export
// OR:
// import sequelize from '../config/database.js'; // If using default export

const Payment = sequelize.define('Payment', {
  amount: { 
    type: DataTypes.DECIMAL(10,2), 
    allowNull: false 
  },
  paymentMethod: { 
    type: DataTypes.ENUM('gcash', 'paypal', 'credit_card', 'debit_card', 'bank_transfer'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  }
});

export default Payment;