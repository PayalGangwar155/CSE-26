const text = document.getElementById("text");
const count = document.getElementById("count");

text.addEventListener("input", function () {
    count.textContent = text.value.length;
});