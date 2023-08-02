// Reference to the screen 
let screen = document.querySelector("#screen");
// declaring the required variables to appear on screen
let variableA = document.createElement('span');
let variableB = document.createElement('span');
let Operator = document.createElement('span');

// declaring the equal sign 
let equal = document.createElement('span');
// declaring the result
let result = document.createElement('span')

// code for variables buttons
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

// code for the operator buttons
let operators = document.querySelectorAll(".operators");
operators.forEach((operator) => {
operator.addEventListener('click', function(e){
    // return if Error
    if (result.textContent === "ERROR") return
    // erasing previous variables and allowing to use the operators on new result
    if (result && result.parentNode === screen) {
        screen.removeChild(variableA);
        screen.removeChild(variableB);
        screen.removeChild(Operator);
        screen.removeChild(equal);
        screen.removeChild(result);
        variableA.textContent = result.textContent;
        screen.appendChild(variableA)
        variableB.textContent = '';
    }
    // return if no VariableA
    if (!(variableA && variableA.parentNode === screen)) return
    // run operations without operators    
    if (variableB && variableB.parentNode === screen){
        screen.removeChild(variableA);
        screen.removeChild(variableB);
        operation(Operator,variableA,variableB);
        screen.removeChild(result);
        variableA.textContent = result.textContent;
        screen.appendChild(variableA);
        variableB.textContent = '';
    }
    
    Operator.textContent = e.target.innerText;
    screen.appendChild(Operator); 
});
});

// code to call upon operation 
let equals = document.querySelector(".equal");
equals.addEventListener('click', function(e){
    // if no variables or operator return 
    if (!(variableA && variableA.parentNode === screen)) return;
    if (!(Operator && Operator.parentNode === screen)) return;
    if (!(variableB && variableB.parentNode === screen)) return;
    // if result is already there return
    if (result && result.parentNode === screen) return;

    equal.textContent = e.target.innerText;
    screen.appendChild(equal);
    operation(Operator,variableA,variableB)
})

// function for operation
function operation (Operator,variableA,variableB) {
    if (Operator.textContent === "÷") {
        if (variableB.textContent == 0){
            result.textContent = "ERROR";
            screen.appendChild(result);
            return
        } else{
       result.textContent = variableA.textContent/variableB.textContent;
       screen.appendChild(result);
    };
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

// code for clear button
let clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    while (screen.firstChild){
        screen.firstChild.textContent = '';
        screen.removeChild(screen.firstChild);
    }
})


