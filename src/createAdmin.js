require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const create = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Admin.deleteMany(); // আগেরটা clear করো

  await Admin.create({
    email: 'admin@sunnah.com',      // তোমার email
    password: 'Yeasir.arafat17',     // তোমার password
  });

  console.log('✅ Admin created!');
  process.exit(0);
};

create();

