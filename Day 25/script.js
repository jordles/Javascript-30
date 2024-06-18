const divs = document.querySelectorAll('.box');
const selectElement = document.querySelector("#propagation-mode");

function logText(e){
    console.log(this.classList.value);
    this.style.setProperty("--background", "rgb(0 0 0 / .50)");
    /* this.classList.add('active'); */

    e.target.querySelector('span').textContent = 'Clicked!';
    setTimeout(() => {
        /* this.classList.remove('active'); */
        this.style.setProperty("--background", "none");
        e.target.querySelector("span").textContent = "";
    }, 1000);

    const mode = selectElement.value;
    console.log(mode);
    if(mode === "Stop Propagation") {e.stopPropagation()};
}

function removeAllEventListeners(div) {
    
  div.removeEventListener("click", logText, { capture: true });
  div.removeEventListener("click", logText, { capture: false });
  div.addEventListener("click", logText, { capture: false });
}

function updateEventListeners() {
  const mode = selectElement.value;
  console.log(mode)
  divs.forEach((div) => {
    div.style.setProperty("--background", "none");
    
    // Remove all existing listeners first
    removeAllEventListeners(div);

    if (mode === "Capture") {
      div.addEventListener("click", logText, { capture: true });
    } else if (mode === "Bubbling") {
      div.addEventListener("click", logText, { capture: false });
    } else if (mode === "Stop Propagation") {
      div.addEventListener("click", logText, { capture: false });
    }
  });
}

// Initial setup
updateEventListeners();

selectElement.addEventListener("change", updateEventListeners);


/* divs.forEach(div => div.addEventListener('click', logText, {
    capture: false,
    once: true //unbind itself once it's triggered
})); */