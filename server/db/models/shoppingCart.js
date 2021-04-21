const Sequelize = require('sequelize')
const db = require('../db')

const ShoppingCart = db.define('shoppingCart', {
    total: {
        type: Sequelize.FLOAT
    }
})

module.exports = ShoppingCart