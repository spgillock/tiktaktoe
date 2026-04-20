const WINS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diagonals
];

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;
const scores = { X: 0, O: 0, draw: 0 };

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraw = document.getElementById('score-draw');

cells.forEach(cell => cell.addEventListener('click', handleClick));
document.getElementById('restart').addEventListener('click', resetGame);
document.getElementById('reset-scores').addEventListener('click', resetScores);

function handleClick(e) {
  const i = +e.target.dataset.index;
  if (gameOver || board[i]) return;

  board[i] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase(), 'taken');

  const winLine = getWinner();
  if (winLine) {
    winLine.forEach(idx => cells[idx].classList.add('win'));
    status.textContent = `Player ${currentPlayer} wins!`;
    scores[currentPlayer]++;
    updateScoreboard();
    gameOver = true;
  } else if (board.every(Boolean)) {
    status.textContent = "It's a draw!";
    scores.draw++;
    updateScoreboard();
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function getWinner() {
  return WINS.find(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  ) || null;
}

function updateScoreboard() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.draw;
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  status.textContent = `Player X's turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });
}

function resetScores() {
  scores.X = 0;
  scores.O = 0;
  scores.draw = 0;
  updateScoreboard();
  resetGame();
}
