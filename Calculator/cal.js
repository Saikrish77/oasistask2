const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        
        if (value >= "0" && value <= "9") {
            currentInput += value;
            display.value = currentInput;
        } else if (value === "+" || value === "-" || value === "*" || value === "/") {
            operator = value;
            currentInput += " " + operator + " ";
            display.value = currentInput;
        } else if (value === "=") {
            try {
                currentInput = eval(currentInput).toString();
                display.value = currentInput;
            } catch (error) {
                display.value = "Error";
            }
        } else if (value === "C") {
            currentInput = "";
            operator = "";
            display.value = "";
        }
    });
});