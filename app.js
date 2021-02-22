const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

/* // passport
const passport = require("./config/passport"); */
/* 
    "multer": "^1.4.2",
    "passport": "^0.4.1",
    "passport-google-oauth20": "^2.0.0",
    "passport-local": "^1.0.0",
    "sharp": "^0.27.1",
    "valid-url": "^1.0.9",
    "validator": "^13.5.2"
*/
//init app
const app = express();
//Connect to Mongo
mongoose.connect(process.env.MongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
//error handle
db.on("error", (err) => {
  console.log("db error:", err);
});

db.once("open", () => {
  console.log("Database Connection Established");
});

//session store in db
const sessionStore = new MongoStore({
  mongooseConnection: db,
  collection: "sessions",
});

//express session
app.use(
  session({
    secret: process.env.ssecret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3, // ms * seconds * mins * hours * days
    },
  })
);

/* //passport
app.use(passport.initialize());
app.use(passport.session()); */

// path configs
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: 1000 * 60 * 60 * 24 * 3,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//cookie parser
app.use(cookieParser());
// logger
app.use(logger("dev"));

//flash msg
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// router modules
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
// const orderRouter = require("./routes/order");
const shipmentRouter = require("./routes/shipment");
const sourceRouter = require("./routes/sourcing");
const buyandshipRouter = require("./routes/buyandship");

// routes
app.use("/", indexRouter);
app.use("/user", userRouter);
// app.use("/order", orderRouter);
app.use("/shipment", shipmentRouter);
app.use("/source-product", sourceRouter);
app.use("/buy-and-ship", buyandshipRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  req.app.get("env") === "development"
    ? res.render("error404")
    : res.render("error404");
});

module.exports = app;
