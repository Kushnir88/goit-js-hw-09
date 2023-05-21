import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix'

document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.querySelector('[data-start]');
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  // Кнопка Start неактивна при завантаженні сторінки
  startButton.disabled = true;

  // Форматування чисел менше двох символів
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

  // Оновлення значень таймера
  function updateTimer(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }

  // Перевірка валідності дати
  function validateDate(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      Notiflix.Notify.success('Valid date selected');
      startButton.disabled = false;
    }
  }

  // Обробник натискання на кнопку "Start"
  startButton.addEventListener('click', function() {
    startButton.disabled = true;
    const selectedDate = flatpickr.parseDate(document.querySelector('#datetime-picker').value);
    const currentDate = new Date();
    const timeDifference = selectedDate.getTime() - currentDate.getTime();

    if (timeDifference <= 0) {
      updateTimer(0);
    } else {
      updateTimer(timeDifference);
      setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTime = selectedDate.getTime() - currentTime;

        if (remainingTime <= 0) {
          updateTimer(0);
        } else {
          updateTimer(remainingTime);
        }
      }, 1000);
    }
  });

  // Ініціалізація flatpickr
  flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: validateDate
  });
  
});

// Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.
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