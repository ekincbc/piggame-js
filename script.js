'use strict';

// Selecting Elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Starting Conditions
diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // if (activePlayer === 1) {
  //   player0El.classList.remove('player--active');
  //   player1El.classList.add('player--active');
  // } else {
  //   player1El.classList.remove('player--active');
  //   player0El.classList.add('player--active');
  // }

  // you can use this instead of the above

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const gameReset = () => {
  playing = true;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  //   player0El.classList.remove('player--active');
  //   player1El.classList.remove('player--active');
};

btnRoll.addEventListener('click', function (event) {
  // 1. Generating a random dice roll
  if (playing) {
    const diceValue1 = Math.floor(Math.random() * 6) + 1;
    const diceValue2 = Math.floor(Math.random() * 6) + 1;

    //2. Displaying the dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceValue1}.png`;

    // 3. Check for rolled 1: if true, switch player
    if (diceValue1 !== 1) {
      currentScore = currentScore + diceValue1;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // 4. Switch player
      switchPlayer();
    }
  }
});

// Rolling dice functionality

btnHold.addEventListener('click', function () {
  // Add the current score to active player's score
  //   activePlayer = activePlayer === 0 ? 1 : 0;
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player score is >= 100
    //Finish the game
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', gameReset);
