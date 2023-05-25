let root = document.querySelector(".root");
let input = document.querySelector("input");
let username = input.value;

let xhr = new XMLHttpRequest();
xhr.open("GET", `https://api.github.com/users/${username}`);
xhr.send();