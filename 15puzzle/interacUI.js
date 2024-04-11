import { startGame } from "./function.js";

document.getElementById('box').addEventListener('click', function() {
  let menu = document.getElementById('container-menu');
  console.log(menu);
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
});


document.getElementById('container-menu-close').addEventListener('click', function() {
  let menu = document.getElementById('container-menu');
  console.log(menu);
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
});

document.getElementById('login-button').addEventListener('click', function() {
  let containerGame = document.getElementById('container');
  let containerLogin = document.getElementById('container-login');
  console.log(containerGame);
  if (containerGame.classList.contains('hidden')) {
    containerGame.classList.remove('hidden');
    containerLogin.classList.add('hidden');
    startGame();
  } else {
    containerGame.classList.add('hidden');
    containerLogin.classList.remove('hidden');
  }
});