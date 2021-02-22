const router = require("express").Router();

//model
const Order = require("../models/Order");

//auth
const { ensureAuth } = require("../config/auth");

//@GET /orders
router.get("/", ensureAuth, async (req, res, next) => {
  try {
    let user = req.user;
    let address = await Order.findOne(
      { "customer.id": user.id },
      { address: 1 }
    );
    console.log(address);
    if (address) {
      res.render("pages/order", {
        user: user.fullName,
        address: address.address,
      });
    } else {
      res.render("pages/order", { user: user.fullName, address: "" });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//@POST -- /orders
router.post("/", ensureAuth, async (req, res, next) => {
  try {
    let user = req.user;
    let order = req.body.productInfo;
    let address = req.body.address;

    const newOrder = new Order({
      customer: {
        id: user.id,
        name: user.fullName,
      },
      address,
      order,
      orderedAt: Date.now(),
    });
    let msg = await newOrder.save();
    console.log(msg);
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
