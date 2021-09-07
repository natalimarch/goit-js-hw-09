// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const pick = document.querySelector("#date-selector");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");


let timerId = null;
let selectedByUser = 0;
let diffTime = 0;


flatpickr(pick, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
  let currentDate = new Date();
  selectedByUser = selectedDates[0].getTime();
  console.log(selectedDates[0]);
  if (selectedByUser <= currentDate.getTime()) {
    return alert("Please choose a date in the future");
  } 
  startBtn.disabled = false;
  return selectedByUser;
  },
});

startBtn.addEventListener('click', timerStart);
stopBtn.addEventListener('click', timerStop);

startBtn.disabled = true;

function timerStart() {
timerId = setInterval(() => {
const currentDate = new Date();
diffTime = selectedByUser - currentDate.getTime();
console.log(currentDate.getTime());
const timerPar = convertMs(diffTime);
days.textContent = `${timerPar.days}`;
hours.textContent = `${timerPar.hours}`;
minutes.textContent = `${timerPar.minutes}`;
seconds.textContent = `${timerPar.seconds}`;
if (diffTime <= 0) {
timerStop();
}
}, 1000);
}

function timerStop() {
  clearInterval(timerId);
  days.textContent = "00";
  hours.textContent = "00";
  minutes.textContent = "00";
  seconds.textContent = "00";
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
return String(value).padStart(2, "0");
}