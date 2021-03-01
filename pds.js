// Mapping
playPane = document.getElementById("play-pane");
playerPaneTop = document.getElementById("player-pane-top");
playerPaneBottom = document.getElementById("player-pane-bottom");
vsControlPaneTop = document.getElementById("vs-control-pane-top");
vsControlPaneBottom = document.getElementById("vs-control-pane-bottom");
vsControlPaneTopContent = document.getElementById("vs-control-pane-top-content");
vsControlPaneBottomContent = document.getElementById("vs-control-pane-bottom-content");
vsWords = document.getElementById("vs-words");
intimatePane = document.getElementById("intimate-pane");
turnCount = document.getElementById("turn-count");
cpWinCount = document.getElementById("cp-win-count");
plWinCount = document.getElementById("pl-win-count");
cpWin = document.getElementById("cp-win");
plWin = document.getElementById("pl-win");
scissorsChoice = document.getElementById("scissors-choice");
paperChoice = document.getElementById("paper-choice");
rockChoice = document.getElementById("rock-choice");
fogPane = document.getElementById("fog-pane");
rewPane = document.getElementById("rew-pane");
rewColorControl = document.getElementById("rew-color-control");
rewSizeControl = document.getElementById("rew-size-control");
rewBackControl = document.getElementById("rew-back-control");
rewFixedControl = document.getElementById("rew-fixed-control");
rewUnfixedControl = document.getElementById("rew-unfixed-control");
rewRequest = document.getElementById("rew-request");
rewContent = document.getElementById("rew-content");
rewContainer = document.getElementById("rew-container");
rew = document.getElementById("rew");

// Interface

let rewPaneOpen = false;
let rewPaneFixed = false;

function vsEff() {
    playerPaneTop.classList.toggle("player-pane-hidden");
    playerPaneBottom.classList.toggle("player-pane-hidden");
    vsControlPaneTop.classList.toggle("vcpt-active");
    vsControlPaneBottom.classList.toggle("vcpb-active");
    intimatePane.classList.toggle("intimate-pane-hidden-right");
}

function openRewPane() {
    rewPaneOpen = true;
    rewPane.style.left = "0px";
    if (!rewPaneFixed) {
        rewPane.classList.add("shadow-right");
        fogPane.classList.add("fog-pane-visible");
    } else {
        playPane.style.left = rewSizeControl.value + "%";
    }
}

function closeRewPane() {
    rewPaneOpen = false;
    rewPane.style.left = (-rewSizeControl.value) + "%";
    if (!rewPaneFixed) {
        rewPane.classList.remove("shadow-right");
        fogPane.classList.remove("fog-pane-visible");
    } else {
        playPane.style.left = "0px";
    }
}

function fixedRewPane() {
    rewPaneFixed = true;
    playPane.style.left = rewSizeControl.value + "%";
    fogPane.classList.remove("fog-pane-visible");
    rewPane.classList.remove("shadow-right");
    rewFixedControl.classList.add("hidden");
    rewUnfixedControl.classList.remove("hidden");
    // rewRequest.classList.add("hidden");
    // rewBackControl.classList.add("hidden");
}

function unfixedRewPane() {
    rewPaneFixed = false;
    playPane.style.left = "0px";
    fogPane.classList.add("fog-pane-visible");
    rewPane.classList.add("shadow-right");
    rewFixedControl.classList.remove("hidden");
    rewUnfixedControl.classList.add("hidden");
    // rewRequest.classList.remove("hidden");
    // rewBackControl.classList.remove("hidden");
}

rewColorControl.addEventListener("input", () => {
    rewPane.style.backgroundColor = rewColorControl.value;
});

rewColorControl.addEventListener("change", () => {
    rewPane.style.backgroundColor = rewColorControl.value;
});

rewSizeControl.addEventListener("change", () => {
    if (rewSizeControl.value < 20) {
        rewSizeControl.value = 20;
    } else if (rewSizeControl.value > 100) {
        rewSizeControl.value = 100;
    }

    if (rewPaneFixed) {
        playPane.style.left = rewSizeControl.value + "%";
    }

    rewPane.style.width = rewSizeControl.value + "%";
});

