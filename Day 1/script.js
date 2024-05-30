
window.addEventListener('keypress', function(event){
  const audio = document.querySelector(
    `audio[data-key="${event.key.toUpperCase()}"]`
  );
  const key = document.querySelector(
    `.key[data-key="${event.key.toUpperCase()}"]`
  );
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();

  key.classList.remove("playing");
  /* void key.offsetWidth; */
  requestAnimationFrame((time) => { //run an animation again, while it's still playing (mdn's solution)
    requestAnimationFrame((time) => {
        key.classList.add("playing");
    });
  });
  
})
//keyCode is depreciated, so lets use event.key instead