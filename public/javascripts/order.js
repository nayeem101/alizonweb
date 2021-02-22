// message
let message = document.querySelectorAll(".az-order-message");
// table
let table = document.getElementById("az-order-table");
let tbody = table.getElementsByTagName("tbody")[0];
//total price
let totalPrice = document.querySelector(".az-total-price h4");

//show message and hide other details
function showMessage(msg) {
  table.style.display = "none";
  message[1].classList.remove("hide");
  message[1].innerText = `${msg}`;
  document.querySelector(".az-order-bottom").remove();
  document.querySelector(".az-order-pay").remove();
  totalPrice.parentElement.style.display = "none";
}

// render orders
let productsInCart = localStorage.getItem("azcart");
if (productsInCart) {
  document.querySelector(".az-cart").style.display = "none";
  document.querySelector(".az-order-bottom2").style.display = "none";
  let products = JSON.parse(productsInCart);
  products.forEach((product, index) => {
    tbody.innerHTML += `<tr scope='row'>
       <td>${index + 1}</td>
       <td>${product.productId}</td>
       <td>${product.title.substring(0, 30)}</td>
       <td>৳${product.price}</td>
       <td>${product.quantity}</td>
       <td>৳${parseInt(product.quantity) * parseInt(product.price)}</td>
       <td><input type="text" class="form-control az-trxID" 
            id='trxID${index + 1}' data-id='${product.id}' 
            placeholder='Enter TrxID'/>
       </td>
       <td class='text-center'>
        <div class="dropdown">
          <button class="btn btn-sm btn-info dropdown-toggle" type="button" id="dropActions" 
            data-toggle="dropdown" title='action' aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
          </button>
          <div class="dropdown-menu drop-menu-action" aria-labelledby="dropActions">
            <a class="dropdown-item" data-id="${product.id}"> 
             <i class="fa fa-pencil-square-o mr-1"></i>Edit
            </a>
            <a class="dropdown-item" data-id="${product.id}">
              <i class="fa fa-trash mr-2"></i>Delete
            </a>
          </div>
        </div>  
       </td>
      </tr>`;
  });
} else {
  showMessage(
    "Your have no Products on cart. Go to home page and Order Some Products"
  );
}

//SHOW total price
function showTotalPrice() {
  totalPrice.innerText = `Total Price: ৳${
    localStorage.getItem("azTotalPrice") || 0
  }`;
}

//set trxIDs to localStorage
function setTrxIDs() {
  let inputs = document.querySelectorAll(".az-trxID");
  inputs.forEach((item) => {
    item.addEventListener("change", function () {
      this.style.backgroundColor = "inherit";
      let prodID = this.getAttribute("data-id");
      let products = JSON.parse(productsInCart);
      let index = products.findIndex((product) => product.id === prodID);
      let product = products.splice(index, 1)[0];
      product.trxID = this.value;
      products.splice(index, 0, product);
      localStorage.setItem("azcart", JSON.stringify(products));
      console.log("product updated");
    });
  });
}

//=======================//
//* set address //
//======================//
let Chandpur = {
  "Chandpur Sadar": [
    { area: "Baburhat", zip_code: 3602 },
    { area: "Chandpur Sadar", zip_code: 3600 },
    { area: "Puranbazar", zip_code: 3601 },
    { area: "Sahatali", zip_code: 3603 },
  ],
  Faridganj: [
    { area: "Chandra", zip_code: 3651 },
    { area: "Faridganj", zip_code: 3650 },
    { area: "Gridkaliandia", zip_code: 3653 },
    { area: "Rampurbazar", zip_code: 3654 },
    { area: "Rupsha", zip_code: 3652 },
  ],
  Hajiganj: [
    { area: "Bolakhal", zip_code: 3611 },
    { area: "Hajiganj", zip_code: 3610 },
  ],
  Hayemchar: [
    { area: "Gandamara", zip_code: 3661 },
    { area: "Hayemchar", zip_code: 3660 },
  ],
  Kachua: [
    { area: "Kachua", zip_code: 3630 },
    { area: "Pak Shrirampur", zip_code: 3631 },
    { area: "Rahima Nagar", zip_code: 3632 },
    { area: "Shachar", zip_code: 3633 },
  ],
  Matlobganj: [
    { area: "Kalipur", zip_code: 3642 },
    { area: "Matlobganj", zip_code: 3640 },
    { area: "Mohanpur", zip_code: 3641 },
  ],
  Shahrasti: [
    { area: "Chotoshi", zip_code: 3623 },
    { area: "Khilabazar", zip_code: 3621 },
    { area: "UNKILA", zip_code: 3620 },
  ],
};
let Comilla = {
  Barura: [
    { area: "Barura", zip_code: 3560 },
    { area: "Murdafarganj", zip_code: 3562 },
    { area: "Poyalgachha", zip_code: 3561 },
  ],
  Brahmanpara: [{ area: "Brahmanpara", zip_code: 3526 }],
  Burichang: [
    { area: "Burichang", zip_code: 3520 },
    { area: "Maynamoti bazar", zip_code: 3521 },
  ],
  Chandina: [
    { area: "Chandina", zip_code: 3510 },
    { area: "Madhaiabazar", zip_code: 3511 },
    { area: "Mohichail", zip_code: 3510 },
  ],
  Chouddagram: [
    { area: "Batisa", zip_code: 3551 },
    { area: "Chiora", zip_code: 3552 },
    { area: "Chouddagram", zip_code: 3550 },
  ],
  "Comilla Sadar": [
    { area: "Comilla Contoment", zip_code: 3501 },
    { area: "Comilla Sadar", zip_code: 3500 },
    { area: "Courtbari", zip_code: 3503 },
    { area: "Halimanagar", zip_code: 3502 },
    { area: "Suaganj", zip_code: 3504 },
  ],
  Daudkandi: [
    { area: "Dashpara", zip_code: 3518 },
    { area: "Daudkandi", zip_code: 3516 },
    { area: "Eliotganj", zip_code: 3519 },
    { area: "Gouripur", zip_code: 3517 },
  ],
  Davidhar: [
    { area: "Barashalghar", zip_code: 3532 },
    { area: "Davidhar", zip_code: 3530 },
    { area: "Dhamtee", zip_code: 3533 },
    { area: "Gangamandal", zip_code: 3531 },
  ],
  Homna: [{ area: "Homna", zip_code: 3546 }],
  Laksam: [
    { area: "Bipulasar", zip_code: 3572 },
    { area: "Laksam", zip_code: 3570 },
    { area: "Lakshamanpur", zip_code: 3571 },
  ],
  Langalkot: [
    { area: "Chhariabazar", zip_code: 3582 },
    { area: "Dhalua", zip_code: 3581 },
    { area: "Gunabati", zip_code: 3583 },
    { area: "Langalkot", zip_code: 3580 },
  ],
  Muradnagar: [
    { area: "Bangra", zip_code: 3543 },
    { area: "Companyganj", zip_code: 3542 },
    { area: "Muradnagar", zip_code: 3540 },
    { area: "Pantibazar", zip_code: 3545 },
    { area: "Ramchandarpur", zip_code: 3541 },
    { area: "Sonakanda", zip_code: 3544 },
  ],
};

