const pores = document.querySelectorAll(".pore");
const scoreBoard = document.querySelector(".score");
const pimples = document.querySelectorAll(".pimple");
const popAudio = document.querySelector(".pop-audio");
const difficulty = document.querySelectorAll("[data-difficulty]");

let timeUp = false;
let currentDifficulty = "normal";
let counter = 0; 
const difficultyLevels = {
  easy: {
    min: 700,
    max: 1000,
    enflamed: 5,
  },
  normal: {
    min: 500,
    max: 900,
    enflamed: 20,
  },
  hard: {
    min: 400,
    max: 900,
    enflamed: 50,
  },
};

function randTime(min, max){
  return Math.round(Math.random() * (max - min) + min);
}

function randomPore(pores){
  const idx = Math.floor(Math.random() * pores.length);
  return pores[idx];
}

function peep(min, max, enflamed){
  const time = randTime(min, max);
  const pore = randomPore(pores);
  const pimple = pore.querySelector(".pimple");
  enflamedPimple(pimple, enflamed);
  pore.classList.add("up");
  setTimeout(() => {
    counter = 0;
    pore.classList.remove("up");
    if(pimple.classList.contains("enflamed") && pimple.classList.contains('up'))
      pimple.addEventListener('transitionend', () => pimple.classList.remove("enflamed"));

    if(!timeUp){
      console.log('timeUp', timeUp);
      peep(min, max, enflamed);
    } 
  }, time);
}

function startGame(){
  counter = 0;
  scoreBoard.textContent = 0;
  score = 0;
  timeUp = false;

  const {min, max, enflamed} = difficultyLevels[currentDifficulty];
  console.log('min, max, enflamed', min, max, enflamed);
  peep(min, max, enflamed);
  setTimeout(() => timeUp = true, 10000);
}

function enflamedPimple(pimple, percent){
  if(Math.round(Math.random() * 100) <= percent) pimple.classList.add("enflamed");
}
function pop(e){
  if(!e.isTrusted) return;
  
  console.log(this);
  if(this.classList.contains("enflamed")){
    counter++;
    console.log('counter', counter);
    if(counter == 2){
      score++;
      popAudio.currentTime = 0;
      popAudio.play();
      this.parentNode.classList.remove("up");
      if (this.classList.contains("enflamed") && this.classList.contains("up"))
        this.addEventListener("transitionend", () => this.classList.remove("enflamed"));
      /* this.classList.remove("enflamed");  */
    }
  }
  else {
    score++;
    popAudio.currentTime = 0;
    popAudio.play();
    this.parentNode.classList.remove("up");
  }
  scoreBoard.textContent = score;
}

pimples.forEach(pimple => pimple.addEventListener("click", pop));
//There is also a 'dblclick' event for double clicks. Can possibly be used for enflamed pimples. 

difficulty.forEach(difficulty => difficulty.addEventListener("click", handleDifficulty));

function handleDifficulty(){
  const selected = document.querySelector(".selected");
  if(selected) selected.classList.remove("selected");

  this.classList.add('selected');
  currentDifficulty = this.dataset.difficulty;
}