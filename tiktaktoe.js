// Define the game board size
const BOARD_SIZE = 7;

// Get references to the game board and score elements
const gameBoard = document.getElementById('game-board');
const playerXScore = document.getElementById('player-x-score');
const playerOScore = document.getElementById('player-o-score');

// Keep track of the current player and the game state
let currentPlayer = 'X';
let gameState = Array(BOARD_SIZE * BOARD_SIZE).fill(null);
let playerXScore = 0;
let playerOScore = 0;

// Function to create the game board
function createGameBoard() {
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const cell = document.createElement('div');
    cell.classList.add('game-cell');
    cell.dataset.cellIndex = i;
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
  }
}

// Function to handle cell click
function handleCellClick(event) {
  const cellIndex = event.target.dataset.cellIndex;
  if (gameState[cellIndex] === null) {
    gameState[cellIndex] = currentPlayer === 'X' ? '"("")"' : '"("")"';
    updateGameBoardDisplay();
    if (checkForWin()) {
      updateScore(currentPlayer);
      alert(`Player ${currentPlayer} wins!`);
      resetGame();
    } else if (isTie()) {
      alert("It's a tie!");
      resetGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Function to update game board display
function updateGameBoardDisplay() {
  const cells = gameBoard.children;
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = gameState[i] || '';
  }
}

// Function to check for win
function checkForWin() {
  // Check rows
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i += BOARD_SIZE) {
    if (gameState.slice(i, i + BOARD_SIZE).every(mark => mark === (currentPlayer === 'X' ? '"("")"' : '"("")"'))) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (gameState.filter((_, index) => index % BOARD_SIZE === i).every(mark => mark === (currentPlayer === 'X' ? '"("")"' : '"("")"'))) {
      return true;
    }
  }

  // Check diagonals
  if (gameState.filter((_, index) => index % (BOARD_SIZE + 1) === 0).every(mark => mark === (currentPlayer === 'X' ? '"("")"' : '"("")"'))) {
    return true;
  }
  if (gameState.filter((_, index) => index % (BOARD_SIZE - 1) === 0 && index > 0 && index < BOARD_SIZE * BOARD_SIZE - 1).every(mark => mark === (currentPlayer === 'X' ? '"("")"' : '"("")"'))) {
    return true;
  }

  return false;
}

// Function to check if the game is a tie
function isTie() {
  return gameState.every(mark => mark !== null);
}

// Function to update the score
function updateScore(player) {
  if (player === 'X') {
    playerXScore++;
    playerXScore.textContent = `Player X: ${playerXScore}`;
  } else {
    playerOScore++;
    playerOScore.textContent = `Player O: ${playerOScore}`;
  }
}

// Function to reset the game
function resetGame() {
  gameState = Array(BOARD_SIZE * BOARD_SIZE).fill(null);
  currentPlayer = 'X';
  gameBoard.innerHTML = '';
  createGameBoard();
}

// Initialize the game board
createGameBoard();