rewRequest.addEventListener("click", () => {
    if (rewPaneOpen) {
        closeRewPane();
    } else {
        openRewPane();
    }
});

rewBackControl.addEventListener("click", closeRewPane);

fogPane.addEventListener("click", closeRewPane);

rewFixedControl.addEventListener("click", fixedRewPane);

rewUnfixedControl.addEventListener("click", unfixedRewPane);

// CTRIF

CTRIF = {
    rew: {
        cdWin: 10,
        fogBoxCount: 20
    },

    vs: {
        cpWin: 0,
        plWin: 0,
        turnCount: 0,
        cpWinCount: 0,
        plWinCount: 0,
        cpChoice: 0,
        plChoice: 0
    }
}

setCpChoice = (choice) => { CTRIF.vs.cpChoice = choice; receiveChoices(); }
setPlChoice = (choice) => { CTRIF.vs.plChoice = choice; receiveChoices(); }

// Backstage

function setRewSize() {
    console.log("yes");
    if (rewContent.offsetWidth/rewContent.offsetHeight < rew.naturalWidth/rew.naturalHeight) {
        rewContainer.style.width = rewContent.offsetWidth + "px";
        rewContainer.style.height = rewContent.offsetWidth*(rew.naturalHeight/rew.naturalWidth) + "px";
        rewContainer.style.top = (rewContent.offsetHeight - rewContent.offsetWidth*(rew.naturalHeight/rew.naturalWidth))/2 + "px";
        rewContainer.style.bottom = (rewContent.offsetHeight - rewContent.offsetWidth*(rew.naturalHeight/rew.naturalWidth))/2 + "px";
        rewContainer.style.left = "0";
        rewContainer.style.right = "0";
    } else if (rewContent.offsetWidth/rewContent.offsetHeight > rew.naturalWidth/rew.naturalHeight) {
        rewContainer.style.height = rewContent.offsetHeight + "px";
        rewContainer.style.width = rewContent.offsetHeight*(rew.naturalWidth/rew.naturalHeight) + "px";
        rewContainer.style.left = (rewContent.offsetWidth - rewContent.offsetHeight*(rew.naturalWidth/rew.naturalHeight))/2 + "px";
        rewContainer.style.right = (rewContent.offsetWidth - rewContent.offsetHeight*(rew.naturalWidth/rew.naturalHeight))/2 + "px";
        rewContainer.style.top = "0";
        rewContainer.style.bottom = "0";
    } else {
        rewContainer.style.width = rewContent.offsetWidth;
        rewContainer.style.height = rewContent.offsetHeight;
    }
}

window.addEventListener("resize", () => {
    setRewSize();
});

setRewSize();

const resizeOb = new ResizeObserver(entries => {
    setRewSize();
});

resizeOb.observe(rewContent);

function showFogBox(fogId) {
    if (fogId === 0 || fogId > CTRIF.rew.fogBoxCount) {
        return;
    }

    let fogBox = document.getElementById("fog-" + fogId);
    fogBox.classList.remove("fog-box-hidden");
}

function hiddenFogBox(fogId) {
    if (fogId === 0 || fogId > CTRIF.rew.fogBoxCount) {
        return;
    }

    let fogBox = document.getElementById("fog-" + fogId);
    fogBox.classList.add("fog-box-hidden");
}

async function vs() {
    vsEff();
    await new Promise(resolve => setTimeout(resolve, 1000));
    cpWin.textContent = CTRIF.vs.cpWin + "";
    plWin.textContent = CTRIF.vs.plWin + "";
    cpWinCount.textContent = CTRIF.vs.cpWinCount + "";
    plWinCount.textContent = CTRIF.vs.plWinCount + "";
    turnCount.textContent = CTRIF.vs.turnCount + "";
    vsEff();
}

