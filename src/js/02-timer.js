import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix'

// Отримуємо посилання на елементи з DOM
const datePickerInput = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let countdownInterval;

function updateTimer() {
  const targetDate = flatpickr.parseDate(datePickerInput.value, "Y-m-d H:i");
  const currentDate = new Date();

  // Перевірка на досягнення цільового часу
  if (currentDate >= targetDate) {
    clearInterval(countdownInterval);
    return;
  }

  const timeDifference = targetDate - currentDate;
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  // Оновлення значень таймера в DOM
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

startButton.addEventListener("click", function () {
  clearInterval(countdownInterval);
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    // Перевірка на вибір дати в майбутньому
    if (selectedDate < new Date()) {
      Notiflix.Report.failure("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datePickerInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}