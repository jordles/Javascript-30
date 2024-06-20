
const slider = document.querySelector('.items');
const items = Array(30).fill(createItem());

function createItem(){
  return `
    <div class="wrapper">
      <div class ="item"><div class="shine"></div></div>
      <div class = "shadow"></div>
    </div>
  `;
}

slider.innerHTML = items.join('');


let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;

})

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
})

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
})

slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 5;
  slider.scrollLeft = scrollLeft - walk;
})

slider.addEventListener("wheel", (e) => {
  slider.classList.add("active");

  if (e.deltaY !== 0) {
    e.preventDefault();
    e.stopPropagation();
    slider.scrollLeft += e.deltaY * 2;
  }
  
});




