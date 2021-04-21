'use strict'

const {db, User,
  ShoppingCart,
  CartItems,
  Order,
  OrderItems,
  Galaxy } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  const user1 = await User.create({
    username: 'R2-D2',
    password: '1234',
    email: '123@gmail.com'
  });

  const shoppingCart1 = await ShoppingCart.create({
    total: 1200
  });

  const order1 = await Order.create({
      date: new Date(),
      paymentType: 'card',
      total: 1200
  })

  // const orderItems1 = await OrderItems.create({
  //     quantity: 1,
  //     price: 1200,
  // })

  const galaxy1 = await Galaxy.create({
      name: 'milkyway',
      SKU: 'MW123456',
      category: 'elliptical'
  })

//   const cartItems1 = await CartItems.create({
//     quantity: 1,
//     price: 1200,
// })


await order1.setUser(user1)
await shoppingCart1.setUser(user1)
await shoppingCart1.addGalaxy(galaxy1, { through: { quantity: 1, price: 1200 } })
await order1.addGalaxy(galaxy1, { through: { quantity: 1, price: 1200 }  })

}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
