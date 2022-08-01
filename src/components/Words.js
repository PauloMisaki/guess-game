import wordBank from '../words-bank.txt'

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let chosenWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArray = result.split('\n');
      chosenWord = wordArray[Math.floor(Math.random() * wordArray.length)]
      wordSet = new Set(wordArray);
  });

  return { wordSet, chosenWord };
}