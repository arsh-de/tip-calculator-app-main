const billAmount = document.querySelector("#bill-amount");
const btn5 = document.querySelector("#btn-5");
const btn10 = document.querySelector("#btn-10");
const btn15 = document.querySelector("#btn-15");
const btn25 = document.querySelector("#btn-25");
const btn50 = document.querySelector("#btn-50");
const custom = document.querySelector("#custom");
const numberOfPeople = document.querySelector("#no-of-people");
const zeroWarning = document.querySelector(".zero");

const tipAmount = document.querySelector(".total-tip");
const tipAmountPerson = document.querySelector(".tip-amount-person");
const reset = document.querySelector(".reset");

let bill = 0;
let people = 0;
let tipPercent = 0;

const resetBtn = () => {
    billAmount.value = "";
    numberOfPeople.value = "";
    custom.value = "";
    tipAmount.textContent = "$0.00";
    tipAmountPerson.textContent = "$0.00";
    zeroWarning.classList.add("none");
    tipPercent = 0;
    document.querySelectorAll('.percent').forEach(btn => btn.classList.remove("clicked"));
};

const calculateTip = () => {
    if (people > 0 && bill > 0 && tipPercent > 0) {
        const tipTotal = (bill * tipPercent) / 100;
        const tipPerPerson = tipTotal / people;
        const totalPerPerson = (bill / people) + tipPerPerson;
        tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
        tipAmountPerson.textContent = `$${totalPerPerson.toFixed(2)}`;
        reset.removeAttribute("disabled")
        reset.classList.remove("reset:disabled")
    } else {
        tipAmount.textContent = "$0.00";
        tipAmountPerson.textContent = "$0.00";
    }
};

billAmount.addEventListener("input", () => {
    bill = Number(billAmount.value);
    calculateTip();
});

numberOfPeople.addEventListener("input", () => {
    people = Number(numberOfPeople.value);
    if (people === 0) {
        numberOfPeople.classList.add("warning");
        zeroWarning.classList.remove("none");
    } else {
        numberOfPeople.classList.remove("warning");
        zeroWarning.classList.add("none");
    }
    calculateTip();
});

const tipButtons = [btn5, btn10, btn15, btn25, btn50, custom];

tipButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        tipPercent = Number(btn.value);
        tipButtons.forEach(b => b.classList.remove("clicked"));
        btn.classList.add("clicked");
        calculateTip();
    });
});

custom.addEventListener("input", () => {
    tipPercent = Number(custom.value);
    if (tipPercent > 100) {
        alert("Custom percent cannot be greater than 100%");
        custom.value = "";
        tipPercent = 0; // Reset tipPercent if input is invalid
    }
    calculateTip();
});

reset.addEventListener("click", resetBtn);
