const axios = require('axios');

const BASE_URL = 'https://petstore.swagger.io/v2';

describe('Petstore API Tests', () => {
  let petId = 1104;

  test('POST /pet - Add new pet', async () => {
    const response = await axios.post(`${BASE_URL}/pet`, {
      id: petId,
      name: 'Cat News by IDN Times',
      photoUrls: ['https://short-link.me/157y1'],
      status: 'available'
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(petId);
  });

  test('GET /pet/findByStatus - Find pets by status', async () => {
    const response = await axios.get(`${BASE_URL}/pet/findByStatus`, {
      params: { status: 'available' }
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('DELETE /pet/{petId} - Delete pet by ID', async () => {
    const response = await axios.delete(`${BASE_URL}/pet/${petId}`);
    expect(response.status).toBe(200);
  });

  test('DELETE /pet/{petId} - Delete non-existent pet', async () => {
    const response = await axios.delete(`${BASE_URL}/pet/999999`)
      .catch(err => err.response);

    expect(response.status).toBe(404);
  });
});