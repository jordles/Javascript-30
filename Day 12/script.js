const pressed = [];
const secretCode = 'meow';
function cornify() {
    for(let i = 0; i < 10; i++) {
        cornify_add();
    }
}
window.addEventListener('keyup', (e) => {
    pressed.push(e.key);
    /* pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length); // kinda confusing to think about... also... i think the -1 is unnecessary since splice's first parameter is the starting index, the length property would give us index 0*/

    if(pressed.length > secretCode.length) pressed.shift(); //this code is more intuitive.
    document.querySelector('.code').innerText = pressed.join('');
    if(pressed.join('').includes(secretCode)) cornify();
})