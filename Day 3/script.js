const img = document.querySelector("img");
document.getElementById("size").max = img.clientWidth;
document.getElementById("size").value = img.clientWidth;

console.log(getComputedStyle(document.getElementById("size")).maxWidth);

const inputs = document.querySelectorAll(".controls input");
inputs.forEach((input) => {
  input.addEventListener("input", handleUpdate);
});

function handleUpdate() {
  const suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${this.name}`, this.value + suffix
  );
}

