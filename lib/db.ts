import mongoose from 'mongoose';

// Log the connection URI (masked for security)
console.log('MongoDB connection:', process.env.MONGODB_URI ? 'Atlas URI configured' : 'Using localhost fallback');

// Temporarily use local MongoDB to test the app while debugging Atlas connection
const MONGODB_URI = process.env.MONGODB_URI_LOCAL || 'mongodb://localhost:27017/bgmi-tournaments';
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bgmi-tournaments';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 1000, // Faster timeout for development
      socketTimeoutMS: 5000,
      maxPoolSize: 5,
    };

    console.log('Attempting database connection...');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Database connected successfully');
      return mongoose;
    }).catch(async (atlasError) => {
      console.warn('Atlas connection failed, trying localhost...', atlasError.message);

      const LOCAL_URI = 'mongodb://localhost:27017/bgmi-tournaments';
      console.log('Trying local MongoDB...');

      try {
        console.log('⏱️  Trying fast local fallback...');
        // For development, immediately reject local connection to use mock data
        // Uncomment the lines below if you want to try local MongoDB
        /*
        await mongoose.disconnect();
        const localMongoose = await mongoose.connect(LOCAL_URI, {
          ...opts,
          serverSelectionTimeoutMS: 500, // Very fast timeout
        });
        console.log('✅ Connected to local MongoDB');
        return localMongoose;
        */
        throw new Error('Local MongoDB disabled for demo mode');
      } catch (localError) {
        console.log('📝 Using mock data mode (database unavailable)');
        throw new Error('Database unavailable - using demo data');
      }
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    console.error('Database connection error:', e.message);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
