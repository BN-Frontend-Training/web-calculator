
const calculator = document.querySelector('.calculator');
const keys = document.querySelector(".keys");

let displayNum = '0';
let firstValue = null;
let secondValue = null;
let operator = null;
let previousKeyType = null; //['num','operator','other']

keys.addEventListener("click", (e) => {
	const target = e.target;

	// console.log(`target ==> ${target.value}`)
	
	if (target.matches("button")) {

		const key = e.target.dataset['key'];
		console.log(key);

		// Remove active class from actions
		Array.from(target.parentNode.children).forEach(k => k.classList.remove('active'))

		// Number Keys
		if (target.classList.contains("number")) {
			if (displayNum === '0' || previousKeyType === 'operator') {
				displayNum = key;
				previousKeyType = 'num'
			} else {
				displayNum += key;
			}
			calculatorDisplay(displayNum);
		} else if (target.classList.contains("operator")) {
			// Operator Keys
			if (key === '+' || key === '-' || key === '*' || key === '/') {
				// Make the selected operator active
				target.classList.add('active');

				previousKeyType = 'operator'

				firstValue = displayNum;
				operator = key;

				// if (firstValue && operator) {
				// 	calculatorDisplay(operate(operator, firstValue, displayNum));
				// }
			}
		} else {
			// Others
			if (key === "decimal") {
				if (!displayNum.includes('.')) {
					displayNum += '.';
				} else if (previousKeyType === 'operator') {
					displayNum = '0.';
				}
				calculatorDisplay(displayNum);
			}
			
			if (key === 'clear') {
				// previousKeyType = key;
			}
			
			if (key === 'calculate') {
				// previousKeyType = key;
				secondValue = displayNum;
				calculatorDisplay(operate(operator, firstValue, secondValue));
			}
		}
  	}
});

function calculatorDisplay(displayValue) {
	const display = document.querySelector('.display')
    display.innerText = displayValue;
    if (displayValue.length > 15) {
        display.innerText = displayValue.substring(0, 15);
    }
}

function operate(operator, n1, n2) {
	console.log(`operator ==> ${operator} n1 ==> ${parseFloat(n1)} n2 ==> ${parseFloat(n2)}`);
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

// const btn = document.querySelectorAll('button');
// const displayChange = document.getElementById('display');
// operators = ["X", "-", "+", "/", "="]

// btn.forEach(function(i){
//   i.addEventListener("click", function(e){
//     if(!operators.includes(e.target.innerHTML))
//     displayChange.value = e.target.innerHTML;
//   })
// })
