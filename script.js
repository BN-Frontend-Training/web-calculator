
const calculator = document.querySelector('.calculator');
const keys = document.querySelector(".keys");

let displayNum = '0';
let firstValue = null;
let secondValue = null;
let previousSecondValue = null;
let operator = null;
let previousKeyType = null; //['num','operator','other']

keys.addEventListener("click", (e) => {
	const target = e.target;

	enableDecimal();
	
	if (target.matches("button")) {
		const key = target.dataset['key'];

		// Change clear text to CE if user starts clicking keys
		// if (key !== 'clear') {
		// 	const clearButton = document.querySelector('.clear')
		// 	clearButton.textContent = 'C'
		//   }

		// Remove active class from actions
		const allOperatorButtons = document.querySelectorAll(".operator");
		allOperatorButtons.forEach(k => k.classList.remove('active'))

		// Number Keys
		if (target.classList.contains("number")) {
			if (displayNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
				displayNum = key;
				previousKeyType = 'num'
			} else {
				displayNum += key;
				previousKeyType = 'num'
			}
			calculatorDisplay(displayNum);
		} else if (target.classList.contains("operator")) {
			// Operator Keys
			if (key === '+' || key === '-' || key === '*' || key === '/') {
				// Make the selected operator active
				target.classList.add('active');

				if (firstValue && operator && previousKeyType !== 'operator') {
					const result = operate(operator, firstValue, displayNum);
					calculatorDisplay(result);
					firstValue = result;
				} else {
					firstValue = displayNum;
				}

				previousKeyType = 'operator'
				operator = key;
			}
		} else {
			/** Other Keys **/
			// Decimal
			if (key === "decimal") {
				previousKeyType = key;
				if (!displayNum.includes('.')) {
					displayNum += '.';
				} else if (previousKeyType === 'operator'  || previousKeyType === 'calculate') {
					displayNum = '0.';
				}
				calculatorDisplay(displayNum);
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
				// Perfome backspace
			}
			
			if (key === 'calculate') {
				let _firstValue = firstValue;
				secondValue = displayNum;

				if (_firstValue) {
					if (previousKeyType === 'calculate') {
						_firstValue = displayNum;
						secondValue = previousSecondValue;
					}
					calculatorDisplay(operate(operator, firstValue, secondValue));
				}

				previousSecondValue = secondValue;
				previousKeyType = key;
			}
			
		}
  	}
});

function clearEntry() {
	calculatorDisplay('0');
}

function resetCalculator() {
	displayNum = '0';
	firstValue = null;
	secondValue = null;
	operator = null;
	previousKeyType = null;
	calculatorDisplay('0');
}

function calculatorDisplay(displayValue) {
	const display = document.querySelector('.display')
    display.innerText = displayValue;
    if (displayValue.length > 15) {
        display.innerText = displayValue.substring(0, 15);
    }
}

function operate(operator, n1, n2) {
	console.log(`operate ==> ${parseFloat(n1)} ${operator} ${parseFloat(n2)}`);
	const num1 = parseFloat(n1);
	const num2 = parseFloat(n2);
    if(operator == '+') return add(num1, num2);
    else if(operator == "-") return subtract(num1, num2);
    else if(operator == "/") return divide(num1, num2);
    else return multiply(num1, num2);
}

function add(num1, num2){
    return num1 + num2
}

function subtract(num1, num2){
    return num1 - num2
}

function divide(num1, num2){
    return num1 / num2
}

function multiply(num1, num2){
    return num1 * num2
}

function enableDecimal() {
	decimalEl = document.querySelector('.decimal');
	decimalEl.disabled = displayNum.includes('.');
}
