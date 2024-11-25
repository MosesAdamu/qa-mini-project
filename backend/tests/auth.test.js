const request = require('supertest');
const baseUrl = 'https://qa-test-9di7.onrender.com';

describe('Authentication Tests', () => {
  let authToken;

  beforeAll(async () => {
    await request(baseUrl)
      .post('/auth/signup')
      .send({ username: 'joe234', password: 'josh' });

    const response = await request(baseUrl)
      .post('/auth/login')
      .send({ username: 'joe234', password: 'josh' });
    
    authToken = response.body.token;
  });

  test('Should signup a new user', async () => {
    const response = await request(baseUrl)
      .post('/auth/signup')
      .send({ username: 'joe234', password: 'josh' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User created successfully');
  });

  test('Should fail to signup with an existing username', async () => {
    const response = await request(baseUrl)
      .post('/auth/signup')
      .send({ username: 'joe234', password: 'josh' });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Username already exists');
  });

  test('Should login and receive a token', async () => {
    const response = await request(baseUrl)
      .post('/auth/login')
      .send({ username: 'joe234', password: 'josh' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Should fail with incorrect login credentials', async () => {
    const response = await request(baseUrl)
      .post('/auth/login')
      .send({ username: 'wrongUser', password: 'wrongPassword' });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});
