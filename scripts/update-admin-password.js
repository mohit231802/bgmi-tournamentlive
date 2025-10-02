const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Read .env.local file manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key] = valueParts.join('=').trim();
  }
});

// Set environment variables
process.env.MONGODB_URI = envVars.MONGODB_URI;
process.env.ADMIN_EMAIL = envVars.ADMIN_EMAIL;
process.env.ADMIN_PASSWORD = envVars.ADMIN_PASSWORD;

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function updateAdminPassword() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({
      email: process.env.ADMIN_EMAIL.toLowerCase(),
      role: 'admin'
    });

    if (!adminUser) {
      console.log('❌ Admin user not found');
      return;
    }

    // Hash the new password
    console.log('Updating admin password...');
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

    // Update admin user password
    adminUser.password = hashedPassword;
    await adminUser.save();

    console.log('✅ Admin password updated successfully!');
    console.log('Email:', adminUser.email);

  } catch (error) {
    console.error('❌ Error updating admin password:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

updateAdminPassword();