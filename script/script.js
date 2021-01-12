document.addEventListener("DOMContentLoaded", function () {
  // making sure the DOM is loaded before the script is run
  // using this instead of end of <body> for a more streamlined html
  let displayedText = [];
  let userNumber = "";
  // arrays for reverse polish notation (unshift() will have to be used)
  let numberStack = [];
  let operatorStack = [];

  // variables for DOM modification
  const digitsInput = document.querySelectorAll(".digit");
  const operatorInput = document.querySelectorAll(".operator");
  const display = document.querySelector(".user-input");
  const result = document.querySelector(".result");

  // add a clear button functionality
  document.getElementById("clear").onclick = function clearDisplay() {
    //clearing out all of the memory (hopefully, there aint no pointers here)
    displayedText = null, userNumber = null, numberStack = null, operatorStack = null;
    // setting arrays, so that .length can work everywhere
    displayedText = [];
    userNumber = "";
    numberStack = [];
    operatorStack = [];
    // resetting display as well
    display.textContent = displayedText;
    result.textContent = displayedText;
  };
  // append new user input digit to displayed string if number is plausible
  digitsInput.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const newDigit = this.id;
      if (checkNumber(userNumber + newDigit)) {
        userNumber += newDigit;
        // if((displayedText.join("") + userNumber).length > )
        display.textContent = displayedText.join("") + userNumber;
      }
    });
  });

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
        display.textContent = displayedText.join("");
      }
    });
  });

});

// various functions


function checkNumber(numString) {
  // checks for duplicate . and 0 at start using regex
  // source: https://stackoverflow.com/questions/16779871/javascript-function-to-avoid-two-decimal-points-ex-12-1-1-in-html-input-text
  // I'm no RegEx wizard (yet?)
  return /^[+-]?(([1-9][0-9]*)?[0-9](\.[0-9]*)?|\.[0-9]+)$/.test(numString);
}
