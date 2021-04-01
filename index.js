class Calculator {
    constructor(previousOperandResult, currentOperandResult){
        this.previousOperandResult = previousOperandResult
        this.currentOperandResult = currentOperandResult
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
 
    appendNumber(num) {
        if(num === '.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + num.toString()
        
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
 
    compute(){
        let result 
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '*':
                result = prev * current
                break
            case '/':
                result = prev / current
                break
            default:
                return    

        }
        this.currentOperand = result;
        this.previousOperand = ""
        this.operation = undefined;
    }

    updateDisplay(){
        this.currentOperandResult.innerText = this.currentOperand;
        this.previousOperandResult.innerText = this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');;
const equalButton = document.querySelector('.equals');
const allClearButton = document.querySelector('.all-clear');
const previousOperandResult = document.querySelector('.previous-operand');
const currentOperandResult = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandResult, currentOperandResult)


numberButtons.forEach(num =>{
    num.addEventListener('click', ()=>{
        calculator.appendNumber(num.innerText);
        calculator.updateDisplay()
    })
})

operationButtons.forEach(num =>{
    num.addEventListener('click', ()=>{
        calculator.chooseOperation(num.innerText);
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', ()=>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', ()=>{
    calculator.clear()
    calculator.updateDisplay()
})