const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

describe('Auth API', () => {
  test('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ 
        email: 'test@test.com', 
        password: '123456',
        githubUsername: 'testuser'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');

    // Verify user was created in database
    const user = await User.findOne({ email: 'test@test.com' });
    expect(user).toBeTruthy();
    expect(user.email).toBe('test@test.com');
    expect(user.githubUsername).toBe('testuser');
  });

  test('should login existing user', async () => {
    // First register
    await request(app)
      .post('/api/auth/register')
      .send({ 
        email: 'login@test.com', 
        password: 'password123' 
      });

    // Then login
    const res = await request(app)
      .post('/api/auth/login')
      .send({ 
        email: 'login@test.com', 
        password: 'password123' 
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('should reject invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ 
        email: 'nonexistent@test.com', 
        password: 'wrongpass' 
      });

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe('Invalid credentials');
  });

  test('should get current user with valid token', async () => {
    // Register and get token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ 
        email: 'me@test.com', 
        password: 'test123',
        githubUsername: 'meuser'
      });

    const token = registerRes.body.token;

    // Get current user
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe('me@test.com');
    expect(res.body.githubUsername).toBe('meuser');
    expect(res.body).not.toHaveProperty('password');
  });

  test('should reject request without token', async () => {
    const res = await request(app).get('/api/auth/me');

    expect(res.status).toBe(401);
    expect(res.body.msg).toBe('No token, authorization denied');
  });
});

