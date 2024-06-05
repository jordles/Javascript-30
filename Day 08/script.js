const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lineJoin = ['miter', 'round', 'bevel'];
const lineCap = ['butt', 'round', 'square']; 

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
ctx.globalCompositeOperation = 'lighter';

let isDrawing = false; //is the user currently drawing
let [lastX, lastY] = [0, 0]; 
let hue = 0;
let direction = true;
let saturation = '100%';
function draw(e){
  if (!isDrawing) return;
  console.log(e);
  // Randomize the saturation between 50% and 100%
  saturation = Math.floor(Math.random() * 51) + 50 + "%";
  console.log("saturation", saturation);
  ctx.strokeStyle = `hsl(${hue}, ${saturation}, 50%`;

  ctx.beginPath();
  //start from
  ctx.moveTo(lastX, lastY);
  //go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue = hue >= 360 ? 0 : hue + 1;

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) direction = !direction;
  direction ? ctx.lineWidth++ : ctx.lineWidth--;
}
function onResize() {
  // We need to define the dimensions of the canvas to our canvas element
  // Javascript doesn't know the computed dimensions from CSS so we need to do it manually
  width = window.innerWidth;
  height = window.innerHeight;

  // If the screen device has a pixel ratio over 1
  // We render the canvas twice bigger to make it sharper (e.g. Retina iPhone)
  
}

// Listen to resize events
window.addEventListener('resize', onResize);
// Make sure the canvas size is perfect
onResize();

canvas.addEventListener('mousedown', (e) => {
    ctx.lineJoin = lineJoin[Math.floor(Math.random() * lineJoin.length)];;
    ctx.lineCap = lineCap[Math.floor(Math.random() * lineCap.length)];

    console.log(ctx.lineJoin, ctx.lineCap);
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; //update to mouse position
});
canvas.addEventListener('mousemove', (e) =>{
  
  draw(e);
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

