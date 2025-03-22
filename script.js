const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            running = false;
            statusText.textContent = `${currentPlayer} Wins!`;
            return;
        }
    }

    if (!board.includes("")) {
        running = false;
        statusText.textContent = "It's a Draw!";
    }
}

function handleClick() {
    const index = this.dataset.index;
    
    if (board[index] !== "" || !running) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;
    
    checkWinner();

    currentPlayer = (currentPlayer === "X") ? "O" : "X";
}

function resetGame() {
    board.fill("");
    cells.forEach(cell => cell.textContent = "");
    running = true;
    currentPlayer = "X";
    statusText.textContent = "";
}

document.getElementById("start").addEventListener("click", function() {
    document.getElementById("home").style.display = "none"; 
    document.getElementById("game").style.display = "block"; 
});

document.getElementById("game-exit").addEventListener("click", function() {
    document.getElementById("game").style.display = "none"; 
    document.getElementById("home").style.display = "flex"; 
});

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);

