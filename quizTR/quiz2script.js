const inputOne = document.getElementById("input-1");
const inputTwo = document.getElementById("input-2");
const inputThree = document.getElementById("input-3");
const inputFour = document.getElementById("input-4");
const inputFive = document.getElementById("input-5");

function calculateRatios() {
  if (inputOne.value != "") {
    multiRatios(inputOne.value, "input-1");
  } else if (inputTwo.value != "") {
    multiRatios(inputTwo.value, "input-2");
  } else if (inputThree.value != "") {
    multiRatios(inputThree.value, "input-3");
  } else if (inputFour.value != "") {
    multiRatios(inputFour.value, "input-4");
  } else if (inputFive.value != "") {
    multiRatios(inputFive.value, "input-5");
  } else {
    multiRatios(null, "");
  }
}

function multiRatios(number, input) {
  const ratios = [1.0, 0.07, 1.07, 0.03, 1.04];
  let calculate1, calculate2, calculate3, calculate4, calculate5;
  switch (input) {
    case "input-1":
      calculate2 = number * ratios[1];
      inputTwo.value += calculate2.toFixed(2);
      calculate3 = number * ratios[2];
      inputThree.value += calculate3.toFixed(2);
      calculate4 = number * ratios[3];
      inputFour.value += calculate4.toFixed(2);
      calculate5 = number * ratios[4];
      inputFive.value += calculate5.toFixed(2);
      break;
    case "input-2":
      calculate1 = (number * ratios[0]) / ratios[1];
      inputOne.value += calculate1.toFixed(2);
      calculate3 = (number * ratios[2]) / ratios[1];
      inputThree.value += calculate3.toFixed(2);
      calculate4 = (number * ratios[3]) / ratios[1];
      inputFour.value += calculate4.toFixed(2);
      calculate5 = (number * ratios[4]) / ratios[1];
      inputFive.value += calculate5.toFixed(2);
      break;
    case "input-3":
      calculate1 = (number * ratios[0]) / ratios[2];
      inputOne.value += calculate1.toFixed(2);
      calculate2 = (number * ratios[1]) / ratios[2];
      inputTwo.value += calculate2.toFixed(2);
      calculate4 = (number * ratios[3]) / ratios[2];
      inputFour.value += calculate4.toFixed(2);
      calculate5 = (number * ratios[4]) / ratios[2];
      inputFive.value += calculate5.toFixed(2);
      break;
    case "input-4":
      calculate1 = (number * ratios[0]) / ratios[3];
      inputOne.value += calculate1.toFixed(2);
      calculate2 = (number * ratios[1]) / ratios[3];
      inputTwo.value += calculate2.toFixed(2);
      calculate3 = (number * ratios[2]) / ratios[3];
      inputThree.value += calculate3.toFixed(2);
      calculate5 = (number * ratios[4]) / ratios[3];
      inputFive.value += calculate5.toFixed(2);
      break;
    case "input-5":
      calculate1 = (number * ratios[0]) / ratios[4];
      inputOne.value += calculate1.toFixed(2);
      calculate2 = (number * ratios[1]) / ratios[4];
      inputTwo.value += calculate2.toFixed(2);
      calculate3 = (number * ratios[2]) / ratios[4];
      inputThree.value += calculate3.toFixed(2);
      calculate4 = (number * ratios[3]) / ratios[4];
      inputFour.value += calculate4.toFixed(2);
      break;
    default:
      inputOne.value = "";
      inputTwo.value = "";
      inputThree.value = "";
      inputFour.value = "";
      inputFive.value = "";
      alert("Please, Input something.");
      break;
  }
}

function clearValue() {
  inputOne.value = "";
  inputTwo.value = "";
  inputThree.value = "";
  inputFour.value = "";
  inputFive.value = "";
}
