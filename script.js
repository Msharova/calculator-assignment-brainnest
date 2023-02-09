class Calculator {
    constructor(oldOperandTextElement, currentOperandTextElement) {
        this.oldOperandTextElement = oldOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.oldOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    //adding numbers
    appendNumber(number) {
        //prevents from having multiple '.' and returns
        if(number === '.' && this.currentOperand.includes('.')) return
        //we convert it to string so we can easily add a new thing and we add a number we will click on and make it to string also
        //we convert it to string so javascript knows 1+1 is not 2, but 11
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        //to prevent going through if we don't have values
        if(this.currentOperand === '') return
        //in order to make a multiple calculation
        if (this.oldOperand !== '') {
            this.compute()
        }
        //replacing current value to old one if we click any operation
        this.operation = operation
        this.oldOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        //we're converting our strings back to numbers in order to make a calculation
        const oldOp = parseFloat(this.oldOperand)
        const currentOp = parseFloat(this.currentOperand)
        //we're checking if the uses didn't click on any number and tries to click operations - the code doesn't run
        if (isNan(oldOp) || isNaN(currentOp)) return

        switch(this.operation) {
            case '/':
                computation = oldOp / currentOp
                break
            case '*':
                computation = oldOp * currentOp
                break
            case '+':
                computation = oldOp + currentOp
                break
            case '-':
                computation = oldOp - currentOp
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.oldOperand = ''
    }
    //to make comas
    getDisplayNumber(number) {
        //we need a string to split it to decimals inside it and we're not sure we're getting a number or a string
        const stringNUmber =number.toString()
        //our integer numbers. We convert our string to float and then split in, making an array out of it.
        //And we're taking the number before the period, aka 0
        const integerDigits = parseFloat(stringNUmber.split('.')[0])
        //same for decimals, but we're taking numbers after the period, aka 1
        const decimalDigits = stringNUmber.split('.')[1]

        let integerDisplay
        //checking if our integer digits is not a number. ANd it's when
        //a user puts nothing there or just the decimals
        if (isNaN(integerDigits)){
            integerDisplay = ''
        //and if the user did put the integer - we should use our local string, 
        //and we don't want to have any decimals
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        //checking if we have decimal digits
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        //adding the operation sign to the calculation display
        if(this.operation != null) {
            this.oldOperandTextElement.innerText = `${this.getDisplayNumber(this.oldOperand)} ${this.operation}`
        } else {
            this.oldOperandTextElement.innerText = ''
        }
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const oldOperandTextElement = document.querySelector('[data-old-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(oldOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener ('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener ('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})