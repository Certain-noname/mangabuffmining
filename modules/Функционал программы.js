// ==========================================
// 1. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==========================================
function shutDown() {
    running = false;
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

    let hitButtonVisible = hitButton.style.display;
    let hitsLeft = Number(hitsLeftElement.innerText);
    let currentOres = Number(oresNumberElement.innerText.replace(/\s+/g, ''));
    let oresLeft = hitToNumberDeclared - currentOres;

    

    if (hitButtonVisible !== "none" && oresLeft > 0 && running) {
        oresNumberCheckerON ();
        hitButton.click();
        console.log(`Надо добыть ещё руды: ${oresLeft}`);
    } else if (oresLeft <= 0) {
            console.log("Целевой показатель руды достигнут!");
            hitToNumberDeclared = null
            oresNumberCheckerOFF ();
            resumeMiningButton.style.display = "flex"
            shutDown();
        }
}

// --- Вариант 2: Добыча до исчерпания ударов (без лимита руды) ---
function startMiningWithoutOresNumber() {

    let hitButtonVisible = hitButton.style.display;
    let hitsLeft = Number(hitsLeftElement.innerText);
    let hitsMade = totalHits - hitsLeft;

    if (hitButtonVisible !== "none" && hitsLeft > 0 && running) {
        visibilityCheckerON ()
        hitButton.click();
        console.log(`Ударов сделано: ${hitsMade + 1} из ${totalHits}`);
    } else if (hitsLeft == 0) {
        console.log("All hits are hit!");
        visibilityCheckerOFF ();
        shutDown();
    };
}

// ==========================================
//3. САМА ПРОГРАММА
// ==========================================

function startProgram () {

    running = true
    if (!!hitToNumberDeclared === true) {
        oresNumberCheckerON ();
        firstHit ();
    } else if (!!hitToNumberDeclared === false) {
        visibilityCheckerON ();
        firstHit ();
    }
    askBar.style.display = 'none'
}

function finishProgram () {
    askBar.style.display = 'none';
    shutDown ();
    visibilityCheckerOFF();
    oresNumberCheckerOFF();
}