const buttons = document.querySelectorAll("button:not(.turnOn)");
const clearKey = document.querySelector(".btnClear");
const turnOnButton = document.querySelector(".turnOn");
const result = document.querySelector(".screen > p");
const keys = document.querySelector(".buttons");
const calculator = document.querySelector(".calculator");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button:not(.turnOn)")) {
    const key = e.target;
    const action = key.dataset.action;
    const resultNum = result.textContent;
    const previousKey = calculator.dataset.previousKey;

    if (e.target.matches(".btnClear")) {
      clearBoard();
    }

    if (!action) {
      if (result.textContent == "0" || previousKey == "operator") {
        result.textContent = key.textContent;
      } else {
        result.textContent = result.textContent + key.textContent;
      }
    }

    if (action == "decimal" && !resultNum.includes(".")) {
      result.textContent = resultNum + ".";
    }

    if (result.textContent == "0") {
      clearKey.textContent = "AC";
    } else {
      clearKey.textContent = "CE";
    }

    if (
      action == "add" ||
      action == "subtract" ||
      action == "multiply" ||
      action == "divide"
    ) {
      calculator.dataset.firstNumber = resultNum;
      calculator.dataset.operator = action;
      calculator.dataset.previousKey = "operator";
    } else if (!action) {
      calculator.dataset.previousKey = "number";
    } else if (action == "clear") {
      calculator.dataset.previousKey = "clear";
    } else if (action == "decimal") {
      calculator.dataset.previousKey = "decimal";
    } else if (action == "calculate") {
      calculator.dataset.previousKey = "calculate";
    }

    if (previousKey == "operator" && !resultNum == "" && action == "decimal") {
      result.textContent = "0.";
    }

    if (action == "calculate") {
      let firstNumber = calculator.dataset.firstNumber;
      const operator = calculator.dataset.operator;
      let secondNumber = resultNum;

      if (firstNumber && operator) {
        if (previousKey == "calculate") {
          firstNumber = resultNum;
          secondNumber = calculator.dataset.modValue;
        }
        result.textContent = calculate(firstNumber, operator, secondNumber);
        calculator.dataset.firstNumber = resultNum;
      } else {
        result.textContent = "0";
      }
      calculator.dataset.modValue = secondNumber;
      calculator.dataset.previousKey = "calculate";
    }
  }
});

function turnOn() {
  for (button of buttons) {
    button.toggleAttribute("disabled");
  }

  if (this.value == "Block") {
    this.value = "Unblock";
    this.innerHTML = "OFF";
    result.textContent = "0";
    turnOnButton.style.backgroundColor = "#D2D2D2";
  } else {
    this.value = "Block";
    this.innerHTML = "ON";
    turnOnButton.style.backgroundColor = "rgb(73, 184, 73)";
    result.textContent = "";
    clearKey.textContent = "AC";
    calculator.dataset.previousKey = "";
    calculator.dataset.operator = "";
    calculator.dataset.firstNumber = "";
  }
}

function clearBoard() {
  if (turnOnButton.value == "Unblock") {
    result.textContent = "0";
    calculator.dataset.previousKey = "";
    calculator.dataset.operator = "";
    calculator.dataset.firstNumber = "";
    calculator.dataset.modValue = "";
  }
}

const calculate = (firstNumber, operator, secondNumber) => {
  const n1 = parseFloat(firstNumber);
  const n2 = parseFloat(secondNumber);

  switch (operator) {
    case "add":
      return n1 + n2;
      break;
    case "subtract":
      return n1 - n2;
      break;
    case "multiply":
      return n1 * n2;
      break;
    case "divide":
      if (!n2 == 0) {
        return n1 / n2;
        break;
      } else {
        return "Do not divide by 0!";
      }
  }
};

turnOnButton.addEventListener("click", turnOn);
