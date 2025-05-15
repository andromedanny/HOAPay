import { Announcement } from '../models/index.js';

const createSampleAnnouncements = async () => {
  try {
    const announcements = [
      {
        title: "Welcome to Our HOA Community!",
        content: "Dear residents, welcome to our HOA community! This platform will help us stay connected and informed about all community updates, events, and important notices. Please check back regularly for new announcements.",
        priority: "high",
        created_by: 1 // Admin user ID
      },
      {
        title: "Monthly Community Clean-up Drive",
        content: "Join us for our monthly community clean-up drive this Saturday from 8 AM to 11 AM. Meeting point will be at the community park. Please bring gloves and wear comfortable clothing. Refreshments will be provided!",
        priority: "normal",
        created_by: 1
      },
      {
        title: "Important: New Parking Regulations",
        content: "Starting next month, we will be implementing new parking regulations. Each household will be issued two parking stickers. Additional vehicles must be parked in designated visitor areas. Please visit the admin office to get your parking stickers.",
        priority: "high",
        created_by: 1
      },
      {
        title: "Community Garden Project",
        content: "We're excited to announce our new community garden project! Residents interested in maintaining a garden plot can sign up at the admin office. Limited spots available. First come, first served.",
        priority: "normal",
        created_by: 1
      },
      {
        title: "Pool Maintenance Schedule",
        content: "The community pool will undergo routine maintenance next week. The pool will be closed from Monday to Wednesday. We apologize for any inconvenience and thank you for your understanding.",
        priority: "low",
        created_by: 1
      }
    ];

    // Check if announcements already exist
    const existingCount = await Announcement.count();
    if (existingCount === 0) {
      await Announcement.bulkCreate(announcements);
      console.log('✅ Sample announcements created successfully');
    } else {
      console.log('ℹ️ Announcements already exist, skipping seeding');
    }
  } catch (error) {
    console.error('❌ Error creating sample announcements:', error);
  }
};

export default createSampleAnnouncements; 