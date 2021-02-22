"use strict";
// document.addEventListener("DOMContentLoaded", function () {

// });
/* 
*cart functionaloties:
?-addtocart
?-render ui
?-quantity increment/decrement
?-remove item/items
?-proceed to pay(submit form)
*/

//const
const cartContainer = document.querySelector(".az-cart-product");
const addtocartBtn = document.getElementById("az-AddToCart-btn");
const cartWrapper = document.querySelector(".az-cart-container");
const azCartIcon = document.querySelector(".az-cart");
const emptyCart = document.querySelector(".az-cart-empty");
const cartClearAll = document.querySelector(".az-cart-clearALl");
const cartBottom = document.querySelector(".az-cart-bottom");

//global vars
let cartRendered = false;
/* const quantityInp = document.querySelector(".az-prod-quantity");
quantityInp.addEventListener("change", (event) => {
  updatePrice(productDetails.price, event.target.value);
}); */

//show cart container
azCartIcon.addEventListener("click", (e) => {
  cartWrapper.classList.add("show");
  if (!cartRendered) {
    let productDetails = JSON.parse(localStorage.getItem("azcart"));
    if (productDetails) {
      cartClearAll.style.display = "block";
      emptyCart.style.display = "none";
      renderUI(productDetails);
      cartRendered = true;
      showTotalPrice();
      cartClearQntIncrement();
    }
  }
});

//add product to cart
if (addtocartBtn) {
  addtocartBtn.addEventListener("click", () => {
    let productDetails = getProductDetails();
    let variantSpan = document.querySelector(".az-product-variant");
    let sizeSpan = document.querySelector(".az-product-size-main");

    if (productDetails.variant === "" && productDetails.size === "") {
      variantSpan.textContent = "Please select a variant";
      sizeSpan.textContent = "Please select a size";
    } else if (
      productDetails.variant === "" ||
      productDetails.variant === "Please select a variant"
    ) {
      //alert("Please select a variant or size");
      variantSpan.style.color = "red";
      variantSpan.textContent = "Please select a variant";
    } else if (
      productDetails.size === "" ||
      productDetails.size === "Please select a size"
    ) {
      sizeSpan.style.color = "red";
      sizeSpan.textContent = "Please select a size";
    } else {
      addtocartBtn.disabled = true;
      addtocartBtn.textContent = "In Cart";
      emptyCart.style.display = "none";

      //add product info
      addItems(productDetails);
      //update cat items value
      updateCartValue();
      //update total price
      updateTotalPrice(
        productDetails.price,
        productDetails.quantity,
        "increment"
      );
    }
  });
}

//clear all cart items
if (cartClearAll) {
  cartClearAll.addEventListener("click", () => {
    localStorage.clear();
    showCartValue();
    showTotalPrice();
    cartContainer.innerHTML = "";
    cartContainer.style.display = "none";
    emptyCart.style.display = "flex";
    if (addtocartBtn) {
      addtocartBtn.disabled = false;
      addtocartBtn.textContent = "Add to Cart";
    }
    cartBottom.classList.add("hide");
    cartClearAll.style.display = "none";
  });
}

//=============================================//
//* check if the product already in the cart   //
//=============================================//
function checkProductInCart() {
  let product = document.querySelector(".az-product-title");
  let productId = "";
  if (product) {
    productId = product.getAttribute("data-id");
  }
  let productsInCart = localStorage.getItem("azcart");
  if (productId && productsInCart) {
    let products = JSON.parse(productsInCart);
    let inCart = products.findIndex((product) => product.id == productId);
    console.log(inCart);
    if (inCart >= 0) {
      addtocartBtn.disabled = true;
      addtocartBtn.textContent = "Already in Cart";
    } else {
      addtocartBtn.disabled = false;
      addtocartBtn.textContent = "Add to Cart";
    }
  }
}

