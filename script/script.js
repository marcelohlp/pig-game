"use strict";

let playerOneScore = 0;
let playerTwoScore = 0;

const totalScoreOne = document.getElementById("score--0");
const totalScoreTwo = document.getElementById("score--1");

const currentScoreOne = document.getElementById("current--0");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const dice = document.querySelector(".dice");

totalScoreOne.textContent = playerOneScore;
totalScoreTwo.textContent = playerTwoScore;

dice.classList.add("hidden");

const getRandonDiceFaceNumber = () => {
  return Math.trunc(Math.random() * 6) + 1;
};

const playesScores = [0, 0];
let currentScore = 0;
let currentPlayer = 0;

btnRoll.addEventListener("click", () => {
  // Get randon dice face
  let diceFace = getRandonDiceFaceNumber();

  // Show new dice face
  dice.classList.remove("hidden");
  dice.src = `./assets/dice-${diceFace}.png`;

  // Check dice face is diferent from 1
  if (diceFace !== 1) {
    // Add dice face to the current score
    currentScore += diceFace;
    currentScoreOne.textContent = currentScore;
  } else {
    // Remove current score
    currentScore = 0;
    // Change player
  }
});
