const possibleCb = {
    'uppercase': "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    'lowercase': "abcdefghijklmnopqrstuvxyz",
    'numbers': "0123456789",
    'symbols': "\!#$%&/()=?<>^*@£§{[]}",
};

// Reads from inputState and outputs a 
// string of possible chars
function getPossibleString() {
    // iterates over input state object for radio + cb
    // if true, adds to possible string
    let possible = '';
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    Object.entries(getInputState(checkboxes)).forEach(
        cb => { if (cb[1]) possible += possibleCb[cb[0]] }
    );
    return possible;
}

// Generate random string with constraints
function generatePassword(length) {
    var result = '';
    const possible = getPossibleString();

    for (let i = 0; i < length; i++) {
        result += possible.charAt(
            Math.floor(Math.random() * possible.length));
    }
    return result;
}

// Range Slider Handling
function handleRangeInput(e) {
    let target = e.target;
    if (e.target.type !== 'range') {
        target = document.getElementById('range');
    }
    const min = target.min;
    const max = target.max;
    const len = target.value;
    target.style.backgroundSize = (len - min) * 100 / (max - min) + '% 100%';

    // update text value inside text box
    document.getElementById("password-result").value = generatePassword(len)
}

// Returns constraints according to
// the elements that are checked
function handleCheckboxInput(inputState) {
    return ev => {
        inputState[ev.target.id] ?
            inputState[ev.target.id] = false :
            inputState[ev.target.id] = true;
        console.log(inputState);
        // update text value inside text box
        const len = document.getElementById('range').value;
        document.getElementById("password-result").value = generatePassword(len);
    }
}

function handleRadioInput(radioInputState, cbInputState) {
    return ev => {
        Object.keys(radioInputState).forEach(
            radiobtn => { radioInputState[radiobtn] = false; }
        );
        radioInputState[ev.target.id] = true;
        let numbers = document.getElementById('numbers');
        let symbols = document.getElementById('symbols');
        if (ev.target.id == 'easy-to-say') {
            numbers.checked = false;
            symbols.checked = false;
            numbers.disabled = true;
            symbols.disabled = true;
            cbInputState['numbers'] = false;
            cbInputState['symbols'] = false;
        }
        else {
            document.getElementById('numbers').disabled = false;
            document.getElementById('symbols').disabled = false;
        }
        // console.log(radioInputState);
        // console.log(cbInputState);
        const len = document.getElementById('range').value;
        document.getElementById("password-result").value = generatePassword(len);
    }
}

function getInputState(inputs) {
    let inputState = {};
    for (let i = 0; i < inputs.length; i++) {
        const inp = inputs[i];
        inputState[inp.id] = inp.checked;
    }
    return inputState;
}

// when dom loads, listen for input changes
document.addEventListener("DOMContentLoaded", () => {

    // generate pw as soon as page loads
    let len = document.getElementById("rangenumber").value;
    document.getElementById("password-result").value = generatePassword(len);

    // Assign listener to range input
    const rangeInput = document.querySelector('input[type="range"]');
    const textInput = document.querySelector('input[type="number"]');
    rangeInput.addEventListener('input', handleRangeInput);
    textInput.addEventListener('input', handleRangeInput);

    // Assign listeners to checkbox and radio inputs
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxState = getInputState(checkboxes);
    checkboxes.forEach(elem => {
        elem.addEventListener(
            'input',
            handleCheckboxInput(checkboxState)
        );
    });

    const radios = document.querySelectorAll('input[type="radio"]');
    radioState = getInputState(radios);
    radios.forEach(elem => {
        elem.addEventListener(
            'input',
            handleRadioInput(radioState, checkboxState)
        );
    });
})



