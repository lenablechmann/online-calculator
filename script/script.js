// making sure the DOM is loaded before the script is run
// using this instead of end of <body> for a more streamlined html
document.addEventListener("DOMContentLoaded", function () {

  // variables for DOM modification
  const digitsInput = document.querySelectorAll(".digit");
  const operatorInput = document.querySelectorAll(".operator");
  const display = document.querySelector(".user-input");
  const result = document.querySelector(".result");

  // variables for user input
  let displayedText = [];
  let userNumber = "";
  let numberStack = [];
  let operatorStack = [];
  const maxLength = 35;

  // AC - clear functionality
  document.getElementById("clear").onclick = function clearDisplay() {
    //clearing out all of the memory (hopefully, there aint no pointers here)
    displayedText = null;
    userNumber = null;
    numberStack = null;
    operatorStack = null;
    // setting arrays, so that .length can work everywhere
    displayedText = [];
    userNumber = "";
    numberStack = [];
    operatorStack = [];
    // resetting display as well
    display.textContent = "";
    result.textContent = "";
  };

  // append new user input digit to displayed string if number is plausible
  digitsInput.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const newDigit = this.id;
      if (checkNumber(userNumber + newDigit)) {
        userNumber += newDigit;
        display.textContent = (displayedText.join("") + userNumber).slice(-maxLength);
        result.textContent = "";
      }
    });
  });

  //what happens if you press an operator button
  operatorInput.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      // avoids operator spam
      if (userNumber.length > 0) {
        // pushing the newest numbers and operators to the beginning of the stack
        operatorStack.push(this.id);
        numberStack.unshift(userNumber);
        console.log(numberStack);

        // the display goes from left to right chronologically, thats why push()
        displayedText.push(userNumber);
        displayedText.push(this.id);
        userNumber = "";
        display.textContent = displayedText.join("").slice(-maxLength);
        result.textContent = "";
      }
    });
  });
  document.getElementById("equal").onclick = () =>{
      if (userNumber.length > 0) {
        // pushing the newest numbers and operators to the beginning of the stack
        numberStack.unshift(userNumber);
      }
    let calcResult = operateEqual(numberStack, operatorStack);
    console.log(calcResult);
    displayedText = [];
    userNumber = "";
    numberStack = [];
    operatorStack = [];
    display.textContent = "";

    if (calcResult === Infinity || calcResult === -Infinity){
      result.textContent = "Error";
    }
    else {
      result.textContent = calcResult;
    }
  };
});

// various functions

function checkNumber(numString) {
  // checks for duplicate . and 0 at start using regex
  // source: https://stackoverflow.com/questions/16779871/javascript-function-to-avoid-two-decimal-points-ex-12-1-1-in-html-input-text
  return /^[+-]?(([1-9][0-9]*)?[0-9](\.[0-9]*)?|\.[0-9]+)$/.test(numString);
}

function operateEqual(numberStack, operatorStack){
  //calculation functions obj
  const operate = {
        "+": (num1, num2) => num1 + num2,
        "-": (num1, num2) => num1 - num2,
        "*": (num1, num2) => num1 * num2,
        "/": (num1, num2) => num1 / num2,
    };
  let curResult = 0;

  // using reverse polish notation with the created stacks
  while(numberStack.length >= 2) {
      let firstOperator = operatorStack.shift();
      let num1 = parseFloat(numberStack.shift());
      let num2 = parseFloat(numberStack.shift());
      curResult = operate[firstOperator](num1,num2);
      numberStack.unshift(curResult);
  }
  return curResult;
}
