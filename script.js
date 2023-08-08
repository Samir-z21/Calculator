// Reference to the screen 
let screen = document.querySelector("#screen");

// creating div upper and lower
let aboves = document.createElement('div');
let belows = document.createElement('div');
aboves.classList.add('above');
belows.classList.add('below')
belows.classList.add('empty-space');
screen.appendChild(aboves);
screen.appendChild(belows);

// CreatingElements
let variableA = document.createElement('span');
let variableB = document.createElement('span');
let Operator = document.createElement('span');
let equal = document.createElement('span');
let result = document.createElement('span');
let error = document.createElement('p');

// rounding result
let round;

// manage digits overflow
let overflowA = [];
let overflowB = [];

// default display of '0'
variableA.textContent = '0';
belows.appendChild(variableA);

// code for variables buttons
let variables = document.querySelectorAll(".variables");
variables.forEach((variable) => {
    
    variable.addEventListener('click', function(e){
        if (overflowA.length === 14) return 
        if (error && error.parentNode === screen) return;
        if (Operator && Operator.parentNode === aboves) return;
        if (equal && equal.parentNode === aboves) return;
        if (e.target.innerText === '0' &&  variableA.textContent === "0") return;
        if (e.target.innerText === '.') {
            if (variableA.textContent.includes('.')) return;
            if (variableA.textContent === "") variableA.textContent += 0;
        }
        
        if (!(e.target.innerText === '.') && variableA.textContent === "0") {
            variableA.textContent = '';
        }

            overflowA = variableA.textContent.split('');
            overflowA.push("e.target.innerText");
            variableA.textContent += e.target.innerText;
            belows.appendChild(variableA);
            
            
});


    variable.addEventListener('click', function(e){
        if (overflowB.length === 14) return
        if (error && error.parentNode === screen) return;
        if (!(Operator && Operator.parentNode === aboves)) return; 
        if (equal && equal.parentNode === aboves) return;
        if (e.target.innerText === '0' &&  variableB.textContent === "0") return;
        if (!(e.target.innerText === '.') && variableB.textContent === "0") return;
        if (e.target.innerText === '.') {
            if (variableB.textContent.includes('.')) return;
            if (variableB.textContent === "") variableB.textContent += 0;
        }

            overflowB = variableB.textContent.split('');
            overflowB.push("e.target.innerText");
            variableB.textContent += e.target.innerText;
            belows.appendChild(variableB);         
});        
});

// code for the operator buttons
let operators = document.querySelectorAll(".operators");
operators.forEach((operator) => {
operator.addEventListener('click', function(e){
    // return if Error
    if (error && error.parentNode === screen) return;
   
    // erasing previous variables and allowing to use the operators on new result
    if (result && result.parentNode === belows) {
        aboves.removeChild(variableA);
        aboves.removeChild(variableB);
        aboves.removeChild(Operator);
        aboves.removeChild(equal);
        belows.removeChild(result);
        variableA.textContent = result.textContent;
        belows.appendChild(variableA)
        variableB.textContent = '';
    }
    // run operations without operators    
    if (variableB && variableB.parentNode === belows){
        aboves.removeChild(variableA);
        belows.removeChild(variableB);
        operation(Operator,variableA,variableB);
        belows.removeChild(result);
        variableA.textContent = result.textContent;
        aboves.appendChild(variableA);
        variableB.textContent = '';
        overflowA.length = 0;
        overflowB.length = 0;
        Operator.textContent = e.target.innerText;
        aboves.appendChild(Operator); 
        return;
    } 

    if (Operator && Operator.parentNode === aboves && (!(variableB && variableB.parentNode === belows))) {
        aboves.removeChild(Operator);
        overflowA.length = 0;
        overflowB.length = 0;
        Operator.textContent = e.target.innerText;
        aboves.appendChild(Operator); 
        return;
    }

    if  (!(variableB && variableB.parentNode === belows)) {
       belows.removeChild(variableA);
       aboves.appendChild(variableA);
    }
   
    overflowA.length = 0;
    overflowB.length = 0;
    Operator.textContent = e.target.innerText;
    aboves.appendChild(Operator); 

});
});

// code to call upon operation 
let equals = document.querySelector(".equal");
equals.addEventListener('click', function(e){
    // if no variables or operator return 
    if (!(variableA && variableA.parentNode === aboves)) return;
    if (!(Operator && Operator.parentNode === aboves)) return;
    if (!(variableB && variableB.parentNode === belows)) return;
    // if result is already there return
    if (result && result.parentNode === belows) return;
    if (error && error.parentNode === screen) return;

    overflowA.length = 0;
    overflowB.length = 0;
    equal.textContent = e.target.innerText;
    belows.removeChild(variableB);
    aboves.appendChild(variableB);
    aboves.appendChild(equal);
    operation(Operator,variableA,variableB);
    
})

// function for operation
function operation(Operator, variableA, variableB) {
    if (Operator.textContent === "÷") {
        if (variableB.textContent == 0) {
            error.textContent = "ERROR";
            while (screen.firstChild) screen.removeChild(screen.firstChild);
            screen.appendChild(error);
            return;
        } else {
            round = variableA.textContent / variableB.textContent;
            result.textContent = formatNumber(round); // Format the result using the function
            belows.appendChild(result);
        }
    } else if (Operator.textContent === "×") {
        round = variableA.textContent * variableB.textContent;
        result.textContent = formatNumber(round);
        belows.appendChild(result);
    } else if (Operator.textContent === "-") {
        round = variableA.textContent - variableB.textContent;
        result.textContent = formatNumber(round);
        belows.appendChild(result);
    } else if (Operator.textContent === "+") {
        round = +variableA.textContent + +variableB.textContent;
        result.textContent = formatNumber(round);
        belows.appendChild(result);
    }
}


// function to format the number
function formatNumber(number) {
    const absoluteNumber = Math.abs(number);
    if (absoluteNumber >= 1e14) {
        return number.toExponential(8); // Use scientific notation for numbers exceeding 14 digits
    } else {
        return Number(number.toFixed(8)); // Limit to 14 digits
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
    while (aboves.firstChild) aboves.removeChild(aboves.firstChild);
    while (belows.firstChild) belows.removeChild(belows.firstChild);
    variableA.textContent = '0';

    belows.appendChild(variableA);
    screen.appendChild(aboves);
    screen.appendChild(belows);
    overflowA.length = 0;
    overflowB.length = 0;
});

// code for delete button
let Delete = document.querySelector("#delete");
Delete.addEventListener('click', () => {
    if (variableB && variableB.parentNode === belows) {
        overflowB.pop();
    } else overflowA.pop();
    if (result && result.parentNode === belows) return;
    
    if (Operator && Operator.parentNode === aboves && !(variableB && variableB.parentNode === belows)) {
        aboves.removeChild(Operator); 
        aboves.removeChild(variableA);
        overflowA =  variableA.textContent.split('');
        belows.appendChild(variableA);
        return
        }

    if (variableA && variableA.parentNode === belows &&
        !(variableA.textContent === '0') &&
        !(variableB && variableB.parentNode === belows) ) {
        let arrVariableA = variableA.textContent.split('');
        arrVariableA.pop();
        variableA.textContent = arrVariableA.join("");
    }

    if (variableA.textContent === "") variableA.textContent = 0;

    if ((variableB && variableB.parentNode === belows)){
        let arrVariableB = variableB.textContent.split('');
        arrVariableB.pop();
        variableB.textContent = arrVariableB.join("");
    }

    if (variableB.textContent === "" && variableB.parentNode === belows) belows.removeChild(variableB)
})