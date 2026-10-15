// ==========================================
// 1. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==========================================
function shutDown() {
    running = false;
    if (visibilityChecker) visibilityChecker.disconnect();
    if (oresNumberChecker) oresNumberChecker.disconnect();
    console.log("Добыча остановлена.");
}

function firstHit() {
    if (!hitButton) return;
    hitButton.click();
    let hitsLeft = Number(hitsLeftElement?.innerText || 0);
    let hitsMade = totalHits - hitsLeft;
    console.log(`Ударов сделано: ${hitsMade + 1} из ${totalHits}`);
}

// ==========================================
// 2. РЕЖИМЫ ДОБЫЧИ
// ==========================================

// --- Вариант 1: Добыча до целевого количества руды ---
function startMiningWithOresNumber() {
    if (!hitButton || !oresNumberElement) return;

    oresNumberChecker = new MutationObserver(() => {
        if (!running) return;

        let currentOres = Number(oresNumberElement.innerText.replace(/\s+/g, ''));
        let oresLeft = hitToNumberDeclared - currentOres;

        console.log(`Текущая руда: ${currentOres} | Осталось выкопать: ${oresLeft}`);

        if (currentOres < hitToNumberDeclared) {
            let hitButtonVisible = hitButton.style.display;
            let hitsLeft = Number(hitsLeftElement?.innerText || 0);

            if (hitButtonVisible !== "none" && hitsLeft > 0) {
                hitButton.click();
            } else if (hitsLeft === 0) {
                console.log("Закончились доступные удары.");
                shutDown();
            }
        } else {
            oresNumberChecker.disconnect();
            console.log("Целевой показатель руды достигнут!");

            const continueMining = confirm("Цель по руде достигнута! Продолжить добычу до конца?");
            if (continueMining) {
                startMiningWithoutOresNumber();
            } else {
                alert("Добыча руды завершена!");
                shutDown();
            }
        }
    });

    oresNumberChecker.observe(hitButton, { attributes: true, attributeFilter: ['style'] });
    hitButton.click();
}

// --- Вариант 2: Добыча до исчерпания ударов (без лимита руды) ---
function startMiningWithoutOresNumber() {
    if (!hitButton) return;

    visibilityChecker = new MutationObserver(() => {
        if (!running) return;

        let hitButtonVisible = hitButton.style.display;
        let hitsLeft = Number(hitsLeftElement?.innerText || 0);
        let hitsMade = totalHits - hitsLeft;

        if (hitButtonVisible !== "none" && hitsLeft > 0) {
            hitButton.click();
            console.log(`Ударов сделано: ${hitsMade + 1} из ${totalHits}`);
        } else if (hitsLeft === 0) {
            console.log("Все удары израсходованы!");
            shutDown();
        }
    });

    visibilityChecker.observe(hitButton, { attributes: true, attributeFilter: ['style'] });
    firstHit();
}