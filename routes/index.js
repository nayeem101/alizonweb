const express = require("express");
const router = express.Router();

// product model
const Products = require("../models/Products");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    // products
    let dress = await Products.find(
      { categoryId: "M10" },
      {
        title: 1,
        productId: 1,
        categoryId: 1,
        images: 1,
        originalPrice: 1,
        salePrice: 1,
        orders: 1,
      }
    );

    let shoes = await Products.find(
      { categoryId: "M11" },
      {
        title: 1,
        productId: 1,
        categoryId: 1,
        images: 1,
        originalPrice: 1,
        salePrice: 1,
        orders: 1,
      }
    );

    let watches = await Products.find(
      { categoryId: "M12" },
      {
        title: 1,
        productId: 1,
        categoryId: 1,
        images: 1,
        originalPrice: 1,
        salePrice: 1,
        orders: 1,
      }
    );

    let makeups = await Products.find(
      { categoryId: "M14" },
      {
        title: 1,
        productId: 1,
        categoryId: 1,
        images: 1,
        originalPrice: 1,
        salePrice: 1,
        orders: 1,
      }
    );
    let electronics = await Products.find(
      { categoryId: "M13" },
      {
        title: 1,
        productId: 1,
        categoryId: 1,
        images: 1,
        originalPrice: 1,
        salePrice: 1,
        orders: 1,
      }
    );
    let categories = [
      { name: "Dress & Outfits", img: "/icons/shirt.svg" },
      { name: "Shoes & Footware", img: "/icons/shoe.svg" },
      { name: "Watches & Trackers", img: "/icons/watch.svg" },
      { name: "Consumer Electronics", img: "/icons/laptop.svg" },
      { name: "Makeup & Cosmetics", img: "/icons/cosmetics.svg" },
      { name: "Smartphone Accesories", img: "/icons/smartphone.svg" },
      { name: "Bags & Wallets", img: "/icons/bag.svg" },
      { name: "Toys & Sports", img: "/icons/toys.svg" },
      { name: "Tools & Appliances", img: "/icons/tools.svg" },
    ];

    let topProducts = [
      await dress[1],
      await shoes[2],
      await watches[1],
      await makeups[3],
      await electronics[3],
    ];

    // console.log(topProducts);

    res.render("home", {
      title: "Alizon - e-commerce platform - wholesale, import products",
      user: req.user || "",
      categories,
      topProducts,
      dress,
      shoes,
      watches,
      electronics,
      makeups,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//? GET single product
router.get("/products/:id", async (req, res, next) => {
  try {
    let id = req.params.id;

    let productInfo = await Products.findOne({ productId: id }).exec();
    let product = {
      title: await productInfo.title,
      categoryId: await productInfo.categoryId,
      productId: await productInfo.productId,
      totalAvailableQuantity: await productInfo.totalAvailableQuantity,
      orders: await productInfo.orders,
      images: await productInfo.images,
      specs: await productInfo.specs,
      currency: await productInfo.currency,
      originalPrice: await productInfo.originalPrice,
      salePrice: await productInfo.salePrice,
      variants: (await productInfo.variants.options[0]) || {
        name: "Variant",
        values: [{ name: "A", image: "/icons/product.svg" }],
      },
      sizes: (await productInfo.variants.options[1]) || {
        name: "Size",
        values: [{ name: "10" }],
      },
    };

    let recomended = await Products.find(
      {
        categoryId: product.categoryId,
      },
      {
        title: 1,
        productId: 1,
        images: 1,
        salePrice: 1,
      }
    ).limit(3);

    let categories = [
      { name: "Dress & Outfits", img: "/icons/shirt.svg" },
      { name: "Shoes & Footware", img: "/icons/shoe.svg" },
      { name: "Watches & Trackers", img: "/icons/watch.svg" },
      { name: "Consumer Electronics", img: "/icons/laptop.svg" },
      { name: "Makeup & Cosmetics", img: "/icons/cosmetics.svg" },
      { name: "Smartphone Accesories", img: "/icons/smartphone.svg" },
      { name: "Bags & Wallets", img: "/icons/bag.svg" },
      { name: "Toys & Sports", img: "/icons/toys.svg" },
      { name: "Tools & Appliances", img: "/icons/tools.svg" },
    ];
    // console.log(recomended);

    res.render("pages/single-product", {
      title: `Alizon product - ${productInfo.title.substring(0, 15)}`,
      user: req.user || "",
      categories,
      product,
      recomended,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//? GET Cost calculator
router.get("/cost-calculator", (req, res, next) => {
  try {
    res.render("pages/cost-calculator", {
      title: "Alizon - Cost Calculator",
      user: req.user || "",
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

/* //? GET Cost calculations
router.get("/cost-calculations", (req, res, next) => {
  try {
    let priceList = [
      { no: 1, category: "Mixed product of different item", price: 750 },
      { no: 2, category: "Cloths (All type)", price: 750 },
      { no: 3, category: "Shoes & Accessories  (All type)", price: 650 },
      { no: 4, category: "Watches (All type)", price: 750 },
      { no: 5, category: "Luggage, Bags & Cases (All type)", price: 720 },
      { no: 6, category: "Sunglass", price: 1020 },
      { no: 7, category: "Fashion Accessories", price: "" },
      { no: 8, category: "Sports & Entertainment (All type)", price: 750 },
      { no: 9, category: "Jewelry (Normal products)", price: 750 },
      { no: 10, category: "Electrical item (All type)", price: 750 },
      {
        no: 11,
        category:
          "Computer and Mobile accessories  (without battery)\nExample: Headphone, charger cable etc",
        price: 780,
      },
      {
        no: 12,
        category:
          "Computer and Mobile accessories \n(with battery)\nExample: Power bank, Mobile battery",
        price: 1150,
      },
      { no: 13, category: "Children Toys", price: 780 },
      { no: 14, category: "Plastic products (All type)", price: 720 },
      {
        no: 15,
        category: "Metal products (Example: Bearing, Gear)",
        price: 680,
      },
      { no: 16, category: "Automobile, Vehicles Accessories", price: "620" },
      { no: 17, category: "Machinaries", price: 600 },
      { no: 18, category: "Ceramic & clay products", price: 630 },
      { no: 19, category: "Glass & Crystal products", price: 630 },
      { no: 20, category: "Wood, Bamboo & Board products", price: 680 },
      { no: 21, category: "Paper products", price: 680 },
      { no: 22, category: "Textile & Leather Product", price: 680 },
      { no: 23, category: "Lotion and beauty products", price: 720 },
      { no: 24, category: "Construction & Real Estate products", price: 720 },
      { no: 25, category: "Lights & Lighting (All type)", price: 720 },
      { no: 26, category: "Miscellaneous", price: "" },
      { no: 27, category: "Mobile(Android)", price: 4000 },
      { no: 28, category: "Mobile(Iphone)", price: 5000 },
      { no: 29, category: "Camera", price: 1000 },
      { no: 30, category: "Computer", price: 1250 },
    ];
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
 */
module.exports = router;
