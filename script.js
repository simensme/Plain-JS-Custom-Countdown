const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');

let countdownTitle = '';
let countdownDate = '';


// Set Date input Minimum with Today's Date and converting toISOSstring
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// User Values from Form input to countdown
const updateCountdown = e => {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
}

// Event Listener for forms
countdownForm.addEventListener('submit', updateCountdown);