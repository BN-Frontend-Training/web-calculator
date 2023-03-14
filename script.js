
const calculator = document.querySelector('.calculator');
const keys = document.querySelector(".keys");

let displayNum = '0';
let firstValue = null;
let secondValue = null;
let operator = null;
let previousKeyType = null;

keys.addEventListener("click", (e) => {
	const target = e.target;
	
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
			updateDisplay(displayNum);
		} else if (target.classList.contains("operator")) {
			// Operator Keys
			if (key === '+' || key === '-' || key === '*' || key === '/') {
				// Make the selected operator active
				target.classList.add('active');

				previousKeyType = 'operator'

				firstValue = displayNum;
				operator = key;

				if (firstValue && operator) {
					updateDisplay(operate(operator, firstValue, displayNum));
				}
			}
		} else {
			// Others
			if (key === "decimal") {
				if (!displayNum.includes('.')) {
					displayNum += '.';
				} else if (previousKeyType === 'operator') {
					displayNum = '0.';
				}
				updateDisplay(displayNum);
			}
			
			if (key === 'clear') {
				// previousKeyType = key;
			}
			
			if (key === 'calculate') {
				// previousKeyType = key;
				secondValue = displayNum;
				updateDisplay(operate(operator, firstValue, secondValue));
			}
		}
  	}
});

function updateDisplay(displayValue) {
	const display = document.querySelector('.display')
    display.innerText = displayValue;
    if (displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}