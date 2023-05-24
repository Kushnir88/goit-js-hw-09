import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix'

  const startButton = document.querySelector('[data-start]');
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  startButton.disabled = true;


document.addEventListener('DOMContentLoaded', function () {
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDateTime = selectedDates[0];

      if (selectedDateTime <= new Date()) {
        Notiflix.Notify.failure("Please choose a date in the future");
        startButton.disabled = true;
    } else {
      Notiflix.Notify.success('Valid date selected');
    }

      const startButton = document.querySelector('[data-start]');
      startButton.disabled = false;
    },
  };

  const dateTimePicker = flatpickr("#datetime-picker", options);

  let countdownInterval;

  function startCountdown() {
    const selectedDateTime = dateTimePicker.selectedDates[0];
  
    if (!selectedDateTime) {
      Notiflix.Notify.failure("Please select a valid date and time.");
      return;
    }
  
    startButton.disabled = true; 
  
    clearInterval(countdownInterval);
  
    countdownInterval = setInterval(function () {
      const currentTime = new Date().getTime();
      const timeDifference = selectedDateTime - currentTime;
  
      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        updateCountdownDisplay(0, 0, 0, 0);
        return;
      }
  
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateCountdownDisplay(days, hours, minutes, seconds);
    }, 1000);
  }

  function updateCountdownDisplay(days, hours, minutes, seconds) {
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
  startButton.addEventListener('click', startCountdown);
});

// Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах//
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