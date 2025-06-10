"use strict";

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const dice = document.querySelector(".dice");

setTotalsScoresToZero();

hiddenDice(dice);

const playesScores = [0, 0];
let currentScore = 0;
let currentPlayer = 0;

btnRoll.addEventListener("click", () => {
  let diceFace = getRandonDiceFaceNumber();

  showDice(dice, diceFace);

  if (diceFace !== 1) {
    currentScore += diceFace;
    setCurrentPlayerPartialScore(currentPlayer, currentScore);
  } else {
    currentScore = 0;
    setCurrentPlayerPartialScore(currentPlayer, currentScore);
    changeCurrentPlayer();
    setCurrentPlayerStyle(currentPlayer);
  }
});

btnHold.addEventListener("click", () => {
  if (currentScore > 0) {
    playesScores[currentPlayer] += currentScore;
    currentScore = 0;
    setCurrentPlayerPartialScore(currentPlayer, currentScore);
    setCurrentPlayerTotalScore(currentPlayer, playesScores[currentPlayer]);
    changeCurrentPlayer();
    setCurrentPlayerStyle(currentPlayer);
  }
});

function setTotalsScoresToZero() {
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
}

const getRandonDiceFaceNumber = () => {
  return Math.trunc(Math.random() * 6) + 1;
};

function hiddenDice(selector) {
  selector.classList.add("hidden");
}

const showDice = (selector, diceFace) => {
  selector.classList.remove("hidden");
  selector.src = `./assets/dice-${diceFace}.png`;
};

const changeCurrentPlayer = () => {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
};

const setCurrentPlayerStyle = (currentPlayer) => {
  [0, 1].forEach((player) => {
    document
      .querySelector(`.player--${player}`)
      .classList.toggle("player--active", player === currentPlayer);
  });
};

const setCurrentPlayerPartialScore = (currentPlayer, currentScore) => {
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
};

const setCurrentPlayerTotalScore = (currentPlayer, totalScore) => {
  document.getElementById(`score--${currentPlayer}`).textContent = totalScore;
};
