const checkboxes = document.querySelectorAll(".inbox input[type='checkbox']");

let lastChecked;
function handleCheck(e){
    let inBetween = false;
    if(e.shiftKey && this.checked){
        checkboxes.forEach(checkbox => {
            if(checkbox === this || checkbox === lastChecked) inBetween = !inBetween;
            if(inBetween) checkbox.checked = true;
        })
    }
    else if(e.shiftKey && !this.checked){ //unchecking the checkboxes through shift
        checkboxes.forEach((checkbox )=> {
            if(checkbox=== this) inBetween = !inBetween;
            if(checkbox.checked && inBetween) checkbox.checked = false;
        })
    }
    lastChecked = this;
}
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));