function winVs() {
    CTRIF.vs.cpWin --;
    CTRIF.vs.plWin ++;
    CTRIF.vs.plWinCount ++;
    hiddenFogBox(CTRIF.vs.plWin);
    hiddenFogBox(CTRIF.vs.plWin + 10);

    if (CTRIF.vs.plWin === CTRIF.rew.cdWin) {
        rewSizeControl.value = 100;
        rewPane.style.width = rewSizeControl.value + "%";
        openRewPane();
        fixedRewPane();
    }

    if (CTRIF.vs.cpWin < 0) {
        CTRIF.vs.cpWin = 0;
    }
}

function loseVs() {
    showFogBox(CTRIF.vs.plWin);
    showFogBox(CTRIF.vs.plWin + 10);
    CTRIF.vs.cpWin ++;
    CTRIF.vs.plWin --;
    CTRIF.vs.cpWinCount ++;

    if (CTRIF.vs.plWin < 0) {
        CTRIF.vs.plWin = 0;
    }
}

function receiveChoices() {
    if (CTRIF.vs.cpChoice !== 0 && CTRIF.vs.plChoice !== 0) {
        winOrLose();
    }
}

function winOrLose() {
    CTRIF.vs.turnCount ++;
    if (CTRIF.vs.cpChoice === 1) {
        if (CTRIF.vs.plChoice === 1) {
            vsWords.textContent = "RAW";
            vsControlPaneTopContent.src = "src/scissors.png";
            vsControlPaneBottomContent.src = "src/_scissors.png";
            vs();
        } else if (CTRIF.vs.plChoice === 2) {
            vsWords.textContent = "YOU LOSE";
            vsControlPaneTopContent.src = "src/scissors.png";
            vsControlPaneBottomContent.src = "src/_paper.png";
            loseVs();
            vs();
        } else {
            vsWords.textContent = "YOU WIN";
            vsControlPaneTopContent.src = "src/scissors.png";
            vsControlPaneBottomContent.src = "src/_rock.png";
            winVs();
            vs();
        }
    } else if (CTRIF.vs.cpChoice === 2) {
        if (CTRIF.vs.plChoice === 1) {
            vsWords.textContent = "YOU WIN";
            vsControlPaneTopContent.src = "src/paper.png";
            vsControlPaneBottomContent.src = "src/_scissors.png";
            winVs();
            vs();
        } else if (CTRIF.vs.plChoice === 2) {
            vsWords.textContent = "RAW";
            vsControlPaneTopContent.src = "src/paper.png";
            vsControlPaneBottomContent.src = "src/_paper.png";
            vs();
        } else {
            vsWords.textContent = "YOU LOSE";
            vsControlPaneTopContent.src = "src/paper.png";
            vsControlPaneBottomContent.src = "src/_rock.png";
            loseVs();
            vs();
        }   
    } else {
        if (CTRIF.vs.plChoice === 1) {
            vsWords.textContent = "YOU LOSE";
            vsControlPaneTopContent.src = "src/rock.png";
            vsControlPaneBottomContent.src = "src/_scissors.png";
            loseVs();
            vs();
        } else if (CTRIF.vs.plChoice === 2) {
            vsWords.textContent = "YOU WIN";
            vsControlPaneTopContent.src = "src/rock.png";
            vsControlPaneBottomContent.src = "src/_paper.png";
            winVs();
            vs();
        } else {
            vsWords.textContent = "RAW";
            vsControlPaneTopContent.src = "src/rock.png";
            vsControlPaneBottomContent.src = "src/_rock.png";
            vs();
        }
    }

    CTRIF.vs.cpChoice = 0;
    CTRIF.vs.plChoice = 0;
}

scissorsChoice.addEventListener("click", () => {
    // setCpChoice(Math.floor(Math.random()*3 + 1));
    setCpChoice(2);
    setPlChoice(1);
});

paperChoice.addEventListener("click", () => {
    setCpChoice(Math.floor(Math.random()*3) + 1);
    setPlChoice(2);
});

rockChoice.addEventListener("click", () => {
    setCpChoice(Math.floor(Math.random()*3) + 1);
    setPlChoice(3);
});