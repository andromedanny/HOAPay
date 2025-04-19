import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true,
    validate: { isEmail: true }
  },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING, allowNull: false },
  unitNumber: { type: DataTypes.STRING },
  propertyType: { 
    type: DataTypes.ENUM('condo', 'house', 'townhouse', 'villa'),
    defaultValue: 'condo'
  },
  role: {
    type: DataTypes.ENUM('homeowner', 'admin', 'pres', 'vp', 'sec', 'treasurer', 'bod'),
    defaultValue: 'homeowner'
  },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Method to compare password
User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default User;
