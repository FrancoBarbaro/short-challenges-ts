function isPangram(sentence: string) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  let lettersUsed: Record<string, null> = {};
  for (let letter of sentence) {
    if (letter.toLowerCase() in lettersUsed === false) {
      lettersUsed[letter.toLowerCase()] = null;
    }
  }
  for (let character of alphabet) {
    if (character in lettersUsed === false) {
      return false;
    }
  }
  return true;
}

console.clear();

console.log(isPangram("The quick brown fox jumps over the lazy dog")); // should return true
console.log(isPangram("She doesn't study German on Monday")); // should return false
