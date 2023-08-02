// Reference to the screen 
let screen = document.querySelector("#screen");
// declaring the required variables to appear on screen
let variableA = document.createElement('span');
let variableB = document.createElement('span');
let Operator = document.createElement('span');

// declaring the equal sign 
let equal = document.createElement('span');
// declaring the result
let result = document.createElement('span');

// rounding result
let round;

let error = document.createElement('p');

// default display of '0'
variableA.textContent = '0';
screen.appendChild(variableA);


// code for variables buttons
let variables = document.querySelectorAll(".variables");
variables.forEach((variable) => {
    
    variable.addEventListener('click', function(e){
        if (error && error.parentNode === screen) return;
        if (Operator && Operator.parentNode === screen) return;
        if (equal && equal.parentNode === screen) return;
        if (e.target.innerText === '.') {
            if (variableA.textContent.includes('.')) return;
            if (variableA.textContent === "") variableA.textContent += 0;
        }
        if (e.target.innerText === '0' &&  variableA.textContent === "0") return
        if (!(e.target.innerText === '.') && variableA.textContent === "0") {
            variableA.textContent = '';
            variableA.textContent === e.target.innerText;
            screen.appendChild(variableA);
        }

            variableA.textContent += e.target.innerText;
            screen.appendChild(variableA);
});


    variable.addEventListener('click', function(e){
        if (error && error.parentNode === screen) return;
        if (!(Operator && Operator.parentNode === screen)) return; 
        if (equal && equal.parentNode === screen) return;
        if (e.target.innerText === '.') {
            if (variableB.textContent.includes('.')) return;
            if (variableB.textContent === "") variableB.textContent += 0;
        }
        if (e.target.innerText === '0' &&  variableB.textContent === "0") return
        if (!(e.target.innerText === '.') && variableB.textContent === "0") return

            variableB.textContent += e.target.innerText;
            screen.appendChild(variableB);
});
});

// code for the operator buttons
let operators = document.querySelectorAll(".operators");
operators.forEach((operator) => {
operator.addEventListener('click', function(e){
    // return if Error
    if (error && error.parentNode === screen) return;
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
    if (error && error.parentNode === screen) return;
    equal.textContent = e.target.innerText;
    screen.appendChild(equal);
    operation(Operator,variableA,variableB);
    
})

// function for operation
function operation (Operator,variableA,variableB) {
    if (Operator.textContent === "÷") {
        if (variableB.textContent == 0){
            error.textContent = "ERROR";
            while (screen.firstChild) screen.removeChild(screen.firstChild);
            screen.appendChild(error);
            return

        } else {
       round = variableA.textContent/variableB.textContent;
       result.textContent = Number(round.toFixed(4));
       screen.appendChild(result);
        };
    } else if (Operator.textContent === "×") {
        round = variableA.textContent * variableB.textContent;
        result.textContent = Number(round.toFixed(4));
        screen.appendChild(result)
    } else if (Operator.textContent === "-") {
        round = variableA.textContent - variableB.textContent;
        result.textContent = Number(round.toFixed(4));
        screen.appendChild(result)
    }else if (Operator.textContent === "+") {
        round = +variableA.textContent + +variableB.textContent;
        result.textContent = Number(round.toFixed(4));
        screen.appendChild(result)
    }
}

// code for clear button
let clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    variableA.textContent = '';
    variableB.textContent = '';
    Operator.textContent = '';
    equal.textContent = '';
    result.textContent = '';
    while (screen.firstChild) screen.removeChild(screen.firstChild);
    variableA.textContent = '0'
    screen.appendChild(variableA);
});

// code for delete button
let Delete = document.querySelector("#delete");
Delete.addEventListener('click', () => {
    if (result && result.parentNode === screen) return;
    
    if (Operator &&
        Operator.parentNode === screen &&
        !(variableB && variableB.parentNode === screen)) {
        screen.removeChild(Operator); 
        return
        }

    if (variableA && variableA.parentNode === screen &&
        !(variableA.textContent === '0') &&
        !(variableB && variableB.parentNode === screen) ) {
        let arrVariableA = variableA.textContent.split('');
        arrVariableA.pop();
        variableA.textContent = arrVariableA.join("");
    }

    if (variableA.textContent === "") variableA.textContent = 0;

    if ((variableB && variableB.parentNode === screen)){
        let arrVariableB = variableB.textContent.split('');
        arrVariableB.pop();
        variableB.textContent = arrVariableB.join("");
    }

    if (variableB.textContent === "" && variableB.parentNode === screen) screen.removeChild(variableB)
})