const timer = document.querySelector('.timer');
const endTimer = document.querySelector('.end-time');
const buttons = document.querySelectorAll("[data-time]");
const timerInput = document.querySelector('[name="timer-input"]');
console.log(typeof timerInput.value);
console.log(buttons);
function parseTime(time){
  let hours = 0, minutes = 0, seconds = 0; //initialize

  parts = time.split(':').map(Number).reverse();

  switch(parts.length){
    case 3: 
      [seconds, minutes, hours] = parts;
      break;
    case 2:
      [minutes, hours] = parts;
      break;
    default:
      [minutes] = parts;
      break;
  }

  console.log(hours);
  console.log(minutes);
  console.log(seconds);
  return hours * 3600 + minutes * 60 + seconds;
}


let countdown; /* startTimer('::3'); */

function parseData(){
  const time = this.dataset.time;
  startTimer(time);
}
function startTimer(time){
  clearInterval(countdown);
  console.log(time);
  let seconds = parseTime(time);
  console.log('time', time);
  console.log(seconds);
  /* console.log(seconds); */
  const endTime = Date.now() + seconds * 1000; //because date.now returns in ms, we have to convert our seconds to ms

  displayTimeLeft(seconds);
  displayEndTime(endTime);

  countdown = setInterval(() => {
    /* let secondsLeft = Math.round((endTime - Date.now()) / 1000); */

    if(seconds <= 0){
      timer.textContent = 'Please select or add a timer';
      endTimer.textContent = '';
      clearInterval(countdown);
      return;
    }
    seconds --;
    displayTimeLeft(seconds);
  }, 1000);
}

function displayTimeLeft(seconds){
  const hoursLeft = Math.floor(seconds / 3600);
  const minutesLeft = Math.floor((seconds / 60) % 60);
  const secondsLeft = seconds % 60;

  // Pad each time unit with leading zeros to ensure two digits
  const paddedHoursLeft = String(hoursLeft).padStart(2, "0");
  const paddedMinutesLeft = String(minutesLeft).padStart(2, "0");
  const paddedSecondsLeft = String(secondsLeft).padStart(2, "0");

  const timeLeft =
    hoursLeft > 0
      ? `${paddedHoursLeft}:${paddedMinutesLeft}:${paddedSecondsLeft}`
      : `${minutesLeft}:${paddedSecondsLeft}`;
  timer.textContent = timeLeft;
}
function displayEndTime(time){
  const end = new Date(time);
  const timeConfig = {hour: 'numeric', minute: '2-digit'};
  endTimer.textContent = `Be Back At ${end.toLocaleTimeString(navigator.language, timeConfig)}`;
}

buttons.forEach((button) => button.addEventListener("click", parseData));


document.querySelector('.play-timer').addEventListener('click', (e) =>{
  e.preventDefault();
  startTimer(timerInput.value);
  timerInput.value = '';
});

document.querySelector('.add-timer').addEventListener('click', (e) =>{
  e.preventDefault();
  addButton(timerInput.value);
  timerInput.value = '';
})
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  startTimer(timerInput.value);
  timerInput.value = '';
});

function addButton(time){
  const button = document.createElement('button');
  button.setAttribute('data-time', time);
  const timeParse = time.split(':').map(str => str.padStart(2, "0")).join(':');
  button.textContent = timeParse;
  button.addEventListener('click', parseData);
  document.querySelector('.selection').appendChild(button);
}
/* 
function parseTimeString(timeString) {
  const timeParts = timeString.split(":").map(Number);
  const [seconds, minutes, hours] = [0, 0, 0]; // Default values

  if (timeParts.length === 3) {
    [hours, minutes, seconds] = timeParts;
  } else if (timeParts.length === 2) {
    [minutes, seconds] = timeParts;
  } else if (timeParts.length === 1) {
    [seconds] = timeParts;
  }

  return { hours, minutes, seconds };
} */