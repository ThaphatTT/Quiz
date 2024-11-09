function helloWorld() {
  const userInput = document.getElementById("userInput").value;
  forLoop(userInput);
}

function forLoop(number) {
  let star = [];
  const showOutput = document.getElementById("output");
  if (number % 2 === 0) {
    for (let i = 0; i < number; i++) {
      star.push("*");
      showOutput.innerHTML += `<p>${star.join("")}</p><br>`;
    }
  } else {
    for (let i = 0; i < number; i++) {
      star.push("*");
    }
    for (let j = 0; j < number; j++) {
      showOutput.innerHTML += `<p>${star.join("")}</p><br>`;
      star.pop();
    }
  }
}
