import { loadAssets } from "./load-assets.js";
import { matcherDiv, playerData, gameStartAudio } from "../common/globalVariables.js";

const endContainer = document.createElement("div")
const banner = document.createElement("div");
const scores = document.createElement("div");
const replayButton = document.createElement("button");
const highScoresDiv = document.createElement("div");
let highScores = []

export function startGameOverScreen() {
    endContainer.id = "end_screen";
    banner.id = "game_over";
    scores.id = "end_scores";
    replayButton.id = "replay_button";
    highScoresDiv.id = "high_score";
    highScores.push(playerData.score);
    highScores.sort((a, b) => b - a);
    console.log('highScores:', highScores)
    banner.innerHTML = "GAME OVER";
    scores.innerHTML = `YOUR SCORE: ${playerData.score}`;
    replayButton.innerHTML = "PLAY AGAIN";
    highScoresDiv.innerHTML = `
      HIGH SCORES
      <br>
      #1: ${highScores[0] ?? "0"} point(s)
      <br>
      #2: ${highScores[1] ?? "0"} point(s)
      <br>
      #3: ${highScores[2] ?? "0"} point(s)
      <br>
      #4: ${highScores[3] ?? "0"} point(s)
      <br>
      #5: ${highScores[4] ?? "0"} point(s)
      <br>
    `;
    endContainer.style.zIndex = 1000;
    endContainer.appendChild(banner);
    endContainer.appendChild(scores);
    endContainer.appendChild(replayButton);
    endContainer.appendChild(highScoresDiv);
    document.body.appendChild(endContainer);
  
    // Check if event listener already exists before adding a new one
    if (!replayButton.hasEventListener) {
      replayButton.addEventListener("click", handleReplayClick);
      replayButton.hasEventListener = true;
    }
  }  
  
  function handleReplayClick() {
    // Remove event listener before starting a new game
    gameStartAudio.play();
    replayButton.removeEventListener("click", handleReplayClick);
    replayButton.hasEventListener = false;
    playerData.score = 0;
    playerData.lives = 3;
    console.log("NEW GAME !");
    endContainer.style.zIndex = -1000;
    loadAssets(matcherDiv, playerData.score, playerData.lives);
  }
  