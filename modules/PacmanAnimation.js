// 1. ЗАДАЕМ ЗОНУ АНИМАЦИИ
const movingZone = document.getElementById('askBarGrid');
const pacman = document.querySelector('.runningPacman');

const startPozX = movingZone.offsetLeft;
const startPozY = movingZone.offsetTop;
let padding = 25;

const mz_Width = parseFloat(window.getComputedStyle(movingZone)['width']);
const mz_Height = parseFloat(window.getComputedStyle(movingZone)['height']);

// 2. НАСТРАИВАЕМ АНИМАЦИЮ
let currentX = startPozX + mz_Width / 2;
let currentY = startPozY + mz_Height / 2;

pacman.style.left = `${currentX}px`;
pacman.style.top = `${currentY}px`;

function movePacman() {
    // 1. Генерируем случайную целевую точку
    const nextX = getRandomInt(startPozX + padding, startPozX + mz_Width - padding);
    const nextY = getRandomInt(startPozY + padding, startPozY + mz_Height - padding);

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

// 3. ЗАПУСК
movePacman();