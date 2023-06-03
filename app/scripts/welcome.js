import { loadAssets } from "./loadAssets.js"
import { gameData, matcherDiv, playerData, gameStartAudio, mainThemeAudio } from "../common/globalVariables.js"

const startContainer = document.createElement("div");
const gameLogo = document.createElement("div");
const welcomeMessage = document.createElement("div");
const rulesDiv = document.createElement("div");
const playButton = document.createElement("button");

function loadGame() {
    gameStartAudio.play()
    startContainer.style.zIndex = - 1000;
    loadAssets(matcherDiv, playerData.score, playerData.lives);
}

function playMainTheme () {
    mainThemeAudio.play();
}

function handleThemeMusic () {
    document.body.addEventListener("mousemove", playMainTheme)
    document.getElementById("play_button").addEventListener("click", function () {
        mainThemeAudio.pause();
        document.body.removeEventListener("mousemove", playMainTheme)
    })
}

export const welcomeScreen = () => {
    gameData.pauseTimer = true;

    startContainer.style.zIndex = 1000;
    startContainer.id = "start_screen";

    gameLogo.id = "game_logo";
    gameLogo.innerHTML = "<img src=./app/assets/images/puzzle.png>"

    welcomeMessage.id = "welcome_message";
    welcomeMessage.innerText = "WELCOME TO CLRZZLE !";

    rulesDiv.id = "rules"
    rulesDiv.innerText = "USE ARROWS OR SWIPE TO MATCH"
    
    playButton.id = "play_button";
    playButton.innerText = "PLAY";
    playButton.addEventListener("click", () => loadGame());

    startContainer.appendChild(gameLogo);
    startContainer.appendChild(welcomeMessage);
    startContainer.appendChild(playButton);
    startContainer.appendChild(rulesDiv);
    document.body.appendChild(startContainer);
    
    handleThemeMusic();
}