
const nav = document.querySelector("nav");
const navTop = nav.offsetTop;

function handleScroll() {
    console.log(window.scrollY);
    console.log('navTop', navTop);
  if (window.scrollY >= navTop) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}

window.addEventListener("scroll", handleScroll);