// obtains constraints for password generation
function getPasswordParams(cbState, rbState, length) {
    const possibleCb = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvxyz",
        numbers: "0123456789",
        symbols: "\!#$%&/()=?<>^*@£§{[]}",
    };
    const possibleRadios = {
        "easy-to-say": '',
        "easy-to-read": '',
        "all-chars": ''
    };
}

// Generate random string with constraints
function generatePassword(params, length) {
    var result = '';
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" // temp
    for (let i = 0; i < length; i++) {
        result += uppercase.charAt(
            Math.floor(Math.random() * uppercase.length));
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

    // get password and write on page
    //let pw = generatePassword(getPasswordParams(cbState, rbState), len);

    let pw = generatePassword(null, len);
    output = document.getElementById("password-result");
    output.value = pw;
}

// Returns constraints according to
// the elements that are checked
function handleCheckboxInput(inputState) {
    return ev => {
        inputState[ev.target.id] ?
            inputState[ev.target.id] = false :
            inputState[ev.target.id] = true;
        console.log(inputState);
    }
}

function handleRadioInput(inputState) {
    return ev => {
        Object.keys(inputState).forEach(
            radiobtn => { inputState[radiobtn] = false; }
        );
        inputState[ev.target.id] = true;
        console.log(inputState);
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
    /* let pw = generatePassword(getPasswordParams(cbState, rbState), len); */
    let len = document.getElementById("rangenumber").value;
    // get password and write on input field
    document.getElementById("password-result").value = generatePassword(null, len);

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
            handleRadioInput(radioState)
        );
    });


    // generatePassword([checkboxState, radioState], textInput.value);
})



