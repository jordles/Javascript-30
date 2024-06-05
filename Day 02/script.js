setDate();

function scrollToPercent(percent) { //this function helps us stay in the appropriate position of our background
  // Calculate the target scroll position
  const background = document.querySelector(".background");
  const backgroundHeight = background.scrollHeight;
  const targetPosition =
    backgroundHeight * (percent / 100) - window.innerHeight * (percent / 100);
  console.log(targetPosition);
  // Scroll to the target position
  document.body.scrollTo({
    top: targetPosition,
  });
}
scrollToPercent(55);
// Add event listener for window resize
window.addEventListener("resize", () => scrollToPercent(55));

// Prevent scrolling code
/* document.body.addEventListener('wheel', function(e) {
    console.log(e);
  e.preventDefault();
  e.stopPropagation();
  
},{ passive: false }); */
/* const secondHand = document.querySelector('.second-hand'); */
function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90; //offset;
  const secondHand = document.querySelector(".second-hand");

  if (seconds === 0) {
    secondHand.style.transition = "none";
  } else {
    secondHand.style.transition = "all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)";
  }
  secondHand.style.transform = `translateY(-50%) rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = (mins / 60) * 360 + 90;
  const minsHand = document.querySelector(".min-hand");
  minsHand.style.transform = `translateY(-50%) otate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = (hour / 12) * 360 + 90;
  const hourHand = document.querySelector(".hour-hand");
  hourHand.style.transform = `translateY(-50%) rotate(${hourDegrees}deg)`;

  const digitalClock = document.querySelector(".digital");
  digitalClock.innerHTML = now.toLocaleTimeString();
}

setInterval(setDate, 1000);

const clockTwo = document.querySelector(".clock.two");
const secondHand = document.querySelector(".second-hand");

clockTwo.addEventListener("mouseover", () => {
  secondHand.style.opacity = "1";
});

clockTwo.addEventListener("mouseout", () => {
  secondHand.style.opacity = "";
});
