const Sequelize = require('sequelize');
const db = require('../db');

const Galaxy = db.define('galaxy', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  SKU: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  distance: {
    type: Sequelize.FLOAT,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'http://www.mirrordaily.com/wp-content/uploads/2015/04/milky-way.jpg',
  },
  inventory: {
    type: Sequelize.INTEGER,
  },
  category: {
    type: Sequelize.ENUM('elliptical', 'spiral', 'irregular'),
    defaultValue: 'irregular',
  },
});

module.exports = Galaxy;
