require('dotenv').config();

const connectDB = require('../config/db');
const User = require('../models/User');
const LeavePolicy = require('../models/LeavePolicy');
const { ROLES, POLICY_STATUS } = require('../constants/roles');

const users = [
  {
    name: 'Harper HR',
    email: 'hr@example.com',
    password: 'Password@123',
    role: ROLES.HR,
  },
  {
    name: 'Morgan Manager',
    email: 'manager@example.com',
    password: 'Password@123',
    role: ROLES.MANAGER,
  },
  {
    name: 'Elliot Employee',
    email: 'employee@example.com',
    password: 'Password@123',
    role: ROLES.EMPLOYEE,
  },
];

const seed = async () => {
  await connectDB();

  await Promise.all([User.deleteMany({}), LeavePolicy.deleteMany({})]);

  const [hr, manager] = await User.create(users);

  // Seeded policies cover the whole approval lifecycle for quick manual testing.
  await LeavePolicy.insertMany([
    {
      title: 'Annual Leave Policy',
      description: 'Employees receive 18 days of paid annual leave every calendar year.',
      status: POLICY_STATUS.APPROVED,
      createdBy: hr._id,
      approvedBy: manager._id,
      approvedAt: new Date(),
    },
    {
      title: 'Remote Work Leave Notice',
      description: 'Employees must submit planned leave requests at least five business days ahead.',
      status: POLICY_STATUS.PENDING,
      createdBy: hr._id,
    },
  ]);

  console.log('Seed data inserted successfully');
  process.exit(0);
};

seed().catch((error) => {
  console.error(`Seed failed: ${error.message}`);
  process.exit(1);
});
