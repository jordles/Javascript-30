
function populateVideos(num){
    for(let i = 1; i <= num; i++){
        const time = getRandomTime();
        videos.innerHTML += `
            <li data-time="${time}">
                <span>Video ${i}</span>
                <span>${time}</span>
            </li>
        `;
    }   
}

function getRandomTime(){
    let minutes = Math.floor(Math.random() * 60);
    let seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

const videos = document.querySelector('.videos');

populateVideos(Math.ceil(Math.random() * 60));

const videoTimes = document.querySelectorAll('[data-time]');
const sumInSeconds = Array.from(videoTimes).reduce((acc, video) => {
    const [minutes, seconds] = video.dataset.time.split(':');
    const timeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);

    console.log(timeInSeconds)
    return acc + timeInSeconds
}, 0);

let remainingSec = sumInSeconds;
const hours = Math.floor(remainingSec / 3600);
remainingSec = remainingSec % 3600;
const minutes = Math.floor(remainingSec / 60).toString().padStart(2, '0');
remainingSec = remainingSec % 60;
const seconds = remainingSec.toString().padStart(2, "0");;

const total = [hours, minutes, seconds].join(':');
videos.innerHTML += `
  <li data-time="${total}">
    <span>Total</span>
    <span>${total}</span>
  </li>
`;
