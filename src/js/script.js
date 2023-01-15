"use strict";

// SELECT ELEMENTS

const billMessage = document.querySelector(".calc__bill-message");
const numMessage = document.querySelector(".calc__num-message");

const billInput = document.querySelector("#calc__bill__input");
const tipInput = document.querySelector(".calc__tip-input");
const tipBtns = document.querySelectorAll(".calc__tip-btn");
const numPeopleInput = document.querySelector("#calc__num-input");

const tipResult = document.querySelector(".calc__result-tip");
const totalResult = document.querySelector(".calc__result-total");
const btn = document.querySelector(".calc__result-btn");

// RESET

btn.addEventListener("click", function () {
    if (btn.classList.contains("calc__result-btn--reset")) return;

    document.documentElement.style.setProperty("--hover", "#0d686d");
    btn.classList.add("calc__result-btn--reset");

    billInput.style.border = "2px solid transparent";
    tipInput.style.border = "2px solid transparent";
    numPeopleInput.style.border = "2px solid transparent";

    tipResult.textContent = "$0.00";
    totalResult.textContent = "$0.00";

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

    // tipInput.style.border = "2px solid #26c2ae";
    // numPeopleInput.style.border = "2px solid #26c2ae";
    // billInput.style.border = "2px solid #26c2ae";

    // prettier-ignore
    if (tipResult.textContent !== "$0.00" &&totalResult.textContent !== "$0.00")
        btn.classList.remove("calc__result-btn--reset");
};

// SET ACTIVE BUTTONS

tipBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        tipInput.value = "";
        tipInput.style.border = "2px solid transparent";

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
window.addEventListener("keypress", function (e) {
    if (e.key !== "Enter") return;

    if (e.key === "Enter")
        calcTip(billInput.value, tipInput.value, numPeopleInput.value);

    tipBtns.forEach((btn) => {
        btn.classList.remove("calc__tip-btn--active");
    });
});

// INPUTS

billInput.addEventListener("focusout", function () {
    if (!(billInput.value && billInput.value > 0)) {
        billMessage.style.opacity = "1";
        billInput.style.border = "2px solid #E17052";
    } else {
        billMessage.style.opacity = "0";
        billInput.style.border = "2px solid #26c2ae";
    }

    calcTip(billInput.value, tipInput.value, numPeopleInput.value);
});

tipInput.addEventListener("focusout", function () {
    let tip;

    if (!(tipInput.value && tipInput.value > 0 && tipInput.value <= 100)) {
        tipInput.style.border = "2px solid #E17052";
    } else {
        tipBtns.forEach((btn) => btn.classList.remove("calc__tip-btn--active"));
        tipInput.style.border = "2px solid #26c2ae";
    }

    tipBtns.forEach((btn) => {
        if (btn.classList.contains("calc__tip-btn--active")) {
            tip = Number.parseInt(btn.textContent, 10);
            calcTip(billInput.value, tip, numPeopleInput.value);
        }
    });

    if (!tip) calcTip(billInput.value, tipInput.value, numPeopleInput.value);
});

numPeopleInput.addEventListener("focusout", function () {
    if (!(numPeopleInput.value && numPeopleInput.value > 0)) {
        numMessage.style.opacity = "1";
        numPeopleInput.style.border = "2px solid #E17052";
        return;
    } else {
        numMessage.style.opacity = "0";

        numPeopleInput.style.border = "2px solid #26c2ae";
    }

    calcTip(billInput.value, tipInput.value, numPeopleInput.value);
});

// END
