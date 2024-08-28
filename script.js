const buttons = document.querySelectorAll("button");
const results = document.querySelector("input");
const calculator = document.querySelector(".container");
const body = document.querySelector("body");
const heading = document.querySelector("h1");

const hexSymbols = "0123456789ABCDEF";

addEventListener("keydown", (e) => {
	if (Number(e.key) || e.key === "0") handleDigits(e.key);
	if ("/*-+".includes(e.key)) handleOperators(e.key);
	if (e.key === "Enter") handleEquals();
});

buttons.forEach((button) => {
	const buttonClass = button.className;
	switch (buttonClass) {
		case "number":
			button.addEventListener("click", handleDigits);
			break;
		case "operator":
			button.addEventListener("click", handleOperators);
			break;
		case "equals":
			button.addEventListener("click", handleEquals);
			break;
		case "decimal":
			button.addEventListener("click", handleDecimal);
			break;
		case "clear":
			button.addEventListener("click", handleClear);
			break;
	}
});

let firstInteger = "";
let secondInteger = "";
let operator = "";
let result = "";

const add = (a, b) => {
	return a + b;
};
const subtract = (a, b) => {
	return a - b;
};
const multiply = (a, b) => {
	return a * b;
};
const divide = (a, b) => {
	return a / b;
};

const operate = (a, b, operator) => {
	a = parseFloat(a);
	b = parseFloat(b);
	switch (operator) {
		case "add":
		case "+":
			return add(a, b);
		case "subtract":
		case "-":
			return subtract(a, b);
		case "multiply":
		case "*":
			return multiply(a, b);
		case "divide":
		case "/":
			return divide(a, b);
	}
};

function handleDigits(e) {
	let digit = e.target === undefined ? e : e.target.id;
	if (!secondInteger && !operator) {
		firstInteger += digit;
		results.value = firstInteger;
	} else {
		secondInteger += digit;
		results.value = secondInteger;
	}
}

function handleOperators(e) {
	let operation = e.target === undefined ? e : e.target.id;
	if (firstInteger && !secondInteger) {
		operator = operation;
	} else if (firstInteger && secondInteger && operator) {
		handleEquals();
		operator = operation;
	}
}

function handleEquals() {
	if (firstInteger && secondInteger && operator) {
		console.log(firstInteger, secondInteger, operator);
		if (secondInteger === "0" && (operator === "divide" || operator === "/")) {
			return divideByZero();
		}
		result = operate(firstInteger, secondInteger, operator);
		results.value = result;
		firstInteger = result;
		secondInteger = "";
		operator = "";
	}
}

function handleDecimal() {
	if (!firstInteger) {
		firstInteger = "0.";
		results.value = firstInteger;
	} else if (firstInteger.indexOf(".") === -1 && !operator) {
		firstInteger += ".";
		results.value = firstInteger;
	} else if (firstInteger && operator && !secondInteger) {
		secondInteger = "0.";
		results.value = secondInteger;
	} else if (firstInteger && operator && secondInteger.indexOf(".") === -1) {
		secondInteger += ".";
		results.value = secondInteger;
	}
}

function handleClear() {
	firstInteger = "";
	secondInteger = "";
	operator = "";
	result = "";
	results.value = "";
}

function generateRandomColor() {
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += hexSymbols[Math.floor(Math.random() * 16)];
	}
	return color;
}

function divideByZero() {
	handleClear();
	const allElements = [...buttons, results, calculator, body];
	heading.innerText = "Of course you divided by zero.";
	allElements.forEach((element) => {
		element.style.backgroundColor = generateRandomColor();
		element.style.color = generateRandomColor();
	});
}
