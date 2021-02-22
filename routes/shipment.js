const router = require("express").Router();
// const fs = require("fs");
// const multer = require("multer");
// const path = require("path");
// const sharp = require("sharp");

/* // auth
const { ensureAuth } = require("../config/auth");

//model
const ShipForMe = require("../models/Shipment");

// upload path
const uploadPath = path.join(__dirname, "../", "public", "shipforme");

//multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer init
const upload = multer({ storage: storage }); */

//? GET /ship-for-me -- ship for me page
router.get("/", (req, res, next) => {
  try {
    res.render("pages/shipments", {
      title: "Alizon - Ship for me",
      user: req.user || "",
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//? POST /ship-for-me -- post products
/* router.post(
  "/",
  ensureAuth,
  upload.array("prod_image", 3),
  async (req, res, next) => {
    try {
      //console.log(req.body);
      let imageLinks = [];
      req.files.forEach((file) => {
        let compressedImgPath = path.join(
          __dirname,
          "../",
          "public/shipforme",
          `${req.user.id}-${new Date().getTime()}${path.extname(
            file.originalname
          )}`
        );

        sharp(file.path)
          .resize(640, 480, {
            fit: "inside",
          })
          .jpeg({
            quality: 70,
            chromaSubsampling: "4:4:4",
          })
          .toFile(compressedImgPath, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              fs.unlink(file.path, (err) => {
                if (err) console.log("sharp error", err);
              });
            }
          });
        let imageLink = compressedImgPath.substring(
          compressedImgPath.search(/shipforme/),
          compressedImgPath.length
        );
        imageLinks.push(imageLink);
      });

      let newShipMe = new ShipForMe({
        customer: req.user,
        ...req.body,
        imageLinks,
        created_At: Date.now(),
      });

      let msg = await newShipMe.save();
      console.log(msg);

      res.redirect(`/user/shipments/${req.user.id}`);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
); */

module.exports = router;
