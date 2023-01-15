"use strict";

const billInput = document.querySelector("#calc__bill__input");
const tipInput = document.querySelector(".calc__tip-input");
const tipBtns = document.querySelectorAll(".calc__tip-btn");
const numPeopleInput = document.querySelector("#calc__num-input");

const tipResult = document.querySelector(".calc__result-tip");
const totalResult = document.querySelector(".calc__result-total");

const btn = document.querySelector(".calc__result-btn");

btn.addEventListener("click", function () {
    if (btn.classList.contains("calc__result-btn--reset")) return;

    tipResult.textContent = "$0.00";
    totalResult.textContent = "$0.00";
    btn.classList.add("calc__result-btn--reset");

    billInput.value = "";
    tipInput.value = "";
    numPeopleInput.value = "";

    tipBtns.forEach((btn) => {
        btn.classList.remove("calc__tip-btn--active");
    });
});

// if (tipResult.textContent !== "$0.00" && totalResult.textContent !== "$0.00")
//     btn.classList.remove("calc__result-btn--reset");
