// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;
const btnStart = document.querySelector("button[data-start]");
const days = document.querySelector("span[data-days]");
const hours = document.querySelector("span[data-hours]");
const minutes = document.querySelector("span[data-minutes]");
const seconds = document.querySelector("span[data-seconds]");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const date = new Date();
        if (selectedDates[0] < date) {
            btnStart.disabled = true;
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future'
            });
        }
        else {
            btnStart.disabled = false;
        }
        userSelectedDate = selectedDates[0];
        console.log(selectedDates[0]);
    },
};

flatpickr("#datetime-picker", options);
const flatpickrInput = document.querySelector(".flatpickr-input")

btnStart.addEventListener("click", () => {
    btnStart.disabled = true;
    flatpickrInput.disabled = true;
    const intervalId = setInterval(() => {
        startTimer();
        if (startTimer() == false) {
            clearInterval(intervalId);
        }
    }, 1000);

});

function startTimer() {
    const nowDate = new Date();
    const differenceInMs = userSelectedDate.getTime() - nowDate.getTime();
    const fullDate = convertMs(differenceInMs);
    days.textContent = addLeadingZero(fullDate.days, 2);
    hours.textContent = addLeadingZero(fullDate.hours, 2);
    minutes.textContent = addLeadingZero(fullDate.minutes, 2);
    seconds.textContent = addLeadingZero(fullDate.seconds, 2);
    if (differenceInMs < 1000) {
        return false;
    }
}

function addLeadingZero(value, targetLength) {
    if (value < 10 || value >= 100) {
        return value.toString().padStart(targetLength, "0");
    }
    else {
        return value;
    }

}


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

