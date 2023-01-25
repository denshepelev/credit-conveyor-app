import request from 'supertest';
import app from '../src/app';

describe('POST /', () => {
  describe('when passed a username and password', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/').send({
        person: 'Mr. Bean',
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
