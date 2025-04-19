import User from '../models/Users.js';

const createAdmin = async () => {
  const adminExists = await User.findOne({ where: { email: 'admin@hoa.com' } });

  if (!adminExists) {
    await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@hoa.com',
      password: 'admin123', // ✅ Don't hash this manually
      role: 'admin',
      address: '123 Admin Street',
      isVerified: true
    });

    console.log('✅ Admin user created');
  }
};

export default createAdmin;

