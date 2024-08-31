const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);
const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "aftermath",
  "wizard",
  "witch",
  "rcb",
  "prototype",
  "shirt",
  "action",
  "sweetcorn",
  "apple",
  "jacket",
  "bootstrap",
  "javascript",
  "browser",
  "debugging",
  "cookies",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

function hint(){
  if (selectedWord.match("wizard")){
    return(
    document.getElementById("find").innerHTML=("<p>The man who specializes in magic</p>")
  )}
  if (selectedWord.match("witch")){
    return(
    document.getElementById("find").innerHTML=("<p>The woman who specializes in magic</p>")
  )}
  if (selectedWord.match("aftermath")){
    return(
    document.getElementById("find").innerHTML=("<p>the consequences of an event</p>")
  )}
  if (selectedWord.match("rcb")){
    return(
    document.getElementById("find").innerHTML=("<p>Team with no trophy</p>")
  )}
  if (selectedWord.match("prototype")){
    return(
    document.getElementById("find").innerHTML=("<p>preliminary version of a device</p>")
  )}
  if (selectedWord.match("shirt")){
    return(
    document.getElementById("find").innerHTML=("<p>clothes</p>")
  )}
  if (selectedWord.match("action")){
    return(
    document.getElementById("find").innerHTML=("<p>verb</p>")
  )}
  if (selectedWord.match("sweetcorn")){
    return(
    document.getElementById("find").innerHTML=("<p>vegetable</p>")
  )}
  if (selectedWord.match("apple")){
    return(
    document.getElementById("find").innerHTML=("<p>fruit</p>")
  )}
  if (selectedWord.match("jacket")){
    return(
    document.getElementById("find").innerHTML=("<p>clothes</p>")
  )}
  if (selectedWord.match("bootstrap")){
    return(
    document.getElementById("find").innerHTML=("<p>css framework</p>")
  )}
  if (selectedWord.match("javascript")){
    return(
    document.getElementById("find").innerHTML=("<p>language for dynamic webpage</p>")
  )}
  if (selectedWord.match("browser")){
    return(
    document.getElementById("find").innerHTML=("<p>its a graphical user interface</p>")
  )}
  if (selectedWord.match("debugging")){
    return(
    document.getElementById("find").innerHTML=("<p>fixing error</p>")
  )}
  if (selectedWord.match("cookies")){
    return(
    document.getElementById("find").innerHTML=("<p>food liked by children</p>")
  )}
  
  }

  function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split("") // to array
      .map(
        (letter) => `
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
      )
      .join("")} 
    `; // to string
  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    finalMessageRevealWord.innerText = "";
    popup.style.display = "flex";
    
    playable = false;
  }
}

function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    index < errors
      ? (part.style.display = "block")
      : (part.style.display = "none");
  });
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";
    playable = false;
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

window.addEventListener("keypress", (e) => {
  if (playable) {
    const letter = e.key.toLowerCase();
    if (letter >= "a" && letter <= "z") {
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLettersElement();
        } else {
          showNotification();
        }
      }
    }
  }
});
playAgainButton.addEventListener("click", () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  hint();
  updateWrongLettersElement();
  
  popup.style.display = "none";
});

// Init
displayWord();
hint();