const possibleCb = {
    'uppercase': "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    'lowercase': "abcdefghijklmnopqrstuvxyz",
    'numbers': "0123456789",
    'symbols': "\!#$%&/()=?<>^*@£§{[]}",
};

// Password strength
// based on shannon entropy
// https://gist.github.com/jabney/5018b4adc9b2bf488696?permalink_comment_id=3089875#gistcomment-3089875
function entropy(str) {
    const len = str.length

    // Build a frequency map from the string.
    const frequencies = Array.from(str)
        .reduce((freq, c) => (freq[c] = (freq[c] || 0) + 1) && freq, {})

    // Sum the frequency of each character.
    return Object.values(frequencies)
        .reduce((sum, f) => sum - f / len * Math.log2(f / len), 0)
}

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
    console.log(entropy(result));
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
        let lowercase = document.getElementById('lowercase');
        let uppercase = document.getElementById('uppercase');
        if (ev.target.id == 'easy-to-say') {
            numbers.checked = false;
            symbols.checked = false;
            numbers.disabled = true;
            symbols.disabled = true;
            cbInputState['numbers'] = false;
            cbInputState['symbols'] = false;
        }
        else if (ev.target.id == 'all-chars') {
            document.getElementById('numbers').disabled = false;
            document.getElementById('symbols').disabled = false;
            numbers.checked = true;
            symbols.checked = true;
            lowercase.checked = true;
            uppercase.checked = true;
        }
        else {
            document.getElementById('numbers').disabled = false;
            document.getElementById('symbols').disabled = false;
        }
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

    // Assign listeners to btns
    let regenBtn = document.getElementById('generate-btn');
    regenBtn.addEventListener('click', () => {
        document.getElementById("password-result").value = generatePassword(
            document.getElementById("password-result").value.length
        );
    });
    let copyBtn = document.getElementById('copy-btn');
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(
            document.getElementById("password-result").value
        );
    })
    let copyBtn2 = document.getElementById('copy-password-btn');
    copyBtn2.addEventListener('click', () => {
        navigator.clipboard.writeText(
            document.getElementById("password-result").value
        );
    })

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



