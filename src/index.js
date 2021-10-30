// Range Slider
function handleInputChange(e) {
    let target = e.target;
    console.log(target);
    if (e.target.type !== 'range') {
        target = document.getElementById('range');
    }
    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

// when dom loads, listen for input changes
document.addEventListener("DOMContentLoaded", () => {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    const textInput = document.querySelector('input[type="number"]');
    rangeInputs.forEach(input => {
        input.addEventListener('input', handleInputChange);
    })
    textInput.addEventListener('input', handleInputChange);
})

