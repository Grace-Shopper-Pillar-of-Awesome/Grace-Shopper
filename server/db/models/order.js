const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    date: {
        type: Sequelize.DATEONLY
    },
    paymentType: {
        type: Sequelize.ENUM('paypal', 'card')
    },
    total: {
        type: Sequelize.INTEGER
    },
    orderStatus: {
        type: Sequelize.ENUM('pending', 'complete'),
        defaultValue: 'pending'
    }
})

module.exports = Order