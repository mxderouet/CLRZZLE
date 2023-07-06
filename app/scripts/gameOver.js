import { loadAssets } from "./loadAssets.js";
import { matcherDiv, playerData, gameStartAudio } from "../common/globalVariables.js";
// import { firestoreScores } from "./firestoreScore.js";
import { getFirebaseScores } from "./firebase.js";

const endContainer = document.createElement("div")
const banner = document.createElement("div");
const scores = document.createElement("div");
const replayButton = document.createElement("button");
const highScoresDiv = document.createElement("div");

let highScores = JSON.parse(localStorage.getItem('highScores'));

function displayHighScores(highScore) {
  const keys = Object.keys(highScore);
  // const firstScore = `${keys[0] || "???"}: ${highScore[keys[0]] || "0"}`;
  // const secondScore = `${keys[1] || "???"}: ${highScore[keys[1]] || "0"}`;
  // const thirdScore = `${keys[2] || "???"}: ${highScore[keys[2]] || "0"}`;
  // const fourthScore = `${keys[3] || "???"}: ${highScore[keys[3]] || "0"}`;
  // const fifthScore = `${keys[4] || "???"}: ${highScore[keys[4]] || "0"}`;

  highScoresDiv.innerHTML = `
  <table>
    <caption>🏆 HIGH SCORES 🏆</caption>
    <tr>
      <td>🥇</td>
      <td>${keys[0]}</td>
      <td>${highScore[keys[0]] || "0"} pts</td>
    </tr>
    <tr>
      <td>🥈</td>
      <td>${keys[1]}</td>
      <td>${highScore[keys[1]] || "0"} pts</td>
    </tr>
    <tr>
      <td>🥉</td>
      <td>${keys[2]}</td>
      <td>${highScore[keys[2]] || "0"} pts</td>
    </tr>
    <tr>
      <td>#4</td>
      <td>${keys[3]}</td>
      <td>${highScore[keys[3]] || "0"} pts</td>
    </tr>
    <tr>
      <td>#5</td>
      <td>${keys[4]}</td>
      <td>${highScore[keys[4]] || "0"} pts</td>
    </tr>
  </table>
`;
}

export function startGameOverScreen() {
  const playerName = localStorage.getItem('playerName') || "???"
  getFirebaseScores()

  endContainer.id = "end_screen";
  banner.id = "game_over";
  scores.id = "end_scores";
  replayButton.id = "replay_button";
  highScoresDiv.id = "high_score";
  
  (highScores === null) ? highScores = { [playerName]: playerData.score } : highScores[playerName] = playerData.score;
  // Convert the object to an array of key-value pairs
  let entries = Object.entries(highScores);

  // Sort the array based on the values in descending order
  entries.sort((a, b) => b[1] - a[1]);

  // Create a new object from the sorted array
  let sortedScores = Object.fromEntries(entries);

  // if (highScores.length > 1) { highScores.sort((a, b) => b - a) };
  localStorage.setItem("highScores", JSON.stringify(sortedScores));

  banner.innerHTML = "<b>🪦 GAME OVER 🪦<b>";
  scores.innerHTML = `YOUR SCORE: <br><b>${playerData.score}</b>`;
  replayButton.innerHTML = "PLAY AGAIN";

  console.log(sortedScores)
  displayHighScores(sortedScores)

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
  