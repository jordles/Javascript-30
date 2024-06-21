const speed = document.querySelector('.speed');
const bar = document.querySelector('.speed-bar');
const barSpan = document.querySelector('.speed-bar > span');
const video = document.querySelector('.flex');

const initialPlaybackRate = 1.0;
const initialHeight = (initialPlaybackRate / 4) * 100 + "%";
bar.style.height = initialHeight;
barSpan.textContent = `${initialPlaybackRate.toFixed(1)}x`;
video.playbackRate = initialPlaybackRate;


let isDown = false;
function handleMove({offsetY}){ //e.offsetY
  if(!isDown) return;
  /* const y = e.pageY - this.offsetTop; */
  console.log('offsetY', offsetY);
  console.log('offsetHeight', this.offsetHeight);
  const percent = offsetY / this.offsetHeight;
  console.log('percent', percent);
  const min = 0.4;
  const max = 4;
  const height = Math.round(percent * 100) + '%';
  const playbackRate = percent * max;
  console.log('playbackRate', playbackRate.toFixed(1));
  if(playbackRate >= min){
    bar.style.height = height;
    barSpan.textContent = `${playbackRate.toFixed(1)}x`;
    video.playbackRate = playbackRate.toFixed(1);
  }
  
}

speed.addEventListener("mousedown", () => isDown = true);
speed.addEventListener("mouseup", () => isDown = false);
speed.addEventListener("mousemove", handleMove);
speed.addEventListener("mousedown", handleMove);