//========================//
//* get product details   //
//========================//
function getProductDetails() {
  //query product details
  let productTitle = document.querySelector(".az-product-title"),
    price = document.querySelector(".az-product-price").dataset.price,
    variantSpan = document.querySelector(".az-product-variant"),
    variant = variantSpan.innerText,
    imgSrc = variantSpan.getAttribute("data-img"),
    size = document.querySelector(".az-product-size-main").innerText,
    quantity = document.getElementById("az-quantity-field").value,
    maxAvailable = document
      .querySelector(".az-product-qnt-max")
      .textContent.trim(),
    shipping = document.getElementById("az-shipping").value;
  if (quantity == 0) quantity = 1;
  return {
    productId: productTitle.getAttribute("data-id"),
    title: productTitle.textContent.trim(),
    img: imgSrc,
    price: parseInt(price, 10),
    variant,
    size,
    quantity: parseInt(quantity, 10),
    max: parseInt(maxAvailable, 10),
    shipping,
  };
}

//================//
//* render ui    //
//===============//
function renderUI(products) {
  console.log("rendered");
  cartContainer.innerHTML = "";
  cartContainer.style.display = "block";
  cartBottom.classList.remove("hide");

  products.forEach((product) => {
    let productDetails = `<div class="az-cart-prod-details">
        <img src="${product.img}" 
          class="img-fluid" alt="${product.title.substring(0, 10)}..." />
          <div class="az-cart-prod-info">
              <h5 title="${product.title}" data-id="${product.id}"> 
              ${product.title.substring(0, 30)} </h5>
              <div id="az-product-quantity" class='inp-num'>
                <button class='btn step stepdown' 
                  data-id="${product.id}" data-price="${product.price}"> 
                  <i class='fa fa-minus'></i>
                </button>
                <input type='number' min='1' max="${product.max}" 
                  value='${product.quantity}' class='input-num' readonly>
                <button class='btn step stepup' 
                  data-id="${product.id}" data-price="${product.price}"> 
                  <i class='fa fa-plus'></i> 
                </button>
                <span class="az-product-qty-avail"> 
                  ${product.max} available. 
                </span>
              </div>
              <span>৳${product.price}</span>
          </div>
          <button class="btn az-cart-prod-remove" type="button" 
            data-id="${product.id}" data-price="${product.price}">
          <i class="fa fa-trash"></i>
          </button>
    </div>`;

    cartContainer.innerHTML += productDetails;
  });
}

//======================//
//* show total price   //
//=====================//
function showTotalPrice() {
  let totalPriceSpan = document.querySelector("#az-prod-price-total span");
  totalPriceSpan.textContent = localStorage.getItem("azTotalPrice") || 0;
}
//=========================//
//* updating total price   //
//=========================//
function updateTotalPrice(price, quantity, reason) {
  let totalPrice = localStorage.getItem("azTotalPrice");
  if (totalPrice) {
    //update
    if (reason === "increment") {
      let total = parseFloat(price) * parseInt(quantity);
      let newTotal = Math.round(total) + Number(totalPrice);
      localStorage.setItem("azTotalPrice", newTotal);
    } else if (reason === "decrement") {
      let total = parseFloat(price) * parseInt(quantity);
      let newTotal = Number(totalPrice) - Math.round(total);
      localStorage.setItem("azTotalPrice", newTotal);
    }
  } else {
    //set price
    let total = Math.round(parseFloat(price) * parseInt(quantity));
    localStorage.setItem("azTotalPrice", total);
  }
}

//=============================//
//* show cart items value      //
//=============================//
function showCartValue() {
  let cartItems = document.querySelector(".az-cart span");
  cartItems.textContent = localStorage.getItem("azCartItems") || 0;
}

//=============================//
//* update cart items value    //
//=============================//
function updateCartValue() {
  let cartItems = document.querySelector(".az-cart span");
  let cartItemsValue = localStorage.getItem("azCartItems");
  if (cartItemsValue) {
    localStorage.setItem("azCartItems", Number(cartItemsValue) + 1);
  } else {
    localStorage.setItem("azCartItems", 1);
  }
  cartItems.textContent = localStorage.getItem("azCartItems");
}

//=============================//
//* decrese cart items value   //
//=============================//
function removeCartValue(amount) {
  let cartItemsValue = localStorage.getItem("azCartItems");
  switch (amount) {
    case "single":
      let updatedValue = Number(cartItemsValue) - 1;
      localStorage.setItem("azCartItems", updatedValue);
      break;
    case "all":
      localStorage.setItem("azCartItems", 0);
    default:
      break;
  }
}

