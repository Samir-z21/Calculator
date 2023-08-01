// Reference to the screen 
let screen = document.querySelector("#screen");
// declaring the required variables to appear on screen
let variableA = document.createElement('span');
let variableB = document.createElement('span');
let Operator = document.createElement('span');

// declaring the equal sign 
let equal = document.createElement('span');
// declaring the result
let result = document.createElement('p')

// code for appending the variables cliked to the screen
let variables = document.querySelectorAll(".variables");
variables.forEach((variable) => {

    variable.addEventListener('click', function(e){
        if (Operator && Operator.parentNode === screen) return;
        if (equal && equal.parentNode === screen) return;
            variableA.textContent += e.target.innerText;
            screen.appendChild(variableA);
});


    variable.addEventListener('click', function(e){
        if (!(Operator && Operator.parentNode === screen)) return; 
        if (equal && equal.parentNode === screen) return;
            variableB.textContent += e.target.innerText;
            screen.appendChild(variableB);
});
});

// code for appending the operator cliked to the screen
let operators = document.querySelectorAll(".operators");
operators.forEach((operator) => {
operator.addEventListener('click', function(e){
    if (variableB && variableB.parentNode === screen) return
    if (!(variableA && variableA.parentNode === screen)) return
    Operator.textContent = e.target.innerText;
    screen.appendChild(Operator);
});
});

// code to call upon operation 
let equals = document.querySelector(".equal");
equals.addEventListener('click', function(e){
    if (!(variableA && variableA.parentNode === screen)) return
    equal.textContent = e.target.innerText;
    screen.appendChild(equal);
    operation(Operator,variableA,variableB)
})

function operation (Operator,variableA,variableB) {
    if (Operator.textContent === "÷") {
       result.textContent = variableA.textContent/variableB.textContent;
       screen.appendChild(result);
    } else if (Operator.textContent === "×") {
        result.textContent = variableA.textContent * variableB.textContent;
        screen.appendChild(result)
    } else if (Operator.textContent === "-") {
        result.textContent = variableA.textContent - variableB.textContent;
        screen.appendChild(result)
    }else if (Operator.textContent === "+") {
        result.textContent = +variableA.textContent + +variableB.textContent;
        screen.appendChild(result)
    }
}

