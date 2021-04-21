const Sequelize = require('sequelize')
const db = require('../db')

const OrderItems = db.define('orderItems', {
    quantity: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.INTEGER
    }
})

module.exports = OrderItems