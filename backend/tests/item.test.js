const request = require('supertest');
const baseUrl = 'https://qa-test-9di7.onrender.com'; 
let authToken;
let itemId;

describe('Item Management Tests', () => {
  beforeAll(async () => {
    const loginResponse = await request(baseUrl)
      .post('/auth/login')
      .send({ username: 'joe234', password: 'josh' });
    authToken = loginResponse.body.token;
  });

  test('Should create a new item', async () => {
    const response = await request(baseUrl)
      .post('/items')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Item 4',
        description: 'This is my description',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    itemId = response.body.id;
  });

  test('Should fetch all items', async () => {
    const response = await request(baseUrl)
      .get('/items?join=user')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Should update item details', async () => {
    const response = await request(baseUrl)
      .patch(`/items/${itemId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Updated Item',
        description: 'Updated description',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Updated Item');
  });

  test('Should delete item', async () => {
    const response = await request(baseUrl)
      .delete(`/items/${itemId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
  });

  test('Should not allow unauthorized user to delete another user’s item', async () => {
    const anotherUserToken = 'anotherUserToken'; // Replace with a real token for another user
    const response = await request(baseUrl)
      .delete(`/items/${itemId}`)
      .set('Authorization', `Bearer ${anotherUserToken}`);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Access denied');
  });
});
