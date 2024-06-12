const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 200; 
function shadow(e){
    const {offsetWidth: width, offsetHeight: height} = hero;
    let {clientX: x, clientY: y} = e;
    /* if(this !== e.target){ //not needed
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    } */

    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    const xWalk2 = Math.round((x / width * walk * 2) - (walk * 2 / 2));
    const yWalk2 = Math.round((y / height * walk * 2) - (walk * 2 / 2));

    const xWalk3 = Math.round((x / width * walk * 3) - (walk * 3 / 2));
    const yWalk3 = Math.round((y / height * walk * 3) - (walk * 3 / 2));

    const xWalk4 = Math.round((x / width * walk * 4) - (walk * 4 / 2));
    const yWalk4 = Math.round((y / height * walk * 4) - (walk * 4 / 2));

    text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${xWalk2}px ${yWalk2}px 0 rgba(0,255,255,0.7),
    ${xWalk3}px ${yWalk3}px 0 rgba(0,255,0,0.7),
    ${xWalk4}px ${yWalk4}px 0 rgba(0,0,255,0.7)
    `
    
}

document.addEventListener('mousemove', shadow);