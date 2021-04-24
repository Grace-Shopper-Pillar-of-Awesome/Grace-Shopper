const router = require('express').Router();
const { User, Order, Galaxy, OrderItems } = require('../db');
module.exports = router;
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');


router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    //WILL NEED TO WRITE AN AXIOS CALL THAT PASSES A TOKEN WHEN WE CREATE THE ADMIN VIEW

    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET /api/users/:userId/cart

router.get("/:userId/cart", requireToken, async (req, res, next) => {
  try {
    console.log("req user is: ", req.user);
    console.log("req params userId is: ", req.params.userId)
    if (req.user.id === Number(req.params.userId)) {
      const [cart, wasCreated] = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          orderStatus: 'pending',
        },
        include: [{ model: Galaxy }],
      });
      res.json(cart);
    }
  } catch (error) {
    next(error);
  }
});

//DELETE /api/users/:userId/cart/:galaxyId
router.delete("/:userId/:orderId/:galaxyId", requireToken, async (req, res, next) => {
  try {
    if (req.user.id === Number(req.params.userId)) {
      const orderItemToDelete = await OrderItems.findOne({
        where: {
          galaxyId: req.params.galaxyId,
          orderId: req.params.orderId,
        },
      });
      if (orderItemToDelete) {
        await orderItemToDelete.destroy();
        res.json(orderItemToDelete);
      }
    }
  } catch (error) {
    next(error);
  }
});

//CHECKOUT /api/users/:userID/checkout
router.put('/:userId/checkout', requireToken, async (req, res, next) => {
  try {
    if (req.user.id === Number(req.params.userId)) {
      const cart = await Order.findOne({
        where: {
          userId: req.user.id,
          orderStatus: 'pending',
        },
      });
      const order = await cart.update({
        date: new Date(),
        orderStatus: 'complete',
        paymentType: req.body.payment,
      });
      res.json(order);
    }
  } catch (error) {
    next(error);
  }
});
