const seed = require('../../script/seed');
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest');
const { db, Galaxy } = require('../db');

describe('Galaxy routes', () => {
  beforeEach(async () => {
    await seed();
  });

  describe('/api/galaxies', () => {
    it('GET /api/galaxies', async () => {
      const res = await request(app).get('/api/galaxies').expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(40);
    });
  });
});
