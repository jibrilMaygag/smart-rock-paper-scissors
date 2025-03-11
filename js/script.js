`strict mode`;
const section2 = document.querySelector('.section_2');
const section1 = document.querySelector('.section_1');
const stats = document.querySelector('.stats');
const playerScore = document.querySelector('.playerScore');
const computerScore = document.querySelector('.computerScore');
const reset = document.querySelector('.reset');
const drawScore = document.querySelector('.draw');
let lose = 0,
  win = 0,
  draw = 0;
let lastResult = '',
  lastComMove = '';
const Random = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};
const renderUserChoice = function (type) {
  const button = document.createElement('div');
  button.style.width = '150px';
  button.style.height = '130px';
  button.style.backgroundImage = `url('../img/${type}.png')`;
  button.style.backgroundSize = 'cover';
  button.style.cursor = 'pointer';
  button.style.clipPath = 'circle(40%)';
  section1.appendChild(button);
};
const changeMove = function (type) {
  if (type == 1) return 'rock';
  if (type == 2) return 'paper';
  if (type == 3) return 'scissors';
};
const renderComChoice = function (type) {
  const button = document.createElement('div');
  button.style.width = '150px';
  button.style.height = '130px';
  button.style.backgroundImage = `url('../img/${type}.png')`;
  button.style.transform = 'rotateZ(180deg)';
  button.style.transform = 'rotatey(180deg)';
  button.style.backgroundSize = 'cover';
  button.style.cursor = 'pointer';
  button.style.clipPath = 'circle(40%)';
  section1.appendChild(button);
};
const computerMove = function (move, lastResult) {
  if (lastResult === 'lose') {
    if (move === 'rock') return 2;
    if (move === 'paper') return 3;
    return 1;
  } else if (lastResult === 'win') {
    if (move === 'rock') return 3;
    if (move === 'paper') return 1;
    return 2;
  }
  return Random(1, 3);
};
const playerStat = function (player, computer) {
  const results = {
    rock: { rock: 'draw', paper: 'lose', scissors: 'win' },
    paper: { rock: 'win', paper: 'draw', scissors: 'lose' },
    scissors: { rock: 'lose', paper: 'win', scissors: 'draw' },
  };

  return results[player][computer];
};
const select = function (e) {
  section1.innerHTML = '';
  const choice = e.target;
  const player = choice.getAttribute('data-type');

  if (!player) return;
  renderUserChoice(player);

  const cMove = changeMove(computerMove(lastComMove, lastResult));
  renderComChoice(cMove);
  const stat = playerStat(player, cMove);

  //update stats
  if (stat === 'draw') {
    stats.textContent = 'DRAW';
    draw++;
    drawScore.textContent = draw;
  } else if (stat === 'win') {
    stats.textContent = 'You Won';
    win++;
    playerScore.textContent = win;
  } else if (stat === 'lose') {
    stats.textContent = 'You Lost';
    lose++;
    computerScore.textContent = lose;
  }
  lastResult = stat;
  lastComMove = cMove;
};
const resetFun = function () {
  section1.innerHTML = '';
  win = 0;
  lose = 0;
  draw = 0;
  drawScore.textContent = '0';
  playerScore.textContent = '0';
  computerScore.textContent = '0';
  stats.textContent = 'choose one to start';
  lastResult = '';
  lastComMove = '';
};
section2.addEventListener('click', select);
reset.addEventListener('click', resetFun);
