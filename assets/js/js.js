
const btn = document.getElementById("btn");
const container = document.querySelector("body");
const night = document.querySelector(".night-light");





night.addEventListener("click", () => {
    console.log(`wrap====>${night}`);
    container.classList.toggle("active");
})