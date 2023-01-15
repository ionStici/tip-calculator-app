"use strict";

// const billMessage = document.querySelector(".calc__bill-message");
// billMessage.style.opacity = "1";
// billInput.style.border = "2px solid #E17052";

// const numMessage = document.querySelector(".calc__num-message");
// numMessage.style.opacity = "1";
// numPeopleInput.style.border = "2px solid #E17052";
// tipInput.style.border = "2px solid #E17052";

// SELECT ELEMENTS

const billInput = document.querySelector("#calc__bill__input");
const tipInput = document.querySelector(".calc__tip-input");
const tipBtns = document.querySelectorAll(".calc__tip-btn");
const numPeopleInput = document.querySelector("#calc__num-input");

const form = document.querySelector(".calc__col-1");

const tipResult = document.querySelector(".calc__result-tip");
const totalResult = document.querySelector(".calc__result-total");

const btn = document.querySelector(".calc__result-btn");

// RESET

btn.addEventListener("click", function () {
    if (btn.classList.contains("calc__result-btn--reset")) return;

    document.documentElement.style.setProperty("--hover", "#0d686d");

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

// VALIDATE

const calcTip = function (bill, tip, people) {
    if (!(bill && bill > 0)) return;
    if (!(tip && tip > 0 && tip <= 100)) return;
    if (!(people && people > 0)) return;

    const tipPerPerson = ((bill * (tip / 100)) / people).toFixed(2);
    const totalPerPerson = (bill / people).toFixed(2);

    tipResult.textContent = tipPerPerson;
    totalResult.textContent = totalPerPerson;

    // prettier-ignore
    if (tipResult.textContent !== "$0.00" &&totalResult.textContent !== "$0.00")
        btn.classList.remove("calc__result-btn--reset");
};

// SET ACTIVE BUTTONS

tipBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
        tipBtns.forEach((btn) => {
            btn.classList.remove("calc__tip-btn--active");
        });

        btn.classList.add("calc__tip-btn--active");

        calcTip(
            billInput.value,
            Number.parseInt(btn.textContent, 10),
            numPeopleInput.value
        );
    });
});

// SUBMIT
form.addEventListener("submit", function (e) {
    e.preventDefault();
    calcTip(billInput.value, tipInput.value, numPeopleInput.value);
});

billInput.addEventListener("focusout", function () {
    calcTip(billInput.value, tipInput.value, numPeopleInput.value);
});

tipInput.addEventListener("focusout", function () {
    let tip;

    tipBtns.forEach((btn) => {
        if (btn.classList.contains("calc__tip-btn--active")) {
            tip = Number.parseInt(btn.textContent, 10);
            calcTip(billInput.value, tip, numPeopleInput.value);
        }
    });

    if (!tip) calcTip(billInput.value, tipInput.value, numPeopleInput.value);
});

numPeopleInput.addEventListener("focusout", function () {
    calcTip(billInput.value, tipInput.value, numPeopleInput.value);
});
