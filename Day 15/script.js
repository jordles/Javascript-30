const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const checkAll = document.querySelector('.check');
const clearAll = document.querySelector('.clear');

const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault(); //so form doesn't refresh the page
    const text = (this.querySelector('[name=item]')).value; //input value
    //this refers to the form

    const item = {
        text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, index) => {
        return `
        <li>
            <input type="checkbox" data-index=${index} id="item${index}" ${plate.done ? 'checked' : ''} />
            <label for="item${index}">${plate.text}</label>
        </li>
        
        `
    }).join('');
        
}

function toggleDone(e){
    if(!e.target.matches('input')) return;
    const el = e.target;
    console.log(el.dataset)
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function toggleAllOn(e){
    items.forEach(item => item.done = true);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function toggleAllOff(e){
    items.forEach((item) => (item.done = false));
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
}
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone)
checkAll.addEventListener('click', toggleAllOn);
clearAll.addEventListener('click', toggleAllOff);
populateList(items, itemsList)