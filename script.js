const board = document.getElementById("gameBoard");
const timerDisplay = document.getElementById("timer");
const movesDisplay = document.getElementById("moves");

const flipSound = document.getElementById("flipSound");
const matchSound = document.getElementById("matchSound");

let cardsArray = ["🍎","🍌","🍇","🍓","🍎","🍌","🍇","🍓"];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let timer = 0;
let interval;

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function startTimer() {
    interval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

function createBoard() {
    board.innerHTML = "";
    shuffle(cardsArray).forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this.classList.contains("flipped")) return;

    if (timer === 0) startTimer();

    flipSound.play();
    this.textContent = this.dataset.symbol;
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    moves++;
    movesDisplay.textContent = moves;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        matchSound.play();
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetTurn();
    } else {
        setTimeout(() => {
            firstCard.textContent = "";
            secondCard.textContent = "";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    if (document.querySelectorAll(".matched").length === cardsArray.length) {
        clearInterval(interval);
        setTimeout(() => {
            alert(`🎉 You Won!\nTime: ${timer}s\nMoves: ${moves}`);
        }, 300);
    }
}

function restartGame() {
    clearInterval(interval);
    timer = 0;
    moves = 0;
    timerDisplay.textContent = 0;
    movesDisplay.textContent = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    createBoard();
}

createBoard();