const request = require('supertest');
const baseUrl = 'https://qa-test-9di7.onrender.com';
let authToken;
let userId;

describe('User Management Tests', () => {
  beforeAll(async () => {
    const loginResponse = await request(baseUrl)
      .post('/auth/login')
      .send({ username: 'joe234', password: 'josh' });
    authToken = loginResponse.body.token;
  });

  test('Should create a user', async () => {
    const response = await request(baseUrl)
      .post('/auth/signup')
      .send({
        username: 'newUser',
        password: 'newPassword123',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id;
  });

  test('Should fetch user details', async () => {
    const response = await request(baseUrl)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('username', 'newUser');
  });

  test('Should update user details', async () => {
    const response = await request(baseUrl)
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        username: 'updatedUser',
        password: 'updatedPassword',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe('updatedUser');
  });

  test('Should delete user account', async () => {
    const response = await request(baseUrl)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted successfully');
  });

  test('Should not allow unauthorized user to access another user’s data', async () => {
    const anotherUserToken = 'anotherUserToken'; // Replace with a real token for another user
    const response = await request(baseUrl)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${anotherUserToken}`);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Access denied');
  });
});
