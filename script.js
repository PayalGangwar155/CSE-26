const button = document.getElementById("generate");
const number = document.getElementById("number");

button.addEventListener("click", function () {
    let random = Math.floor(Math.random() * 10) + 1;
    number.textContent = random;
});