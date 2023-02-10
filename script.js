let operator = '';
let oldValue = '';
let currentValue = '';
let gotResult = false;


document.addEventListener("DOMContentLoaded", function() {
    let clearButton = document.querySelector(".all-clear");
    let deleteButton = document.querySelector(".delete");
    let equalButton = document.querySelector(".equal");
    let decimalButton = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    let oldScreen = document.querySelector(".old-operand");
    let currentScreen = document.querySelector(".current-operand");
    //looping through all the numbers (it's an array)
    //them we're getting the text content of a button that has a number class
    numbers.forEach((number) => number.addEventListener("click", function(e){
        handleNumber(e.target.textContent);
        //showing the value of a clicked button on the current screen
        currentScreen.textContent = currentValue;
    }))
    //we're doing the same for operators
    operators.forEach((op) => op.addEventListener("click", function(e){
        handleOperator(e.target.textContent);
        //showing the old value and the operator used
        oldScreen.textContent = oldValue + " " + operator;
        //making the current screen empty again
        currentScreen.textContent = currentValue;
    }))

    clearButton.addEventListener("click", function(){
        oldValue ='';
        currentValue ='';
        operator = '';
        oldScreen.textContent = '';
        currentScreen.textContent = '';

    })

    equalButton.addEventListener("click", function(){
        if (operator==='') return;
        currentValue = operate(operator,oldValue,currentValue);
        currentScreen.textContent = currentValue;
        oldValue ='';
        oldScreen.textContent = '';
        operator = '';
        gotResult = true;
    })

    decimalButton.addEventListener("click", function(){
        addDecimal();
    })

   deleteButton.addEventListener("click", function(){
    if(currentValue!== '')
        currentValue = currentValue.slice(0, -1);
        currentScreen.textContent = currentValue;
   })
})

function handleNumber(num){
    //if result was already there, type new number
    if (gotResult) 
    {
        gotResult = false;
        currentValue = num;
        
    }
    else{
        //preventing from long numbers 
        if(currentValue.length <= 10){
        currentValue += num;
        }
    }
}

function handleOperator(op){
    //if currentValue and oldValue is empty, ignore
    if (currentValue === ''  && oldValue === '') return;
    //if oldValue is there and old operator is there, change operator
    if (currentValue === ''  && oldValue !== '') 
    {
        operator = op;
        return;
    }
    //if operator was already there, calculate then add new operator
    if (operator !== '')
    {
        currentValue = operate(operator,oldValue,currentValue);
        oldValue ='';
    }
    //updating the global operator to the new one
    operator = op;
    //showing two rows correctly
    oldValue = currentValue;
    currentValue = '';
}

function operate(op, num1, num2){
    num1 = Number(num1);
    num2 = Number(num2);

    switch (op) {
        case "+":
            num1 += num2;
            break;
        case "-":
            num1 -= num2;
            break;
        case "/":
            if(num2 === 0) 
                num1 = "Error";
            else 
                num1 /= num2;
            break;
        case "*":
            num1 *= num2;
            break;    
        default:
            break;
    }
    if (num1 != "Error") 
        num1 = mathNumber(num1);
        num1 = num1.toString();
    return num1;    
}

function mathNumber(num){
    return Math.round(num *1000) /1000;
}

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += '.';
    }
}