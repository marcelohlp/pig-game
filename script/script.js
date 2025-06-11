"use strict";

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const dice = document.querySelector(".dice");

setTotalsScoresToZero();

hiddenDice(dice);

const players = [0, 1];

const playersScores = [0, 0];
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
    playersScores[currentPlayer] += currentScore;
    currentScore = 0;
    setCurrentPlayerPartialScore(currentPlayer, currentScore);
    setCurrentPlayerTotalScore(currentPlayer, playersScores[currentPlayer]);
    if (playersScores[currentPlayer] >= 20) {
      setPlayerWinner(currentPlayer, true);
      setButtonsDisabled(true);
      hiddenDice(dice);
    }
    changeCurrentPlayer();
    setCurrentPlayerStyle(currentPlayer);
  }
});

btnNew.addEventListener("click", resetGame);

function resetGame() {
  playersScores[0] = 0;
  playersScores[1] = 0;
  currentScore = 0;
  currentPlayer = 0;
  players.forEach((player) => {
    setCurrentPlayerPartialScore(player, 0);
    setCurrentPlayerTotalScore(player, 0);
    setPlayerWinner(player, false);
  });
  setCurrentPlayerStyle(currentPlayer);
  setButtonsDisabled(false);
  hiddenDice(dice);
}

function setTotalsScoresToZero() {
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
}

const getRandonDiceFaceNumber = () => {
  return Math.trunc(Math.random() * 6) + 1;
};

function hiddenDice(diceElement) {
  diceElement.classList.add("hidden");
}

const showDice = (diceElement, diceFace) => {
  diceElement.classList.remove("hidden");
  diceElement.src = `./assets/dice-${diceFace}.png`;
};

const changeCurrentPlayer = () => {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
};

const setCurrentPlayerStyle = (currentPlayer) => {
  players.forEach((player) => {
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

const setPlayerWinner = (currentPlayer, isWinner) => {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.toggle("player--winner", isWinner);
};

const setButtonsDisabled = (isDisabled) => {
  btnHold.disabled = isDisabled;
  btnRoll.disabled = isDisabled;
};
