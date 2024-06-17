const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
const spans = document.querySelectorAll('span');
msg.text = document.querySelector('[name="text"]').value;
console.log(msg);

function grabVoices(){
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes("en"))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join("");
}

function setVoice(e){

    console.log(e.target.value);
    msg.voice = voices.find(voice => voice.name === e.target.value);
    toggleVoice();
}

function toggleVoice(startOver = true){
    /* if(!speechSynthesis.speaking){
        speakButton.toggleAttribute('disabled');
    }  */

    speechSynthesis.cancel();
    if(startOver){
        speechSynthesis.speak(msg);
        speakButton.setAttribute('disabled', true);
    }
    else{
        speakButton.removeAttribute('disabled');
    }
}

function setOption(){
    msg[this.name] = this.value;
    spans.forEach((view) => {
        if(view.dataset.name == this.name) view.innerText = this.value
    });
    toggleVoice();
}

speechSynthesis.addEventListener("voiceschanged", grabVoices);
voicesDropdown.addEventListener('change', setVoice)
options.forEach(option => option.addEventListener('input', setOption));
speakButton.addEventListener('click', toggleVoice);
stopButton.addEventListener('click', () => toggleVoice(false))
msg.addEventListener("end", () => speakButton.toggleAttribute("disabled"));