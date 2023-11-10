const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

const second = 1000;
const minute = second*60;
const hour = minute*60;
const day = hour*24;

// Set Date input Minimum with Today's Date and converting toISOSstring
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate the countdown area
const updateDOM = () => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day)/hour);
    const minutes = Math.floor((distance % hour)/minute);
    const seconds = Math.floor((distance % minute)/second);

    // Populate the countdown page
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
    // Hide Input
    inputContainer.hidden = true;

    // Show Countdown
    countdownEl.hidden = false;
}

// User Values from Form input to countdown
const updateCountdown = e => {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    // Get numbered version of current Date, update DOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
}

// Event Listener for forms
countdownForm.addEventListener('submit', updateCountdown);