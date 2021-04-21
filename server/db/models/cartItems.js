const Sequelize = require('sequelize')
const db = require('../db')

const CartItems = db.define('cartItems', {
    quantity: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.FLOAT
    }
})

module.exports = CartItems