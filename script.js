function log(text) {
  console.log(text);
}

const guessingWord = document.getElementById("guessingWord");
const buttons = document.querySelectorAll(".letters button");
const end = document.getElementById("end");
const result = document.getElementById("result");
const game = document.getElementById("game");
const wrong = document.getElementById("wrong");
const hangman = document.getElementById("hangman");
const kate = document.getElementById("kate");
const gameLimit = 10;
let wrongCount = 0;
let wylosowanaKategoria = "";

function word() {
  const slowa = {
    zwierzęta: ["pies", "kot", "małpa"],
    przedmioty: ["telefon", "patelnia", "słuchawki"],
  };
  const kategorie = Object.keys(slowa);
  const indexKategori = Math.floor(Math.random() * kategorie.length);
  wylosowanaKategoria = kategorie[indexKategori];
  const slowaDoWyboru = slowa[wylosowanaKategoria];
  const indexWyboru = Math.floor(Math.random() * slowaDoWyboru.length);

  return slowaDoWyboru[indexWyboru];
}
const private = word();

function wordToGuessGenerator(word) {
  const wordToGuessLen = word.length;
  for (let i = 0; i < wordToGuessLen; i++) {
    const letter = document.createElement("span");
    letter.innerHTML = "_";
    game.appendChild(letter);
    kate.innerHTML = "kategoria: " + wylosowanaKategoria;
  }
}

wordToGuessGenerator(private);

function hangManBuild() {
  hangman.src = "/img/stage" + wrongCount + ".png";
}

function goodGuess(letter, word) {
  const spans = document.querySelectorAll(".game span");
  let indexes = [];
  if (word.includes(letter)) {
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (letter in indexes) {
        indexes[letter].push(i);
      } else {
        indexes[letter] = [i];
      }
    }
    indexes[letter].forEach((index) => {
      spans[index].innerHTML = letter;
    });
    return true;
  } else {
  }
}

function endOfGame(gameResult, word) {
  end.classList.add("endgame");
  result.style.display = "block";
  const resultH1 = document.querySelector(".popup h1");
  const resultSpan = document.querySelector(".popup span");
  resultH1.innerHTML = gameResult;
  resultSpan.innerHTML = word;
}

function ifWin() {
  const spans = document.querySelectorAll(".game span");
  let wordCheck = "";
  if (wrongCount == gameLimit) {
    endOfGame("Przegrana", private);
  } else {
    spans.forEach((span) => {
      wordCheck += span.innerHTML;
    });
    if (wordCheck === private) {
      endOfGame("Wygrana", private);
    }
  }
}

buttons.forEach((button) => {
  button.addEventListener(
    "click",
    () => {
      if (goodGuess(button.innerHTML, private) == true) {
        ifWin();
        anime({
          targets: button,
          backgroundColor: "rgba(188, 240, 165,0.5)",
        });
      } else {
        wrongCount++;
        wrong.innerHTML = wrongCount + " / 10";
        hangManBuild();
        ifWin();
        anime({
          targets: button,
          backgroundColor: "rgba(180, 12, 10,0.5)",
        });
      }
    },
    { once: true }
  );
});
