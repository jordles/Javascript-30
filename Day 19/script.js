const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d", {willReadFrequently: true});
const strip = document.querySelector(".strip");
const stripImgs = document.querySelectorAll(".strip a");
const snap = document.querySelector(".snap");
const timer = document.querySelector('.timer');
const effectCategory = document.querySelectorAll("[data-category]");
const colors = document.querySelectorAll("[data-color]");
const reset = document.querySelector(".reset");
const printElement = document.querySelector(".print");
const printButton = document.querySelector(".print-button");

async function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(error => {
        alert("If you haven't please turn on camera permissions for this application to properly work! " + error);
        console.error(
          "If you haven't please turn on camera permissions for this application to properly work! ",
          error
        );
    });
}
let effect = null;
function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    console.log(width, height);
    canvas.width = width;
    canvas.height = height;

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = effects.greenScreenEffect(pixels);
        if(effect) pixels = effects[effect](pixels); //apply the effect
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function startCountdown() {
    
  const countdownElement = document.querySelector(".timer-countdown");
  let countdownValue = 3;

  countdownElement.classList.remove("displayNone");
  countdownElement.innerHTML = countdownValue;

  function animateCountdown() {
    countdownElement.style.animation = "shrinkFade 1s ease-in-out";

    countdownElement.addEventListener(
      "animationend",
      () => {
        countdownValue--;
        if (countdownValue >= 1) {
          countdownElement.style.animation = "none";
          countdownElement.offsetHeight; // trigger reflow
          countdownElement.style.animation = null;
          countdownElement.innerHTML = countdownValue;
          animateCountdown();
        } else {
          countdownElement.classList.add("displayNone");
          countdownElement.innerHTML = 3;
          snapPhoto();
        }
      },
      { once: true }
    );
  }

  animateCountdown();
}

function takePhoto(){

  if(timer.classList.contains('selected')) {
    startCountdown();
  }else{
    snapPhoto();
  };
}

function snapPhoto(){
  // play sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  /* link.href = data; */
  link.setAttribute("download", "photo");
  link.innerHTML = `<img src="${data}" alt="photo" /><span class="displayNone">✔️</span>`;
  /* link.style.background = "white";
  link.style.padding = "0.8rem 0.8rem 2.5rem 0.8rem";
  link.style.boxShadow = "0 0 3px rgba(0,0,0,0.2)"; */

  const printLink = document.createElement("a");
  printLink.href = data;
  printLink.setAttribute("download", "photo");
  printLink.innerHTML = `<img src="${data}" alt="photo" />`;
  link.addEventListener("click", () => {
    const selectedImages = document.querySelectorAll(".selectImg");
    if (link.classList.contains("selectImg") || selectedImages.length < 3) {

      link.classList.toggle("selectImg");
      link.querySelector("span").classList.toggle("displayNone");

      if (link.classList.contains("selectImg")) {
        printElement.appendChild(printLink);
      } else {
        console.log(printElement);
        console.log(printLink);
        console.log(printElement.contains(printLink));
        if (printElement.contains(printLink))
          printElement.removeChild(printLink);
      }
      console.log(selectedImages.length)
      if (selectedImages.length == 2) {
        printButton.classList.remove('displayNone');
      }
    }
  });
  // Get the current background of the canvas and set it on the link
  const canvasBackground = window.getComputedStyle(canvas).background;

  strip.insertBefore(link, strip.firstChild);
  console.log(strip);
  const stripImg = strip.querySelector("img");

  stripImg.style.background = canvasBackground;
  stripImg.style.backgroundSize = "cover"; // Ensure the background covers the link element

  // Make sure the img is a static image (not a gif)
  // by setting the src attribute to the PNG data URL
  stripImg.stopAnimating = true;
}
const effects = {
    redEffect(pixels){
        for(let i = 0; i < pixels.data.length; i += 4){
            pixels.data[i + 0] += 100; // RED
        }
        return pixels;
    },

    greenEffect(pixels){
        for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 1] += 100; // RED
        }
        return pixels;
    },

    blueEffect(pixels){
        for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 2] += 100; // RED
        }
        return pixels;
    },

    cyanEffect(pixels){
        for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] -= 100; // RED
        }
        return pixels;
    },

    magentaEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 1] -= 100; // RED
    }
    return pixels;
    },
    yellowEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 2] -= 200; // RED
    }
    return pixels;
    },

    rgbSplitEffect(pixels){
        for(let i = 0; i < pixels.data.length; i += 4){
            pixels.data[i - 150] = pixels.data[i + 0]; // RED
            pixels.data[i + 100] = pixels.data[i + 1]; // GREEN
            pixels.data[i - 150] = pixels.data[i + 2]; // Blue
        }
        return pixels;
    },

    greenScreenEffect(pixels){
        const levels = {};

        document.querySelectorAll(".rgb input").forEach((input) => {
            levels[input.name] = input.value;
        });

        for (i = 0; i < pixels.data.length; i = i + 4) {
            red = pixels.data[i + 0];
            green = pixels.data[i + 1];
            blue = pixels.data[i + 2];
            alpha = pixels.data[i + 3];

            if (red >= levels.rmin
                && green >= levels.gmin
                && blue >= levels.bmin
                && red <= levels.rmax
                && green <= levels.gmax
                && blue <= levels.bmax) {

                // take it out!
                pixels.data[i + 3] = 0;
            }
        }
        return pixels;
    }
};
getVideo();

video.addEventListener("canplay", paintToCanvas);

strip.addEventListener("wheel", (event) => {
  if (event.deltaY !== 0) {
    event.preventDefault();
    event.currentTarget.scrollLeft += event.deltaY;
  }
});

effectCategory.forEach((effect) => effect.addEventListener("click", () => {
    document.querySelector(`.${effect.dataset.category}`).classList.toggle("none");
    effect.classList.toggle("selected");
}));

timer.addEventListener("click", () => {
    timer.classList.toggle("selected");
})

colors.forEach((color) => color.style.background = color.dataset.color);

colors.forEach((color) => color.addEventListener("click", () => {
    effect = effect == `${color.dataset.color}Effect` ? null : `${color.dataset.color}Effect`;
}));

document.querySelector('input[type="color"]').addEventListener("input", (event) => {
    console.log(event.target.value);
    canvas.style.background = event.target.value;
})

document.querySelector('input[type="file"]').addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      canvas.style.background = `url(${e.target.result})`;
      canvas.style.backgroundSize = "cover";
    };

    reader.readAsDataURL(file);
})

reset.addEventListener("click", () => {
    canvas.style.background = "none";
    document.querySelectorAll('input[type="range"]').forEach((range) => range.value = 128);
})

printButton.addEventListener("click", () => {
    printElement.style.transform = "translateY(0)";
    printButton.classList.add('displayNone');
});

/* console.log(stripImgs)
stripImgs.forEach(stripImg => stripImg.addEventListener("click", () => {
    console.log(stripImg);
    stripImg.classList.toggle('selectImg')

})); */
