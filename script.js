let screen = document.querySelector("#screen");
let variableA = document.createElement('span');
let variableB = document.createElement('span');
let Operator = document.createElement('span');

let variables = document.querySelectorAll(".variables");
variables.forEach((variable) => {

    variable.addEventListener('click', function(e){
        if (Operator && Operator.parentNode === screen) return;
            variableA.textContent += e.target.innerText;
            screen.appendChild(variableA);
});


    variable.addEventListener('click', function(e){
        if (Operator && Operator.parentNode === screen) {
            variableB.textContent += e.target.innerText;
            screen.appendChild(variableB);
        };
});
});


let operators = document.querySelectorAll(".operators");
operators.forEach((operator) => {
operator.addEventListener('click', function(e){
    if (Operator && Operator.parentNode === screen) return
    Operator.textContent = e.target.innerText;
    screen.appendChild(Operator);
});
});

function operation (Operator,variableA,variableB) {
    
}


function addition (a,b) {
    return a+b
}

function substraction (a,b){
    return a-b
}

function multiplication (a,b){
    return a * b
}

function division (a,b) {
    return a / b
}
