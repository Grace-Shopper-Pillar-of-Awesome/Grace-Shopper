//this is the access point for all things database related!

const db = require('./db')
const User = require('./models/user')
const Order = require('./models/order')
const OrderItems = require('./models/orderItems')
const Galaxy = require('./models/galaxy')

//associations could go here!
User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Galaxy, {through: OrderItems})
Galaxy.belongsToMany(Order, {through: OrderItems})

module.exports = {
  db,
  User,
  Order,
  OrderItems,
  Galaxy
}

