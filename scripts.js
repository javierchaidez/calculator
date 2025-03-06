const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let currentOperator = "";
let shouldClearDisplay = false;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;

        if (buttonText.match(/[0-9]/)) {
            if (shouldClearDisplay) {
                display.textContent = "";
                shouldClearDisplay = false;
            }
            display.textContent += buttonText;
        } else if (buttonText === ".") {
            // Evita múltiples puntos en un mismo número
            if (!display.textContent.includes(".")) {
                display.textContent += ".";
            }
        } else if (buttonText === "C") {
            display.textContent = "0";
            currentInput = "";
            currentOperator = "";
        } else if (buttonText === "√") {
            // Calcula la raíz cuadrada
            let num = parseFloat(display.textContent);
            if (num >= 0) {
                display.textContent = Math.sqrt(num).toFixed(6); // Limita decimales
            } else {
                display.textContent = "Error"; // No permite raíz de negativos
            }
            shouldClearDisplay = true;
        } else if (buttonText === "=") {
            if (currentOperator && currentInput) {
                const result = calculate(parseFloat(currentInput), currentOperator, parseFloat(display.textContent));
                display.textContent = result;
                currentInput = result;
                currentOperator = "";
                shouldClearDisplay = true;
            }
        } else {
            currentOperator = buttonText;
            currentInput = display.textContent;
            shouldClearDisplay = true;
        }
    });
});

function calculate(num1, operator, num2) {
    let result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num2 !== 0 ? num1 / num2 : "Error";
            break;
        default:
            result = num2;
    }

    // Redondear a 6 decimales si es un número
    if (typeof result === "number") {
        result = parseFloat(result.toFixed(6));
    }

    return result;
}
