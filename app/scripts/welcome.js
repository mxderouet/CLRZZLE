import { loadAssets } from "./loadAssets.js"
import { gameData, matcherDiv, playerData, gameStartAudio, mainThemeAudio } from "../common/globalVariables.js"

const startContainer = document.createElement("div");
const gameLogo = document.createElement("div");
const welcomeMessage = document.createElement("div");
const playerNameForm = document.createElement("form");
const rulesDiv = document.createElement("div");
const playButton = document.createElement("button");
const nameLabel = document.createElement("label");
const nameInput = document.createElement("input");

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
  
function retrievePlayerName(playerNameForm) {
    playerNameForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent the form from submitting and page refreshing
  
      const nameInput = document.getElementById("form_name");
      const playerName = nameInput.value || '???';
      
      localStorage.setItem("playerName", playerName);
      console.log("Player name:", playerName);
  
      // Clear the form
      nameInput.value = "";
    });
  
    playerNameForm.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent the form from submitting and page refreshing
        const nameInput = document.getElementById("form_name");
        nameInput.blur(); // Remove focus from the input field
      }
    });
} 

export const welcomeScreen = () => {
    gameData.pauseTimer = true;

    startContainer.style.zIndex = 1000;
    startContainer.id = "start_screen";

    gameLogo.id = "game_logo";
    gameLogo.innerHTML = "<img src=./app/assets/images/puzzle.png>"

    welcomeMessage.id = "welcome_message";
    welcomeMessage.innerText = "WELCOME TO CLRZZLE !";

    playerNameForm.id = "player_form";
    playerNameForm.appendChild(nameLabel);

    nameInput.type = "text";
    nameInput.id = "form_name";
    nameInput.name = "name";
    nameInput.placeholder = "Enter your name";
    nameInput.required = true;
    
    playerNameForm.appendChild(nameInput);
    playerNameForm.onsubmit = function() {
        return false;
    };

    rulesDiv.id = "rules"
    rulesDiv.innerText = "USE ARROWS OR SWIPE TO MATCH"
    
    playButton.id = "play_button";
    playButton.innerText = "PLAY";
    playButton.addEventListener("click", function () {
        retrievePlayerName(playerNameForm);
        playerNameForm.dispatchEvent(new Event("submit"));
        loadGame();
    })

    startContainer.appendChild(gameLogo);
    startContainer.appendChild(welcomeMessage);
    startContainer.appendChild(playerNameForm);
    startContainer.appendChild(playButton);
    startContainer.appendChild(rulesDiv);
    document.body.appendChild(startContainer);
    
    handleThemeMusic();
}