import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const createAnnouncementsTable = async () => {
  try {
    // Drop the table if it exists
    await sequelize.getQueryInterface().dropTable('announcements', { force: true });
    console.log('✅ Dropped announcements table if it existed');

    // Create the table with the correct structure
    await sequelize.getQueryInterface().createTable('announcements', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      priority: {
        type: DataTypes.ENUM('low', 'normal', 'high'),
        defaultValue: 'normal'
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
    console.log('✅ Announcements table created successfully');
  } catch (error) {
    console.error('❌ Error creating announcements table:', error);
    throw error;
  }
};

export default createAnnouncementsTable; 