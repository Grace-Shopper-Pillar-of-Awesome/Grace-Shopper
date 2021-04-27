"use strict";

const { db, User, Order, Galaxy } = require("../server/db");
const galaxiesData = require("./galaxydata");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const user1 = await User.create({
    username: "user1",
    password: "1234",
    email: "user1@gmail.com",
    userType: "admin",
  });
  const user2 = await User.create({
    username: "user2",
    password: "1234",
    email: "user2@gmail.com",
  });
  const user3 = await User.create({
    username: "user3",
    password: "1234",
    email: "user3@gmail.com",
  });
  const user4 = await User.create({
    username: "user4",
    password: "1234",
    email: "user4@gmail.com",
  });
  const user5 = await User.create({
    username: "user5",
    password: "1234",
    email: "user5@gmail.com",
  });

  const order1 = await Order.create({
    date: new Date(),
    paymentType: "card",
    total: 1200,
    orderStatus: "complete",
  });
  const order2 = await Order.create({
    total: 1500,
  });
  const order3 = await Order.create({
    date: new Date(),
    paymentType: "card",
    total: 2500,
    orderStatus: "complete",
  });
  const order4 = await Order.create({
    total: 5000,
  });
  const order5 = await Order.create({
    date: new Date(),
    paymentType: "card",
    total: 5000,
    orderStatus: "complete",
  });

  const galaxy1 = await Galaxy.create({
    name: "milkyway",
    SKU: "MW123456",
    category: "elliptical",
    price: 1200,
  });
  const galaxy2 = await Galaxy.create({
    name: "fireworks",
    SKU: "FW123456",
    category: "spiral",
    price: 500,
  });
  const galaxy3 = await Galaxy.create({
    name: "tadpole",
    SKU: "TP123456",
    category: "irregular",
    price: 2500,
  });
  const galaxy4 = await Galaxy.create({
    name: "sunflower",
    SKU: "SF123456",
    category: "elliptical",
    price: 5000,
  });
  const galaxy5 = await Galaxy.create({
    name: "butterfly",
    SKU: "BF123456",
    category: "irregular",
    price: 500,
  });

  await Promise.all(
    galaxiesData.map((galaxy) =>
      Galaxy.create({
        name: galaxy.name,
        SKU: galaxy.SKU,
        description: galaxy.description,
        distance: galaxy.distance,
        price: galaxy.price,
        imageUrl: galaxy.imageUrl,
        inventory: galaxy.inventory,
        category: galaxy.category,
      })
    )
  );

  await order1.setUser(user1);
  await order2.setUser(user2);
  await order3.setUser(user3);
  await order4.setUser(user4);
  await order5.setUser(user5);
  await order1.addGalaxy(galaxy1, { through: { quantity: 1, price: 1200 } });
  await order2.addGalaxy(galaxy2, { through: { quantity: 1, price: 500 } });
  await order2.addGalaxy(galaxy5, { through: { quantity: 2, price: 500 } });
  await order3.addGalaxy(galaxy3, { through: { quantity: 1, price: 2500 } });
  await order4.addGalaxy(galaxy4, { through: { quantity: 1, price: 5000 } });
  await order5.addGalaxy(galaxy4, { through: { quantity: 1, price: 5000 } });
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
