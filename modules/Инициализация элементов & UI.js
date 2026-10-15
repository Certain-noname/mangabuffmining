// ==========================================
// 1. ИНИЦИАЛИЗАЦИЯ И ПЕРЕМЕННЫЕ
// ==========================================
const hitButton = document.querySelector(".main-mine__game-tap");
const totalHits = Number(document.querySelector(".main-mine__game-hits-left")?.innerText || 0);
let hitsLeftElement = document.querySelector(".main-mine__game-hits-left");
let oresNumberElement = document.querySelector('.main-mine__header_score-count');

let hitToNumberDeclared = 0;
let running = true;

// Объявляем наблюдатели заранее
let visibilityChecker = null;
let oresNumberChecker = null;

// ==========================================
// 2. СОЗДАНИЕ И НАСТРОЙКА UI (ASKBAR)
// ==========================================
hitButton.style.zIndex = "99"

const askBar = document.createElement('div');
const askBarGrid = document.createElement('div');
const textArea = document.createElement('p');
const buttonBox = document.createElement('div');
const buttonBoxY = document.createElement('button');
const buttonBoxN = document.createElement('button');
const oresNumberInputBox = document.createElement('div');
const oresNumberInput = document.createElement('input');
const startMiningButton = document.createElement('button');

askBar.id = "askBar";
askBarGrid.id = "askBarGrid";
textArea.id = "textArea";
buttonBox.id = "buttonBox";
buttonBoxY.id = "buttonBox-Y";
buttonBoxN.id = "buttonBox-N";
oresNumberInputBox.id = "oresNumberInputBox";
oresNumberInput.id = "oresNumberInput";
startMiningButton.id = "startMiningButton";

textArea.innerText = "Установить целевой показатель руды?";
buttonBoxY.innerText = "Нужно!";
buttonBoxN.innerText = "Не нужно.";
startMiningButton.innerText = "Копать!⛏️";

textArea.style = "line-height: normal;" /*фиксим приколы разметки mangabuff*/

const pacman = document.createElement('svg');
pacman.innerHTML = `
  <path class="runningPacman" d="M9.3,27.4L9.3,27.4c0.7,0.7,1.9,0.7,2.7,0l0,0c0.7-0.7,1.9-0.7,2.7,0l0,0c0.7,0.7,1.9,0.7,2.7,0l0,0 c0.7-0.7,1.9-0.7,2.7,0l0,0c0.7,0.7,1.9,0.7,2.7,0l0,0c0.7-0.7,1.9-0.7,2.7,0l0.7,0.6V13c0-5.5-4.5-10-10-10h0C10.5,3,6,7.5,6,13 v15.1l0.7-0.6C7.4,26.7,8.6,26.7,9.3,27.4z"/>
  <line class="runningPacman" x1="12" y1="12" x2="12" y2="16"/>
  <line class="runningPacman" x1="19" y1="12" x2="19" y2="16"/>
  <line class="runningPacman" x1="12" y1="20" x2="20" y2="20"/>
`;
Object.assign(pacman, {
    class: "runningPacman", 
    viewBox: "0 0 32 32",
}); 

Object.assign(oresNumberInput, {
    placeholder: "Введите целевое значение руды", 
    type: "number", 
    min: "0"
});

askBarGrid.append(textArea, buttonBox, oresNumberInputBox);
buttonBox.append(buttonBoxY, buttonBoxN);
oresNumberInputBox.append(oresNumberInput, startMiningButton);
askBar.append(pacman, askBarGrid);
document.body.prepend(askBar);

// ==========================================
// 4. ОБРАБОТЧИКИ СОБЫТИЙ ИНТЕРФЕЙСА
// ==========================================
buttonBoxY.addEventListener("click", () => {
    buttonBox.style.display = "none";
    oresNumberInputBox.style.display = "flex";
});

buttonBoxN.addEventListener("click", () => {
    askBar.style.display = "none";
    startMiningWithoutOresNumber();
});

startMiningButton.addEventListener("click", () => {
    hitToNumberDeclared = Number(oresNumberInput.value);
    askBar.style.display = "none";

    if (hitToNumberDeclared && hitToNumberDeclared > 0) {
        startMiningWithOresNumber();
    } else {
        startMiningWithoutOresNumber();
    }
});