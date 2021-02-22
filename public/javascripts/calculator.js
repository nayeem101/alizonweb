document.addEventListener("DOMContentLoaded", () => {
  console.log("calc");
  function calc() {
    //selectors
    let price = document.getElementById("calc-price"),
      currency = document.getElementById("calc-currency"),
      category = document.getElementById("calc-category"),
      origin = document.getElementById("calc-origin"),
      weight = document.getElementById("calc-weight"),
      shipping = document.getElementById("calc-shipping");

    // get input values
    function getValues() {
      if (
        !price.value ||
        !currency.value ||
        !category.value ||
        !origin.value ||
        !weight.value ||
        !shipping.value
      ) {
        let calcWrapper = document.querySelector(".az-calculator");
        console.log("please fill all the fields");
        let div = document.createElement("div");
        div.innerHTML = `<div class='alert alert-warning alert-dismissible fade show' role='alert'>
        please fill all the fields
        <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>`;
        calcWrapper.insertAdjacentElement("afterbegin", div);
      } else {
        return {
          price: price.value,
          currency: currency.value,
          category: category.value,
          origin: origin.value,
          weight: weight.value,
          shipping: shipping.value,
        };
      }
    }

    // show calculations
    let calcTable = document.querySelector(".az-calculations table");
    let tbody = calcTable.querySelector("tbody");
    let fromChina = [
      {
        shipping: "XYZ",
        cost: 583,
        time: "7-15",
      },
      {
        shipping: "ABC",
        cost: 610,
        time: "7-15",
      },
      {
        shipping: "NPM",
        cost: 612,
        time: "7-15",
      },
    ];
    function showCalc(category = 2, weight = 1) {
      let data = fromChina[category];
      if (data) {
        tbody.innerHTML = "";
        tbody.innerHTML = `<tr>
            <th scope="row">1</th>
            <td>${data.shipping}</td>
            <td>$${data.cost} X ${weight}</td>
            <td>${data.time} days</td>
          </tr>`;
      } else {
      }
    }

    let calcBtn = document.getElementById("az-calc-btn");
    calcBtn.addEventListener("click", () => {
      let values = getValues();
      showCalc(values.category, values.weight);
      console.log(values);
    });
  }
  calc();
});
