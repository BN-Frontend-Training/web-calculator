function operate(operator, num1, num2){
    if(operator == '+') add(num1, num2)
    else if(operator == "-") subtract(num1, num2)
    else if(operator == "/") divide(num1, num2)
    else multiply(num1, num2)
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

function calculatorDisplay(){
    /*
    Take the click input
    Put it on display: change the html display container!
    
    */

}

const btn = document.querySelectorAll('button');
const displayChange = document.getElementById('display');
operators = ["X", "-", "+", "/", "="]

btn.forEach(function(i){
  i.addEventListener("click", function(e){
    if(!operators.includes(e.target.innerHTML))
    displayChange.value = e.target.innerHTML;
  })
})