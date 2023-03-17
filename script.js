
const calculator = document.querySelector('.calculator');
const keys = document.querySelector(".keys");

const MAX_CHARACTERS = 12;

let displayNum = '0';
let firstNumber = null;
let secondNumber = null;
let previousSecondValue = null;
let operator = null;
let previousKeyType = null; //'num','operator','other'

keys.addEventListener("click", (e) => {
	const target = e.target;

	if (target.matches("button")) {
		const key = target.dataset['key'];

		// Remove active class from actions
		const allOperatorButtons = document.querySelectorAll(".operator");
		allOperatorButtons.forEach(k => k.classList.remove('active'));

		// Number Keys
		if (target.classList.contains("number")) {
			handleNumbersKey(key);
		} else if (target.classList.contains("operator")) {
			// Operator Keys
			handleOperatorKeys(target, key);
		} else {
			/** Other Keys **/
			// Decimal
			if (key === "decimal") {
				handleDecimalKey();
			}
			
			// Clear All (AC)
			if (key === 'clear') {
				resetCalculator();
				previousKeyType = key;
			}

			// CE
			if (key === 'clear-entry') {
				clearEntry(target);
				previousKeyType = key;
			}

			// Backspace
			if (key === 'backspace') {
				backspace();
			}
			
			// Calculate
			if (key === 'calculate') {
				handleCalculateKey(key);
			}
			
		}
		enableDecimal();
  	}
});

function handleNumbersKey(key) {
	if (displayNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
		displayNum = key;
	} else {
		displayNum += key;
	}
	previousKeyType = 'num';
	calculatorDisplay(displayNum);
}

function handleOperatorKeys(target, key) {
	// Make the selected operator active
	target.classList.add('active');

	if (firstNumber && operator && previousKeyType !== 'operator') {
		const result = operate(operator, firstNumber, displayNum);
		calculatorDisplay(result);
		firstNumber = result;
		console.log(`result ==> ${result}`)
	} else {
		firstNumber = displayNum;
	}
	// TODO: Fix issue where continous operations cause displayNum to be 0
	// 	displayNum = '0';

	previousKeyType = 'operator';
	operator = key;

	console.log(`${operator} ${firstNumber}`)
}

function handleCalculateKey(key) {
	let _firstNumber = firstNumber;
  	secondNumber = displayNum;

  	if (_firstNumber) {
    	if (previousKeyType === "calculate") {
     	_firstNumber = displayNum;
      	secondNumber = previousSecondValue;
    }
    calculatorDisplay(operate(operator, firstNumber, secondNumber));
  }
  	previousSecondValue = secondNumber;
  	previousKeyType = key;
}

function handleDecimalKey(key) {
	previousKeyType = key;
	if (!displayNum.includes('.')) {
		displayNum += '.';
	} else if (previousKeyType === 'operator'  || previousKeyType === 'calculate') {
		displayNum = '0.';
	}
	calculatorDisplay(displayNum);
}

function clearEntry() {
	console.log(`firstNumber ${firstNumber} operator ${operator}`)
	displayNum = '0';
	if (firstNumber && operator) {
		firstNumber = null;
	}
	calculatorDisplay(displayNum);
	console.log(`after ==> firstNumber ${firstNumber} operator ${operator}`)
}

function resetCalculator() {
	displayNum = '0';
	firstNumber = null;
	secondNumber = null;
	operator = null;
	previousKeyType = null;
	calculatorDisplay(displayNum);
	// window.location.reload();
}

function backspace() {	
	const display = document.querySelector(".display");
    let lastNum = display.innerText;
	console.log(`lastNum ==> ${lastNum}`);
    lastNum = lastNum.slice(0, -1);
    display.innerText = lastNum;

    if (display.innerText.length == 0) {
		displayNum = '0';
		calculatorDisplay(displayNum);
    }

	displayNum = lastNum;
}

function calculatorDisplay(displayValue) {
	const display = document.querySelector('.display')
    display.innerText = displayValue;
    if (displayValue.length > MAX_CHARACTERS) {
        display.innerText = displayValue.substring(0, MAX_CHARACTERS);
    }
}

function operate(operator, n1, n2) {
	console.log(`operate ==> ${parseFloat(n1)} ${operator} ${parseFloat(n2)}`);
	let total = 0;
	const num1 = parseFloat(n1);
	const num2 = parseFloat(n2);
    if (operator == '+') total = num1 + num2;
    else if (operator == '-') total = num1 - num2;
    else if (operator == '/') total = num2 !== 0 ?  num1 / num2 : '😂';
    else if (operator == '*') total = num1 * num2;
	console.log(`total ${total}`);
	if (total.toString().length > MAX_CHARACTERS) {
		console.log('roundNumber' + roundNumber(total, 2))
		return roundNumber(total, 2);
	} else {
		return total;
	}
}

function enableDecimal() {
	decimalEl = document.querySelector('.decimal');
	decimalEl.disabled = displayNum.includes('.');
}

function roundNumber(num, places) {
    return Number.parseFloat(num).toExponential(places);
}
