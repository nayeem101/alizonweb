"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let wrapper = document.querySelector(".az-category-wrapper");

  let categories = Array.from(
    document.querySelectorAll(".az-categories-list-item")
  );
  let categoryList = Array.from(document.querySelectorAll(".az-category-item"));

  let currentActiveList = "";
  let currentActiveLink = "";

  wrapper.addEventListener("mouseleave", (e) => {
    if (
      currentActiveList &&
      (currentActiveList !== "" || currentActiveList !== "undefined")
    ) {
      currentActiveList.classList.add("hide");
    }
  });

  categories.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      currentActiveLink = link;
      let target = link.getAttribute("data-target");
      target = parseInt(target, 10);
      let targetDiv = categoryList[target];
      currentActiveList = targetDiv;

      categoryList.forEach((div, i) => {
        if (i !== target) div.classList.add("hide");
        else div.classList.remove("hide");
      });
    });
  });
});
