let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

let buttons = ["bA", "bB", "bC", "bD"];
let gameSeq = [];
let userSeq = [];

let start = false;
let highscore = 0;
let level = 0;

document.addEventListener("keypress", () => {
    if (start == false) {
        h1.innerHTML = "<span>Simon</span> Says";
        console.log("Let's start the game!");
        start = true;
        levelUp();
    }
})

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let ranInd = Math.floor(Math.random() * 4);
    let ranCol = buttons[ranInd];
    let ranBtn = document.querySelector(`.${ranCol}`);

    gameSeq.push(ranCol);
    btnFlash(ranBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length)
            setTimeout(levelUp, 500);
    }
    else {
        h1.innerHTML = "Game Over!";
        h3.innerHTML = `Your score was <b>${level - 1}</b> <br>Press any key to start over.`;
        let body = document.querySelector("body");
        body.classList.add("gameOver");
        setTimeout(() => {
            body.classList.remove("gameOver");
        }, 250)
        reset();
    }
}

function btnPess() {
    if (start) {
        let btn = this;
        userFlash(btn);
        userColor = btn.getAttribute("id");
        userSeq.push(userColor);

        checkAns(userSeq.length - 1);
    }
}

let btns = document.querySelectorAll(".btn");
for (btn of btns) {
    btn.addEventListener("click", btnPess);
}

function reset() {
    start = false;
    userSeq = [];
    gameSeq = [];
    if (level - 1 > highscore){
        highscore = level - 1;
        document.getElementById("current-highscore").innerText = highscore;
    }
    level = 0;
}
