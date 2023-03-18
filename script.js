
const calculator = document.querySelector('.calculator');
const keys = document.querySelectorAll('button');
const allOperatorButtons = document.querySelectorAll('.operator');
const allNumberButtons = document.querySelectorAll('.number');
const deleteElement = document.querySelector(".delete");
const calculateElement = document.querySelector(".equal");
const decimalElement = document.querySelector(".decimal");

const MAX_CHARACTERS = 12;
const operators = ['+','-','*','/'];

let displayNum = '0';
let firstNumber = null;
let secondNumber = null;
let previousSecondValue = null;
let operator = null;
let previousKeyType = null; //'num','operator','other'

addKeyboardSupport();
function addKeyboardSupport() {
	window.addEventListener('keydown', onKeyboardKeys)
}

function onKeyboardKeys(e) {
	const key = e.key;
	// console.log(`keydown ${key}`);

	// Remove active class from actions
	unselectActiveOperator();

	// Numbers
	var isNumber = isFinite(key);
	if (isNumber) {
		unSetNumberButtonBackground(key);
		handleNumbersKey(e.key);
	}

	// Operators
	if (operators.includes(key)) {
		handleOperatorKeys(key);
	}

	switch(e.key) {
		case "Backspace":
			setElementBackground(deleteElement, '#999999');
			backspace();
			break;
		case "Enter":
			setElementBackground(calculateElement, '#226c43');
			handleCalculateKey();
			  break;
		case ".":
			setElementBackground(decimalElement, '#999999');
			handleDecimalKey();
			  break;
		default:
	}
};

onButtonKeyClicks();
function onButtonKeyClicks() {
	keys.forEach(k => { 
			k.addEventListener("click", (e) => {
			const target = e.target;
			
			const key = target.dataset['key'];

			// Remove active class from actions
			unselectActiveOperator();

			// Number Keys
			if (target.classList.contains("number")) {
				handleNumbersKey(key);
			} else if (target.classList.contains("operator")) {
				// Operator Keys
				handleOperatorKeys(key);
			} else {
				/** Other Keys **/
				switch(key) {
					case "decimal":
						handleDecimalKey();
						break;
					case "clear":
						resetCalculator();
						break;
					case "clear-entry":
						clearEntry(target);
						break;
					case "backspace":
						backspace();
						break;
					case "calculate":
						handleCalculateKey();
						break;
					default:
				}		
			}
			enableDecimal();
  		})
	})
}

function handleNumbersKey(key) {
	if (displayNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
		displayNum = key;
	} else {
		displayNum += key;
	}
	previousKeyType = 'num';
	updateDisplay(displayNum);
}

function handleOperatorKeys(key) {
	// Make the selected operator active
	setSelectedOperator(key);

	if (firstNumber && operator && previousKeyType !== 'operator') {
		const result = operate(operator, firstNumber, displayNum);
		updateDisplay(result);
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
    updateDisplay(operate(operator, firstNumber, secondNumber));
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
	updateDisplay(displayNum);
}

function clearEntry() {
	console.log(`firstNumber ${firstNumber} operator ${operator}`)
	// displayNum = '0';
	if (firstNumber && operator) {
		firstNumber = null;
		displayNum = '0';
	}
	updateDisplay(displayNum);
	console.log(`after ==> firstNumber ${firstNumber} operator ${operator}`)
}

function resetCalculator() {
	displayNum = '0';
	firstNumber = null;
	secondNumber = null;
	operator = null;
	previousKeyType = null;
	updateDisplay(displayNum);
	console.clear();
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
		updateDisplay(displayNum);
    }

	displayNum = lastNum;
}

function updateDisplay(displayValue) {
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
    else if (operator == '/') total = num2 !== 0 ?  num1 / num2 : "Divide by 0!";
    else if (operator == '*') total = num1 * num2;
	console.log(`total ${total}`);
	if (total.toString().length > MAX_CHARACTERS) {
		console.log('roundNumber' + roundNumber(total, 2))
		return roundNumber(total, 2);
	} else {
		return total;
	}
}

function setSelectedOperator(key) {
  allOperatorButtons.forEach((element) => {
    if (element.dataset.key === key) {
      element.classList.add("active");
    }
  });
}

function unselectActiveOperator() {
	allOperatorButtons.forEach(k => k.classList.remove('active'));
}

function enableDecimal() {
	decimalEl = document.querySelector('.decimal');
	decimalEl.disabled = displayNum.includes('.');
}

function roundNumber(num, places) {
    return Number.parseFloat(num).toExponential(places);
}

document.addEventListener('keyup', keyReleased);
function keyReleased(e) {
	const key = e.key;

	let isNumber = isFinite(key);
	if (isNumber) {
		setNumberButtonBackground(key);
	}

    if (key == "Backspace") {
		setElementBackground(deleteElement, '#ffffff');
    } else if (key == "Enter") {
		setElementBackground(calculateElement, 'mediumseagreen');
	} else if (key == ".") {
		setElementBackground(decimalElement, '#ffffff');
	}
}

function setNumberButtonBackground(key) {
	allNumberButtons.forEach(button => {
		if (button.dataset.key === key) {
			setElementBackground(button, '#ffffff');
		}
	})
}

function unSetNumberButtonBackground(key) {
	allNumberButtons.forEach(button => {
		if (button.dataset.key === key) {
			setElementBackground(button, '#999999');
		}
	})
}

function setElementBackground(element, color) {
	element.style.backgroundColor = color;
}
