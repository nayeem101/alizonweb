const router = require("express").Router();
const bcrypt = require("bcrypt");
const validator = require("validator");

const passport = require("passport");

//user model
const User = require("../models/User");
//shipment model
const Shipment = require("../models/Shipment");
// source-product model
const SourceProduct = require("../models/Sourcing");
// Buy and Ship model
const BuyAndShip = require("../models/BuyandShip");
const { ensureAuth } = require("../config/auth");

//get - user/login
router.get("/login", (req, res, next) => {
  if (!req.isAuthenticated())
    res.render("pages/login", { title: "Alizon - User Login" });
  else res.redirect("/");
});

//@GET -- /user/shipments/id
router.get("/shipments/:id", ensureAuth, async (req, res, next) => {
  try {
    let userId = req.params.id;
    let myShipments = await Shipment.find({ "customer.id": userId });
    let pendingData = await myShipments.filter(
      (shipment) => shipment.status === "pending"
    );
    let approvedData = await myShipments.filter(
      (shipment) => shipment.status === "approved"
    );
    let rejectedData = await myShipments.filter(
      (shipment) => shipment.status === "rejected"
    );

    // console.log(pendingData, approvedData, rejectedData);

    res.render("user/shipments", {
      title: "Alizon - User Shipments",
      user: req.user || "",
      data: {
        approved: approvedData,
        pending: pendingData,
        rejected: rejectedData,
      },
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//@GET -- /user/source-products/id
router.get("/source-products/:id", ensureAuth, async (req, res, next) => {
  try {
    let userId = req.params.id;

    let mySourceProducts = await SourceProduct.find(
      { "customer.id": userId },
      { customer: 0 }
    );

    res.render("user/sourcing", {
      title: "Alizon - User Source Products",
      user: req.user || "",
      data: mySourceProducts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//@GET -- /user/buy-and-ship/id
router.get("/buy-and-ship/:id", ensureAuth, async (req, res, next) => {
  try {
    let userId = req.params.id;

    let myBuyAndShip = await BuyAndShip.find({ "customer.id": userId });
    res.render("user/buyandship", {
      title: "Alizon - Buy and Shipments",
      user: req.user || "",
      data: myBuyAndShip,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

/* //get google logins page
router.get(
  "/google/auth",
  passport.authenticate("google-auth", {
    scope: ["profile", "email"],
  })
);

//get google redirect page
router.get(
  "/google/auth/redirect",
  passport.authenticate("google-auth", { failureRedirect: "/user/login" }),
  function (req, res, next) {
    req.flash("success_msg", "You are logged in");
    res.redirect("/");
  }
);
 */
//get - users/register
router.get("/register", (req, res, next) => {
  res.render("pages/register");
});
/* 
//post - users/register
router.post("/register", async (req, res, next) => {
  const { fname, lname, mobile, email, password1, password2 } = req.body;

  //error
  let errors = [];

  //check required fields
  if (!fname || !lname || !mobile || !email || !password1 || !password2) {
    errors.push({ msg: "Please fill all fields" });
  }

  if (!validator.isEmail(email)) {
    errors.push({ msg: "Invalid email address" });
  }

  if (!validator.isMobilePhone(mobile, "bn-BD")) {
    errors.push({ msg: "Invalid Mobile Number" });
  }
  if (password1 !== password2) {
    //check password match
    errors.push({ msg: "Passwords do not match" });
  }

  //check pass length
  if (password1.length < 6) {
    errors.push({ msg: "Passwords shoud be at least 6 characters" });
  }

  if (errors.length > 0) {
    console.log(errors);
    res.render("pages/register", { errors, fname, lname, mobile, email });
  } else {
    //validation passed
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        //user exists
        errors.push({ msg: "Email is already registered" });
        res.render("pages/register", {
          errors,
          fname,
          lname,
          mobile,
          email,
        });
      } else {
        //saving user to db
        const hash = await bcrypt.hash(password1, 10);
        const newUser = new User({
          fullName: `${fname} ${lname}`,
          email,
          mobile,
          password: hash,
        });
        await newUser.save();
        req.flash("success_msg", "You are now registered and can login");
        res.redirect("/user/login");
        //console.log(newUser);
      }
    } catch (error) {
      errors.push({ msg: error.message });
      console.log(error);
      res.render("register", {
        errors,
        fname,
        login,
        email,
        mobile,
      });
    }
  }
});

//login handle
router.post("/login", async (req, res, next) => {
  passport.authenticate("user-local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
});

//logout handle
router.post("/logout", (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error_msg", "You have already logged out or login first");
    res.redirect("/user/login");
  }
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
});
 */
module.exports = router;
