"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('input');
    const number = document.querySelectorAll('.numbers div');
    const operator = document.querySelectorAll('.operators div');
    const result = document.getElementById('result');
    const clear = document.getElementById('clear');
    let resultDisplayed = false;
    // Funksiyalar
    function appendInput(value) {
        input.innerHTML += value;
    }
    function clearInput() {
        input.innerHTML = "";
    }
    function calculateResult() {
        const inputString = input.innerHTML;
        const numbers = inputString.split(/\+|\-|\×|\÷/g).map(num => parseFloat(num)); // Sonlar massivini o'zgartirdik
        const operators = inputString.replace(/[0-9]|\./g, "").split("");
        console.log("Input String:", inputString);
        console.log("Operators:", operators);
        console.log("Numbers:", numbers);
        console.log("----------------------------");
        let divide = operators.indexOf("÷");
        while (divide !== -1) {
            numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
            operators.splice(divide, 1);
            divide = operators.indexOf("÷");
        }
        let multiply = operators.indexOf("×");
        while (multiply !== -1) {
            numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
            operators.splice(multiply, 1);
            multiply = operators.indexOf("×");
        }
        let subtract = operators.indexOf("-");
        while (subtract !== -1) {
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
            operators.splice(subtract, 1);
            subtract = operators.indexOf("-");
        }
        let add = operators.indexOf("+");
        while (add !== -1) {
            numbers.splice(add, 2, numbers[add] + numbers[add + 1]);
            operators.splice(add, 1);
            add = operators.indexOf("+");
        }
        input.innerHTML = numbers[0].toString();
        resultDisplayed = true;
    }
    // Sonlar uchun hodislar
    for (let i = 0; i < number.length; i++) {
        number[i].addEventListener("click", function () {
            const currentString = input.innerHTML;
            const lastChar = currentString[currentString.length - 1];
            if (resultDisplayed === false) {
                appendInput(this.innerHTML);
            }
            else if (resultDisplayed === true && (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷")) {
                resultDisplayed = false;
                appendInput(this.innerHTML);
            }
            else {
                resultDisplayed = false;
                clearInput();
                appendInput(this.innerHTML);
            }
        });
    }
    // Operatorlar uchun hodislar
    for (let i = 0; i < operator.length; i++) {
        operator[i].addEventListener("click", function () {
            const currentString = input.innerHTML;
            const lastChar = currentString[currentString.length - 1];
            if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
                const newString = currentString.substring(0, currentString.length - 1) + this.innerHTML;
                input.innerHTML = newString;
            }
            else if (currentString.length === 0) {
                console.log("Enter a number first");
            }
            else {
                appendInput(this.innerHTML);
            }
        });
    }
    // Natijani hisoblash hodisi
    result.addEventListener("click", function () {
        calculateResult();
    });
    // "Clear" tugmasi uchun hodis
    clear.addEventListener("click", function () {
        clearInput();
    });
});
//# sourceMappingURL=index.js.map