const districts = {
  Comilla,
  Chandpur,
};

function setZipCode(zipcode) {
  let zipInput = document.getElementById("az-add-zip");
  zipInput.value = zipcode || "";
}

function setArea(upazilla) {
  let areaSelect = document.getElementById("az-add-vill");
  areaSelect.innerHTML = "<option selected vlaue=''>Select Local Area</option>";
  if (upazilla !== undefined) {
    for (let areaName of upazilla) {
      areaSelect.innerHTML += `<option data-zip='${areaName.zip_code}'>${areaName.area}</option>`;
    }
    areaSelect.addEventListener("change", function (e) {
      let zipData = this.options[this.options.selectedIndex].dataset;
      setZipCode(zipData.zip);
    });
  }
}

function setUpazilla(districtName) {
  let currentDistrict = districts[districtName];
  let upazillaSelect = document.getElementById("az-add-upazilla");
  upazillaSelect.innerHTML =
    "<option selected vlaue=''>Select Upazilla</option>";
  for (const upazilla in currentDistrict) {
    upazillaSelect.innerHTML += `<option>${upazilla}</option>`;
  }
  upazillaSelect.addEventListener("change", function () {
    let upz = this.value;
    setArea(currentDistrict[upz]);
  });
}

function setDistricts() {
  let distSelect = document.getElementById("az-add-dist");
  distSelect.addEventListener("change", function (e) {
    setUpazilla(this.value);
  });
}

//=======================//
//* get customer address //
//======================//
function getCustomerAddress() {
  //inputs
  let districtInp = document.getElementById("az-add-dist"),
    upazillaInp = document.getElementById("az-add-upazilla"),
    areaInp = document.getElementById("az-add-vill"),
    zipCodeInp = document.getElementById("az-add-zip"),
    streetInp = document.getElementById("az-add-street"),
    contactNumInp = document.getElementById("az-add-mobile"),
    checkboxInp = document.getElementById("az-check-default-address");

  return {
    district: districtInp.value || "",
    upazilla: upazillaInp.value || "",
    area: areaInp.value || "",
    zipcode: zipCodeInp.value || "",
    street: streetInp.value || "",
    contactNum: contactNumInp.value || "",
    setDefault: checkboxInp.checked || false,
  };
}

//===========================//
//* sending data to server   //
//===========================//
const sendData = async (productInfo, address) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let data = {
    productInfo: JSON.parse(productInfo),
    address,
  };
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };

  try {
    let response = await fetch("/order", requestOptions);
    let result = await response.text();
    if (result === "ok") {
      //clear the orders
      localStorage.clear();
      showMessage(
        "Your Order is recieved successfully! You will get a confirmation Email and a SMS. Thanks a lot!"
      );
      let orderBottomBtn = document.querySelector(".az-order-bottom2 a");
      orderBottomBtn.parentElement.style.display = "block";
      orderBottomBtn.innerText = "View Orders";
      orderBottomBtn.href = "/user/order";
    }
    console.log(result);
  } catch (error) {
    showMessage(
      "Problem placing Order! Please try again. Sorry for this inconvanience"
    );
    console.log("error", error);
  }
};

//================//
//* complete order//
//===============//
let orderBtn = document.getElementById("az-order-btn");
if (orderBtn) {
  orderBtn.addEventListener("click", (e) => {
    let productsInCart = localStorage.getItem("azcart");
    let address = getCustomerAddress();
    console.log(address);
    /*
    if (errs.length > 0) {
      message[0].classList.remove("hide");
      message[0].innerText = "Please fill up all the required fields";
    }*/

    let trxInputs = Array.from(document.querySelectorAll(".az-trxID"));
    let blacnkTrxInp = trxInputs.filter((inp) => inp.value === "");
    if (blacnkTrxInp.length > 0) {
      trxInputs.forEach((inp) => (inp.style.backgroundColor = "orange"));
      message[1].classList.remove("hide");
      message[1].innerText = "Please Pay & fill all transaction IDS";
    } else {
      sendData(productsInCart, address);
    }
  });
}

//inits every page load
setDistricts();
setTrxIDs();
showTotalPrice();
