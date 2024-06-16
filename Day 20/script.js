
//setting speech recognition global variable to accommodate different browsers
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.interimResults = true;
recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

const audioChunks = [];
let mediaRecorder;

// Function to handle the recording process
async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
            audioChunks.push(e.data);
        };

        mediaRecorder.start();
    } catch (error) {
        console.error('Error accessing microphone:', error);
    }
}


// Function to stop recording and return the audio blob
function stopRecording() {
    return new Promise(resolve => {
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            audioChunks.length = 0;
            resolve(audioBlob);
        };
        mediaRecorder.stop();
    });
}

recognition.addEventListener('start', startRecording);
recognition.addEventListener('result', async (e) => {
    const transcript = Array.from(e.results)
        .map(result => result[0].transcript)
        .join('');

    if (transcript && copyButton.disabled) {
      copyButton.disabled = false;
    }

    p.textContent = transcript;
    if(e.results[0].isFinal){
        const audioBlob = await stopRecording();
        const audioUrl = URL.createObjectURL(audioBlob);

        p.dataset.audio = audioUrl; // Associate the audio URL with the p element

        p = document.createElement('p');
        words.appendChild(p);
        
        // Restart the recording for the next segment
        startRecording();
    }
})

recognition.addEventListener('end', recognition.start); //restart our mic
recognition.start();

// Play the associated audio when a p element is clicked
words.addEventListener('click', (e) => {
    if (e.target.tagName === 'P' && e.target.dataset.audio) {
        const audio = new Audio(e.target.dataset.audio);

        const soundIcon = document.createElement('span');
        soundIcon.classList.add('material-icons-round');
        soundIcon.textContent = 'volume_up';
        e.target.appendChild(soundIcon);

        audio.play();

        audio.addEventListener("ended", () => {
          e.target.removeChild(soundIcon);
        });
    }
});


const copyButton = document.querySelector(".copy-button");
copyButton.addEventListener("click", (event) => {
  copyToClipBoard(words.innerText);
});

function copyToClipBoard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const buttonText = copyButton.innerText;
    copyButton.innerText = "Copied!";
    copyButton.classList.add("copied");

    setTimeout(() => {
      copyButton.innerText = buttonText;
      copyButton.classList.remove("copied");
    }, 500);
  });
}

//testing mic issues
/* document.getElementById("start").addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    document.getElementById("status").textContent = "Microphone is accessible!";
    // Stop the tracks to release the microphone
    stream.getTracks().forEach((track) => track.stop());
  } catch (err) {
    document.getElementById("status").textContent =
      "Error accessing microphone: " + err.message;
    console.error("Error accessing microphone:", err);
  }
}); */