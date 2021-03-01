mdTitle = document.getElementById("md-title");
miPane = document.getElementById("mi-pane");
peScissors = document.getElementById("pe-scissors");
pePaper = document.getElementById("pe-paper");
peRock = document.getElementById("pe-rock");
cpScissors = document.getElementById("cp-scissors");
cpPaper = document.getElementById("cp-paper");
cpRock = document.getElementById("cp-rock");
vsPane = document.getElementById("vs-pane");
vsPeControl = document.getElementById("vs-pe-control");
vsCpControl = document.getElementById("vs-cp-control");
vsTitle = document.getElementById("vs-title");
cpTitle = document.getElementById("cp-title");
fiPane = document.getElementById("fi-pane");
rewBtt = document.getElementById("rew-btt");
rewPane = document.getElementById("rew-pane");
rew = document.getElementById("rew");
peTwTitle = document.getElementById("pe-tw-title");
cpTwTitle = document.getElementById("cp-tw-title");

cpScore = 0;
peScore = 0;
turnCount = 0;
mdTitle.textContent = cpScore + " VS " + peScore;

peToWin = 0;
cpToWin = 0;
rewOp = 0;

// rew.style.opacity = "" + rewOp;

cpMem = {
    "appTime": {
        tkCur: 0,
        tkPre: 0,
        gsRec: 0,
        vsCur: 0,
        vsPre: 0,
    },

    "sta": {
        "wtl": false, // Wait too long
        "wit": false, // Waiting
        "tlk": false, // Talking
        "tlkFre": 10, // Talk frequency
    },

    "geses": 
    {
        "c": "str", // "vsw | vsl | vsr | eCtrl | ecpRegi | ccpRegi | eScore | cScore",
        "t": 0,
        "cPre": "",
        "tPre": ""
    },

    "strWrdsE": [
        "Bắt đầu thôi nào!",
        "Sẵn sàn chưa đấy!"
    ],

    "witWrdsE": [
        "Hừmm",
        "Hừmm Hừmm",
        "Nhanh lên nào!"
    ],

    "witWrdsF": [
        "Quá lâu rồi đấy!",
        "Ta giận đấy! Nhanh coi!",
        "Đừng mà để ta đợi!",
    ],

    "witWrdsG": [
        "Đủ rồi nhaaaaa! Lâu quá đi!",
        "Không chơi nữa đấy!",
        "Không chờ người nữa!",
    ],

    "wtlWrdsE": [
        "Chậm chạp quá đi! Gừhhhh!"
    ],

    "vswWrdsE": [
        "Hừm! Đáng ghét!",
        "Ngươi ... ngươi! Ta sẽ phục thù!",
        "Hứ!!!",
    ],

    "vslWrdsE": [
        "Haha",
        "Tệ quá đi! Hihi!",
        "Ngươi còn non lắm!"
    ],

    "vsrWrdsE": [
        "Ngươi may mắn",
        "Đừng mong chờ sẽ thắng được ta",
        "Ngươi cũng không tệ"
    ],

    "eCtrlWrdsE": [
        "Suy nghĩ nhanh lên coi!",
        "Ta sẽ không để người đắc ý!",
        "Chuẩn bị thua đi!"
    ]
}

cpMem.appTime.tkCur = new Date().getTime();
cpMem.appTime.tkPre = new Date().getTime();
cpMem.appTime.gsRec = new Date().getTime();

var exprT;
var tkT;
var vsT;

function stopExpr() {
    clearTimeout(exprT);
    cpMem.appTime.tkPre = cpMem.appTime.tkCur;
    cpMem.sta.wit = true;
    cpMem.sta.tlk = false;
}

function stopTk() {
    clearTimeout(tkT);
}

