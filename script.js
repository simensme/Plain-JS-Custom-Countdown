const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date input Minimum with Today's Date and converting toISOSstring
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate the countdown area
const updateDOM = () => {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide Input
        inputContainer.hidden = true;

        // If the countdown has ended we want to show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);

            // Custom Countdown Date
            const formatDate = inputDate => {
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                const date = new Date(inputDate);
                return date.toLocaleDateString('en-GB', options);
            };
            const customDate = formatDate(countdownDate);
            completeElInfo.textContent = `${countdownTitle} finished on ${customDate}`;
            completeEl.hidden = false;

        } else {

            // Show the countdown in progress
            // Populate the countdown page
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, 1000);
};

// User Values from Form input to countdown
const updateCountdown = e => {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    // Save the settings to local storage
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    // Check for valid date
    if (countdownDate === '') {
        alert('Please insert a date');
    } else {
        // Get numbered version of current Date, update DOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
};

// Reset All Values in the countdown
const reset = () => {
    // Hide countdowns and show input
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    completeEl.hidden = true;

    // Stop the countdown from the updateDOM function
    clearInterval(countdownActive);

    // Reset the values for our countdown title etc
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
};

const restorePreviousCountdown = () => {
    // Get countdown from local storage if it exists
    if (localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listener for forms
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load, check if there is local storage
restorePreviousCountdown();