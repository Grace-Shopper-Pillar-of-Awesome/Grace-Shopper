const { expect } = require('chai');
const { db, Galaxy } = require('../index');
// const seed = require('../../../script/seed');

describe('Galaxy model', () => {
  // let galaxies;

  // beforeEach(async () => {
  //   galaxies = (await seed()).galaxies;
  // });

  describe('Galaxy model', () => {
    it('can create new galaxy correctly', async () => {
      const galaxy = {
        name: 'galaxy test',
        SKU: 'ABCD12345',
        description: 'galaxy description',
        distance: 1.05,
        price: 100000,
        inventory: 500,
      };

      const galaxyRow = await Galaxy.create(galaxy);

      expect(galaxyRow.imageUrl).to.be.deep.equal(
        'http://www.mirrordaily.com/wp-content/uploads/2015/04/milky-way.jpg'
      );

      expect(galaxyRow.category).to.be.deep.equal('irregular');
    });
  });
});
