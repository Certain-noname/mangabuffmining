// 1. PACMAN ANIMATION

// 1.1. Задаем зону анимации
const movingZone = document.getElementById('askBarGrid');
const pacman = document.querySelector('.runningPacman');

const startPozX = movingZone.offsetLeft;
const startPozY = movingZone.offsetTop;
let padding = 25;

const mz_Width = parseFloat(window.getComputedStyle(movingZone)['width']);
const mz_Height = parseFloat(window.getComputedStyle(movingZone)['height']);

// 1.2. Настраиваем анимацию
let currentX = startPozX + mz_Width / 2;
let currentY = startPozY + mz_Height / 2;

pacman.style.left = `${currentX}px`;
pacman.style.top = `${currentY}px`;

function movePacman() {
    // 1. Генерируем случайную целевую точку
    const nextX = getRandomNumber(startPozX + padding, startPozX + mz_Width - padding);
    const nextY = getRandomNumber(startPozY + padding, startPozY + mz_Height - padding);

    // 2. Рассчитываем длительность перелёта пропорционально дистанции
    const distance = Math.hypot(nextX - currentX, nextY - currentY);
    const speed = 0.12; // Скорость (чем меньше число, тем медленнее)
    const duration = distance / speed;

    // 3. Анимация перемещения через Web Animations API
    const animation = pacman.animate([
        { left: `${currentX}px`, top: `${currentY}px` },
        { left: `${nextX}px`, top: `${nextY}px` }
    ], {
        duration: duration,
        easing: 'ease-in-out', // Мягкий разгон и притормаживание
        fill: 'forwards'
    });

    // 4. Переход к следующей точке по завершении анимации
    animation.onfinish = () => {
        currentX = nextX;
        currentY = nextY;

        pacman.style.left = `${currentX}px`;
        pacman.style.top = `${currentY}px`;

        movePacman();
    };
}

// 1.3. Запускаем анимацию
movePacman();

// 1. PICKAXE ANIMATION
// 2.1. Задаём элементы кирки
const pickaxeBox = document.getElementsByClassName('pickaxeBox'); //Уже объявлет в модуле иниц. эл.
const pickaxeWhite = document.createElement('img');
const pickaxeBlack = document.createElement('img');

pickaxeWhite.id = "pickaxeWhite"
pickaxeBlack.id = "pickaxeBlack"

// 2.2. Устанавливаем обработчики событий
pickaxeBox.addEventListener('mouseover', pickaxeChangeColor);
pickaxeBox.addEventListener('mouseout', pickaxeBaseColor);

// 2.3. Называем функции анимаций кирки (смены состояний)
function pickaxeChangeColor() {
        pickaxeBox.style.borderRadius = "10px";
        pickaxeBox.style.backgroundColor = "white";
        
        // Переключаем только opacity (БЕЗ display)
        pickaxeWhite.style.opacity = "0";
        pickaxeBlack.style.opacity = "1";
    }
    
function pickaxeBaseColor() {
    pickaxeBox.style.borderRadius = "0px";
    pickaxeBox.style.backgroundColor = "black";
    
    pickaxeWhite.style.opacity = "1";
    pickaxeBlack.style.opacity = "0";
}