//===============================//
//* add items to localStorage    //
//===============================//
function addItems(product) {
  cartRendered = false;
  let cartStorage = localStorage.getItem("azcart");
  if (cartStorage) {
    let updatedCart = JSON.parse(cartStorage);
    updatedCart.push(product);
    localStorage.setItem("azcart", JSON.stringify(updatedCart));
  } else {
    let Cart = [];
    Cart.push(product);
    localStorage.setItem("azcart", JSON.stringify(Cart));
  }
}

//========================================//
//* update items quantity in local storage  //
//========================================//
function updateProdQnty(reason, id) {
  let productsInCart = JSON.parse(localStorage.getItem("azcart"));
  let index = productsInCart.findIndex((product) => product.id === id);
  let product = productsInCart.splice(index, 1)[0];
  let maxQuantity = product.max;
  let updatedQuantity;
  if (reason === "increment") {
    updatedQuantity = parseInt(product.quantity, 10) + 1;
    if (updatedQuantity > maxQuantity) updatedQuantity = maxQuantity;
  } else {
    updatedQuantity = parseInt(product.quantity, 10) - 1;
    if (updatedQuantity < 1) updatedQuantity = 1;
  }
  console.log(updatedQuantity);
  product.quantity = updatedQuantity;
  productsInCart.splice(index, 0, product);
  localStorage.setItem("azcart", JSON.stringify(productsInCart));
}

//===================//
//* remove items    //
//===================//
//remove single item and quantity increment decrement
function cartClearQntIncrement() {
  //remove a single item from cart
  let clearItemBtn = document.querySelectorAll(".az-cart-prod-remove");
  clearItemBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let prodID = btn.getAttribute("data-id");

      let products = JSON.parse(localStorage.getItem("azcart"));
      let updatedCart = products.filter((product) => product.id != prodID);
      localStorage.setItem("azcart", JSON.stringify(updatedCart));

      //total price update
      let prodPrice = btn.getAttribute("data-price");
      let input = btn.previousElementSibling.querySelector(".inp-num input");
      updateTotalPrice(prodPrice, input.value, "decrement");
      showTotalPrice();
      //cart item update
      removeCartValue("single");
      showCartValue();
      //check in single product
      checkProductInCart();
      //render cart ui
      renderUI(updatedCart);
      //call this for the btns to work
      cartClearQntIncrement();
    });
  });

  //quantity increment decrement
  let stepupBtns = document.querySelectorAll(".stepup");
  let stepdownBtns = document.querySelectorAll(".stepdown");

  stepupBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let input = btn.parentNode.querySelector(".input-num");
      let prodID = btn.getAttribute("data-id");
      updateProdQnty("increment", prodID);
      let price = btn.getAttribute("data-price");
      if (Number(input.value) < Number(input.max)) {
        updateTotalPrice(price, 1, "increment");
        showTotalPrice();
      }
      input.stepUp();
    });
  });

  stepdownBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let input = btn.parentNode.querySelector(".input-num");
      let prodID = btn.getAttribute("data-id");
      updateProdQnty("decrement", prodID);
      let price = btn.getAttribute("data-price");
      if (Number(input.value) > 1) {
        updateTotalPrice(price, 1, "decrement");
        showTotalPrice();
      }
      input.stepDown();
    });
  });
}

//===========================//
//* sending data to server   //
//===========================//
const sendData = async (productInfo) => {
  let productsInCart = productInfo;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: productsInCart,
    redirect: "follow",
  };

  try {
    let response = await fetch("/cart", requestOptions);
    let result = await response.text();
    console.log(result);
  } catch (error) {
    console.log("error", error);
  }
};

/* let proceedBtn = document.getElementById("az-cart-proceed");
proceedBtn.addEventListener("click", () => {
  let products = [];
  let cartProducts = JSON.parse(localStorage.getItem("azcart"));
  console.log(cartProducts);
  products = cartProducts.map((product) => {
    return {
      id: product.id,
      variant: product.variant,
      size: product.size,
      quantity: product.quantity,
      shipping: product.shipping,
    };
  });
  sendData(JSON.stringify(products));
}); */

//=============================//
//*this functions are called every time page is loaded
//===========================//
//display number of products in cart
showCartValue();
//show total price of products in cart
showTotalPrice();
//check if a product is in the cart or not
checkProductInCart();
