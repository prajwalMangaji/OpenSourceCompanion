const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
const mongoose = require('mongoose');

// Load environment variables for tests
dotenv.config();

let mongoServer;

beforeAll(async () => {
  // Create an in-memory MongoDB instance for testing
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri);
}, 60000); // Increase timeout to 60 seconds

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
}, 60000);

afterEach(async () => {
  // Clear all collections after each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});
