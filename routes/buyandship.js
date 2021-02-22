const router = require("express").Router();

/* // auth
const { ensureAuth } = require("../config/auth");

// model
const BuyandShip = require("../models/BuyandShip"); */

// @GET /buy-and-ship
router.get("/", (req, res, next) => {
  try {
    res.render("pages/buy-and-ship", {
      title: "Alizon - Buy and Ship Products",
      user: req.user || "",
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// @POST /buy-and-ship
/* router.post("/", ensureAuth, async (req, res, next) => {
  try {
    let data = req.body;

    let newRequest = new BuyandShip({
      customer: req.user,
      ...data,
      created_At: Date.now(),
    });

    let dbresponse = await newRequest.save();

    res.json(dbresponse);
    // res.redirect(`/user/buy-and-ship/${req.user.id}`);
  } catch (error) {
    console.error(error);
    return next(error);
  }
}); */

module.exports = router;
