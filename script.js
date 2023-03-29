function log(text) {
  console.log(text);
}
const lettersSym = [
  "ą",
  "ć",
  "ę",
  "ł",
  "ó",
  "ś",
  "ń",
  "ż",
  "ź",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

const lettersWrap = document.getElementsByClassName("letters");
const guessingWord = document.getElementById("guessingWord");
const end = document.getElementById("end");
const result = document.getElementById("result");
const resultImg = document.querySelectorAll("#end img");
const wrong = document.getElementById("wrong");
const hangman = document.getElementById("hangman");
const kate = document.getElementById("kate");
const close = document.getElementById("close");
const next = document.getElementById("next");
const gameLimit = 10;
let wrongCount = 0;
let wylosowanaKategoria = "";
let private = "";
let buttons = [];

function drawLetters() {
  const row1 = document.getElementById("row1");
  const row2 = document.getElementById("row2");
  const row3 = document.getElementById("row3");
  const row4 = document.getElementById("row4");
  let createIndex = 0;
  let delIndex = 0;

  if (buttons.length > 0) {
    for (let i = 0; i < buttons.length; i++) {
      delIndex++;
      if (delIndex <= 9) {
        row1.removeChild(buttons[i]);
      } else if (delIndex <= 19) {
        row2.removeChild(buttons[i]);
      } else if (delIndex <= 28) {
        row3.removeChild(buttons[i]);
      } else {
        row4.removeChild(buttons[i]);
      }
    }
  }
  for (let i = 0; i < lettersSym.length; i++) {
    const newLetter = document.createElement("button");
    newLetter.classList.add("letter");
    newLetter.innerHTML = lettersSym[i];
    newLetter.setAttribute("value", lettersSym[i]);
    createIndex++;
    if (createIndex <= 9) {
      row1.appendChild(newLetter);
    } else if (createIndex <= 19) {
      row2.appendChild(newLetter);
    } else if (createIndex <= 28) {
      row3.appendChild(newLetter);
    } else {
      row4.appendChild(newLetter);
    }
  }
  buttons = document.querySelectorAll(".letters button");
}

drawLetters();

function word() {
  const game = document.getElementById("game");
  const spans = document.querySelectorAll(".game span");
  const slowa = {
    zwierzęta: ["pies", "kot", "małpa"],
    przedmioty: ["telefon", "patelnia", "słuchawki"],
  };
  const kategorie = Object.keys(slowa);
  const indexKategori = Math.floor(Math.random() * kategorie.length);
  wylosowanaKategoria = kategorie[indexKategori];
  const slowaDoWyboru = slowa[wylosowanaKategoria];
  const indexWyboru = Math.floor(Math.random() * slowaDoWyboru.length);

  const wordToGuessLen = slowaDoWyboru[indexWyboru].length;
  if (spans.length > 0) {
    for (let i = 0; i < spans.length; i++) {
      game.removeChild(spans[i]);
    }
  }
  for (let i = 0; i < wordToGuessLen; i++) {
    const letter = document.createElement("span");
    letter.innerHTML = "_";
    game.appendChild(letter);
    kate.innerHTML = "kategoria: " + wylosowanaKategoria;
  }
  private = slowaDoWyboru[indexWyboru];
}
word();

function hangManBuild() {
  hangman.src = "/img/stage" + wrongCount + ".png";
}

function endOfGame(gameResult, word, image) {
  drawLetters();
  wrongCount = 0;
  end.classList.add("endgame");
  result.style.display = "block";
  const resultH1 = document.querySelector(".popup h1");
  const resultSpan = document.querySelector(".popup span");
  resultH1.innerHTML = gameResult;
  resultSpan.innerHTML = word;
  resultImg.forEach((img) => {
    img.src = "/img/" + image + ".png";
    img.style.display = "block";
  });
}

function ifWin() {
  const spans = document.querySelectorAll(".game span");
  let wordCheck = "";
  if (wrongCount == gameLimit) {
    endOfGame("Przegrana", private, "lose");
  } else {
    spans.forEach((span) => {
      wordCheck += span.innerHTML;
    });
    if (wordCheck === private) {
      endOfGame("Wygrana", private, "win");
    }
  }
}

function guess() {
  const spans = document.querySelectorAll(".game span");
  let indexes = [];
  buttons.forEach((item) => {
    item.addEventListener(
      "click",
      () => {
        if (private.includes(item.value) == true) {
          anime({
            targets: item,
            backgroundColor: "rgba(188, 240, 165,0.5)",
          });
          const value = item.value;
          for (let i = 0; i < private.length; i++) {
            const letter = private[i];
            if (letter in indexes) {
              indexes[letter].push(i);
            } else {
              indexes[letter] = [i];
            }
          }
          indexes[value].forEach((index) => {
            spans[index].innerHTML = value;
          });
          ifWin();
        } else {
          wrongCount++;
          wrong.innerHTML = wrongCount + " / 10";
          hangManBuild();
          ifWin();
          anime({
            targets: item,
            backgroundColor: "rgba(180, 12, 10,0.5)",
          });
        }
      },
      { once: true }
    );
  });
}
guess();
// function goodGuess(letter) {
//   const spans = document.querySelectorAll(".game span");
//   let indexes = [];
//   if (private.includes(letter)) {
//     for (let i = 0; i < private.length; i++) {
//       const letter = private[i];
//       if (letter in indexes) {
//         indexes[letter].push(i);
//       } else {
//         indexes[letter] = [i];
//       }
//     }
//     indexes[letter].forEach((index) => {
//       spans[index].innerHTML = letter;
//     });
//     return true;
//   }
// }
// buttons.forEach((button) => {
//   button.addEventListener(
//     "click",
//     () => {
//       if (goodGuess(button.innerHTML, private) == true) {
//         ifWin();
//         anime({
//           targets: button,
//           backgroundColor: "rgba(188, 240, 165,0.5)",
//         });
//       } else {
//         wrongCount++;
//         wrong.innerHTML = wrongCount + " / 10";
//         hangManBuild();
//         ifWin();
//         anime({
//           targets: button,
//           backgroundColor: "rgba(180, 12, 10,0.5)",
//         });
//       }
//     },
//     { once: true }
//   );
// });

close.addEventListener("click", () => {
  end.classList.remove("endgame");
  result.style.display = "none";
  resultImg.forEach((img) => {
    img.style.display = "none";
  });
});

next.addEventListener("click", () => {
  wrong.innerHTML = wrongCount + " / 10";
  end.classList.remove("endgame");
  result.style.display = "none";
  resultImg.forEach((img) => {
    img.style.display = "none";
  });
  hangManBuild();
  word();
  drawLetters();
  guess();
});
