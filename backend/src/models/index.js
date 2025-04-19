import User from './userModels.js'
import Payment from './paymentModels.js';
import Announcement from './announcementModels.js';

// Set up associations
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Announcement, { foreignKey: 'authorId' });
Announcement.belongsTo(User, { foreignKey: 'authorId' });

export { User, Payment, Announcement };