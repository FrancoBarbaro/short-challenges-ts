import { createInterface } from "readline";

const input = createInterface({
  input: process.stdin,
  output: process.stdout,
});

input.question("Who are you? ", (name: string) => {
  console.log(`Hey there ${name}!`);
  input.close();
});
