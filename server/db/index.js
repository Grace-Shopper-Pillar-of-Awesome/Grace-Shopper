//this is the access point for all things database related!

const db = require('./db');
const User = require('./models/user');
const ShoppingCart = require('./models/shoppingCart');
const CartItems = require('./models/cartItems');
const Order = require('./models/order');
const OrderItems = require('./models/orderItems');
const Galaxy = require('./models/galaxy');

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);
User.hasOne(ShoppingCart);
ShoppingCart.belongsTo(User);
Order.belongsToMany(Galaxy, { through: OrderItems });
Galaxy.belongsToMany(Order, { through: OrderItems });
ShoppingCart.belongsToMany(Galaxy, { through: CartItems });
Galaxy.belongsToMany(ShoppingCart, { through: CartItems });

console.log('order magicMethods', Object.keys(Order.prototype));
//console.log('CartItems magicMethods', Object.keys(CartItems.prototype))

module.exports = {
  db,
  User,
  ShoppingCart,
  CartItems,
  Order,
  OrderItems,
  Galaxy,
};
