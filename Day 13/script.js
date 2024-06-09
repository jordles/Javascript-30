function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  const {clientHeight} = document.documentElement; 
    console.log(clientHeight)
  sliderImages.forEach(sliderImage => {
    const image = sliderImage.getBoundingClientRect(); //in relation to viewport

    // half way through image
    const slideInAt = window.innerHeight - image.height / 2;

    // Check if the image is half shown
    const isHalfShown = image.top <= slideInAt;

    // Check if the image is still within the viewport
    const isNotScrolledPast = image.bottom >= 0;

    // Add or remove the active class based on visibility
    if (isHalfShown && isNotScrolledPast) {
    sliderImage.classList.add("active");
    } else {
    sliderImage.classList.remove("active");
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));

