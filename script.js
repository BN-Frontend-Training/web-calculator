function operate(operator, num1, num2){
    if(operator == '+'){
        add(num1, num2)
    } else if(operator == "-"){
        subtract(num1, num2)
    } else if(operator == "/"){
        divide(num1, num2)
    } else {multiply(num1, num2)}
    return `${num1} ${operator} ${num2}`
}