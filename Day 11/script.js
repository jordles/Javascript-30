//Get our elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

console.log(video.networkState);

//Build our functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
    document.querySelector(`.${this.name}-text`).innerText = this.name=== 'volume' ? Math.round(this.value * 100) + '%' : this.value;
}


function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    document.querySelector('.video-duration').textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
}

function formatTime(time){
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullScreen(){
    player.classList.toggle('fullscreen');
    player.classList.contains('fullscreen') ? fullscreen.innerText = 'fullscreen_exit' : fullscreen.innerText = 'fullscreen';
    
    return !document.fullscreenElement ? player.webkitRequestFullScreen() : document.exitFullscreen();
}

//event listeners
video.addEventListener('click', togglePlay);
document.addEventListener('keydown', (e) => {
    if(e.key === ' ') togglePlay();
})

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);


ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', toggleFullScreen);