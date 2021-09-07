const buttonOn = document.querySelector("button[data-start]");
const buttonOff = document.querySelector("button[data-stop]")
const body = document.querySelector("body");
let timerId = null;


buttonOn.addEventListener("click", onClick);

buttonOff.disabled = true;

buttonOff.addEventListener("click", offClick);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClick(event) {
    event.target.disabled = true;
    buttonOff.disabled = false;
    timerId = setInterval(() => {
        const color = getRandomHexColor();
        body.style.backgroundColor = color;
        return color;
      }, 1000)
}

function offClick(event) {
    event.target.disabled = true;
    buttonOn.disabled = false;
    return clearInterval(timerId);
}