import readlineSync from "readline-sync";
import { readFileSync } from "fs";

const input = readlineSync.question;

let words = readFileSync(".\\guess_game\\common_words.txt")
  .toString()
  .split("\r\n");

console.clear();
let runGame = true;

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isLower(character: any) {
  return (
    character === character.toLowerCase() &&
    character !== character.toUpperCase()
  );
}

function askDifficulty() {
  while (true) {
    var dif = input("Choose difficulty; easy, medium, or hard: ");
    if (dif === "easy" || dif === "medium" || dif === "hard") {
      break;
    } else {
      console.log('Invalid respone, please type "easy", "medium", or "hard"');
    }
  }
  console.log(
    dif[0].toUpperCase() +
      dif.substring(1) +
      " difficulty chosen. Starting game..."
  );
  return dif;
}

function pickWord(difficulty: string) {
  let easyWords: string[] = [];
  let mediumWords: string[] = [];
  let hardWords: string[] = [];
  words.forEach((word) => {
    if (word.length > 2 && word.length <= 4) {
      easyWords.push(word);
    } else if (word.length > 4 && word.length <= 6) {
      mediumWords.push(word);
    } else if (word.length > 6 && word.length <= 10) {
      hardWords.push(word);
    }
  });
  if (difficulty === "easy") {
    let index = randomIntFromInterval(0, easyWords.length - 1);
    return easyWords[index];
  } else if (difficulty === "medium") {
    let index = randomIntFromInterval(0, mediumWords.length - 1);
    return mediumWords[index];
  } else {
    let index = randomIntFromInterval(0, hardWords.length - 1);
    return hardWords[index];
  }
}

function updateDashes() {
  let oldDashes = dashes;
  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] == guess) {
      dashes = dashes.substring(0, i) + guess + dashes.substring(i + 1);
    }
  }
  if (dashes === oldDashes) {
    return false;
  }
  return true;
}

function getGuess() {
  let userGuess = input("Guess: ");
  if (userGuess.length != 1) {
    console.log("Your guess must have exactly one character!");
  } else if (isLower(userGuess) === false) {
    console.log("Your guess must be a lowercase letter!");
  } else if (secretWordSplit.includes(userGuess)) {
    console.log("That letter is in the secret word!");
  } else {
    console.log("That letter is not in the secret word!");
  }
  return userGuess;
}

while (runGame) {
  // main code
  var secretWord = pickWord(askDifficulty());
  var secretWordSplit = secretWord.split("");
  var dashes = "-".repeat(secretWord.length);
  let guessesLeft = 10;

  while (true) {
    console.log(dashes);
    var guess = getGuess();
    let didDashesUpdate = updateDashes();
    if (dashes === secretWord) {
      console.log("Congrats! You win. The word was: " + '"' + secretWord + '"');
      break;
    } else if (guessesLeft === 1) {
      console.log("You lose. The word was: " + '"' + secretWord + '"');
      break;
    } else if (didDashesUpdate) {
      console.log(guessesLeft + " incorrect guesses left.");
    } else {
      guessesLeft -= 1;
      console.log(guessesLeft + " incorrect guesses left.");
    }
  }
  while (true) {
    let playAgain = input("Do you want to play again: ");
    if (playAgain === "yes") {
      console.log("Restarting game...");
      console.clear();
      break;
    } else if (playAgain === "no") {
      console.log("Thank you for playing!");
      console.log("\n");
      runGame = false;
      break;
    } else {
      console.log('Invalid response, please type "yes" or "no"');
    }
  }
}
