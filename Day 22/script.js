const triggers = document.querySelectorAll('a:not([alt="Home"])');
console.log(triggers);
const highlight = document.createElement('span');

highlight.classList.add('highlight');
document.body.append(highlight);

let currentHighlight = null;
function highlightLink() {
    if (currentHighlight) {
        currentHighlight.classList.remove("highlight-text");
    }

  const linkCoords = this.getBoundingClientRect();
  const padding = 15; // same as padding in CSS
  const coords = {
    width: linkCoords.width + 2 * padding,
    height: linkCoords.height + 2 * padding,
    top: linkCoords.top + window.scrollY - padding,
    left: linkCoords.left + window.scrollX - padding,
  };
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

  // Add the highlight text class to change color
  this.classList.add("highlight-text");
  currentHighlight = this;
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));