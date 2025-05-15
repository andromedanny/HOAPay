import User from './userModels.js';
import Payment from './paymentModels.js';
import Announcement from './announcementModels.js';

// Set up associations
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

export { User, Payment, Announcement };