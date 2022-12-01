'use strict';

//#region [ ELEMENT VARIABLES via SELECTING ]

//scores
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //gets element with id dont use # symbol - faster than querySelector if thousands of element
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//dice image
const diceEl = document.querySelector('.dice');
//buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//players
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//#endregion

//Variables
const finalScores = [0, 0]; //player0 and player1
const maxScore = 30;
let currentScore = 0;
let activePlayer = 0;
let isGameOver = false;

//init function when page load
const intialize = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
};

intialize();

//Rolling the Dice
const onRollDice = function () {
  if (!isGameOver) {
    //1. Generate random dice roll
    const diceValue = Math.floor(Math.random() * 6 + 1);
    console.log(diceValue);
    //2. Show dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceValue}.png`;
    //3. Check if its 1 or not
    if (diceValue !== 1) {
      //Add dice to the current score
      setCurrentScore((currentScore += diceValue));
    } else {
      //Reset current score of the current player and Switch player
      setCurrentScore(0);
      changePlayer();
    }
  }
};

btnRoll.addEventListener('click', onRollDice);

function setCurrentScore(score) {
  currentScore = score;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
}

const changePlayer = function () {
  setCurrentScore(0);
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

function onHoldDice() {
  if (!isGameOver && finalScores[activePlayer] < maxScore) {
    finalScores[activePlayer] += currentScore;
    if (finalScores[activePlayer] >= maxScore) {
      onGameFinished();
    }
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScores[activePlayer];
    changePlayer();
  }
}

btnHold.addEventListener('click', onHoldDice);

function onGameFinished() {
  diceEl.classList.add('hidden');
  isGameOver = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner', '.name');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
}

function onNewGame() {
  //set state to play
  isGameOver = false;
  //SetScores to 0
  setCurrentScore(0);
  finalScores[0] = 0;
  document.getElementById(`score--0`).textContent = 0;
  finalScores[1] = 0;
  document.getElementById(`score--1`).textContent = 0;
  //Set winner player to defaultdocument
  document
    .querySelector(`.player--0`)
    .classList.remove('player--winner', '.name');
  document
    .querySelector(`.player--1`)
    .classList.remove('player--winner', '.name');
  //Set active player to 0document
  activePlayer = 0;
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  //hide dice
  diceEl.classList.add('hidden');
}

btnNew.addEventListener('click', onNewGame);