function startTk() {
    cpMem.sta.wit = false;
    cpThinking();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function ges(c) {
    if (cpMem.sta.tlk && !cpMem.sta.exc) {
        return;
    }

    cpMem.geses.cPre = cpMem.geses.c;
    cpMem.geses.tPre = cpMem.geses.t;

    cpMem.appTime.gsRec = new Date().getTime();
    cpMem.geses.c = c;
    cpMem.geses.t = new Date().getTime();
    cpMem.sta.wit = false;
}

async function expr(c, lv) {
    cpMem.sta.tlk = true;
    cpTitle.textContent = "";
    wsArr = cpMem[c + "Wrds" + lv][Math.floor(Math.random() * (cpMem[c + "Wrds" + lv].length))].split(" ");
    while (wsArr.length > 0) {
        cpTitle.textContent += wsArr.shift() + " ";
        await new Promise(resolve => exprT = setTimeout(resolve, 100));
    }

    await new Promise(resolve => exprT = setTimeout(resolve, 1000));
    cpTitle.textContent = "";
    cpMem.appTime.tkPre = cpMem.appTime.tkCur;
    cpMem.sta.wit = true;
    cpMem.sta.tlk = false;
}

function cpThinking() {
    var d = new Date();
    cpMem.appTime.tkCur = d.getTime();

    if (cpMem.appTime.tkCur - cpMem.appTime.tkPre > cpMem.sta.tlkFre*1000) {
        cpMem.sta.wit = false;
    }

    if (cpMem.sta.tlk) {
        // Talking
    } else if (cpMem.sta.wit) {
        // Waiting
    } else if (cpMem.appTime.tkCur - cpMem.appTime.gsRec > 60000) {
        expr("wit", "F");
        cpMem.sta.tlkFre = 3;
    } else if (cpMem.appTime.tkCur - cpMem.appTime.gsRec > 15000) {
        expr("wit", "E");
        cpMem.sta.tlkFre = 5;
        cpMem.sta.wtl = true;
    } else {
        if (cpMem.sta.wtl) {
            expr("wtl", "E");
            cpMem.sta.tlkFre = 10;
            cpMem.sta.wtl = false;
        } else if (cpMem.geses.c === "vsw") {
            expr("vsw", "E");
        } else if (cpMem.geses.c == "vsl") {
            expr("vsl", "E");
        } else if (cpMem.geses.c == "vsr") {
            expr("vsr", "E");
        } else if (cpMem.geses.c == "eCtrl") {
            if (cpMem.appTime.tkCur - cpMem.appTime.gsRec > 500) {
                expr("eCtrl", "E");
            }
        } else if (cpMem.geses.c == "str") {
            expr("str", "E");
        }
    }

    if (cpMem.appTime.tkCur - cpMem.appTime.gsRec < 120000) {
        tkT = setTimeout(cpThinking, 1000);
    } else {
        expr("wit", "G");
    }
}

function eCtrl() {
    ges("eCtrl");
}

peScissors.addEventListener("mouseover", eCtrl);
pePaper.addEventListener("mouseover", eCtrl);
peRock.addEventListener("mouseover", eCtrl);

cpThinking();

function rewResize() {
    if (rew.offsetHeight > rewPane.offsetHeight) {
        rew.style.width = "auto";
        rew.style.height = "100%";
        rew.style.top = "auto";
        rew.style.marginTop = "auto";
    } else {
        rew.style.width = "100%";
        rew.style.height = "auto";
        rew.style.top = "50%";
        rew.style.marginTop = "-" + (rew.offsetHeight/2) + "px";
    }
}

function cpControlSrc(r) {
    if (r === 0) {
        return "src/scissors.png";
    } else if (r === 1) {
        return "src/paper.png";
    } else {
        return "src/rock.png";
    }
}

function winOrLose(pe, cp) {
    turnCount ++;
    if (pe === 0) {
        if (cp === 0) {
            return 0;
        } else if (cp === 1) {
            return 1;
        } else {
            return -1;
        }
    } else if (pe === 1) {
        if (cp === 0) {
            return -1;
        } else if (cp === 1) {
            return 0;
        } else {
            return 1;
        }
    } else {
        if (cp === 0) {
            return 1;
        } else if (cp === 1) {
            return -1;
        } else {
            return 0;
        }
    }
}

function rewOpWOL(b) {
    if (b) {
        if (rewOp >= 1) {
            return;
        }

        rewOp += 0.1;
    } else {
        if (rewOp <= 0) {
            return;
        }

        rewOp -= 0.1;
        
    }

    rew.style.filter = "brightness(" + ((1 - rewOp)*10) + ")";
    // rew.style.opacity = "" + rewOp;
}

async function winOrLoseItr(wOL) {
    cpMem.appTime.vsPre = cpMem.appTime.vsCur;
    cpMem.appTime.vsCur = new Date().getTime();
    stopTk();
    stopExpr();
    if (wOL === 0) {
        vsTitle.textContent = "DRAW";
        ges("vsr");
    } else if (wOL === 1) {
        peScore ++;
        vsTitle.textContent = "YOU WIN";
        ges("vsw");
        rewOpWOL(true);

        if (peToWin >= 9) {
            rew.style.filter = "blur(0px)"
            rewPane.style.display = "block";
            rewPane.style.right = "0px";
            peTwTitle.style.display = "none";
            cpTwTitle.style.display = "none";
            rewBtt.style.display = "none";
            fiPane.style.display = "none";
            rewResize();
        }

        peToWin ++;
        peTwTitle.textContent = "" + peToWin;

        if (cpToWin > 0) {
            cpToWin --;
            cpTwTitle.textContent = "" + cpToWin;
        }
    } else {
        cpScore ++;
        vsTitle.textContent = "YOU LOSE";
        ge = ges("vsl");
        rewOpWOL(false);

        if (peToWin > 0) {
            peToWin --;
            peTwTitle.textContent = "" + peToWin;
        }

        if (cpToWin >= 9) {
            rewPane.style.display = "block";
            rewPane.style.right = "0px";
            rew.style.display = "none";
            peTwTitle.style.display = "none";
            cpTwTitle.style.display = "none";
            rewBtt.style.display = "none";
            fiPane.style.display = "none";
            rewResize();
        }

        cpToWin ++;
        cpTwTitle.textContent = "" + cpToWin;
    }
    await new Promise(resolve => vsT = setTimeout(resolve, 1500));
    startTk();
    mdTitle.textContent = mdTitle.textContent = cpScore + " : " + turnCount + " : " + peScore;
    miPane.style.display = "block";
    vsPane.style.display = "none";
    vsTitle.textContent = "VS";
}

peScissors.addEventListener("click", function() {
    miPane.style.display = "none";
    r = Math.floor(Math.random() * 3);
    vsPane.style.display = "block";
    vsPeControl.src = "src/_scissors.png";
    vsCpControl.src = cpControlSrc(r);
    winOrLoseItr(winOrLose(0, r));
});

pePaper.addEventListener("click", function() {
    miPane.style.display = "none";
    r = Math.floor(Math.random() * 3);
    vsPane.style.display = "block";
    vsPeControl.src = "src/_paper.png";
    vsCpControl.src = cpControlSrc(r);
    winOrLoseItr(winOrLose(1, r));
});

peRock.addEventListener("click", function() {
    miPane.style.display = "none";
    r = Math.floor(Math.random() * 3);
    vsPane.style.display = "block";
    vsPeControl.src = "src/_rock.png";
    vsCpControl.src = cpControlSrc(r);
    winOrLoseItr(winOrLose(3, r));
});

function rewPaneOpen() {
    fiPane.style.left = "50%";
    rewPane.style.display = "block";
    rewResize();
}

function rewPaneClose() {
    fiPane.style.left = "0px";
    rewPane.style.display = "none";
}

rewBtt.addEventListener("click", function() {
    if (rewPane.style.display === "block") {
        rewPaneClose();
    } else {
        rewPaneOpen();
    }
});

window.onresize = function() {
    rewResize();
}
