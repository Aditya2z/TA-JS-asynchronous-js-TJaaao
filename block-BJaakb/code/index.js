let root = document.querySelector(".root");

let input = document.querySelector("input");
let button = document.querySelector(".button");

function fetch(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(JSON.parse(xhr.response));
        xhr.onerror = function () {
          reject("Something went wrong!");
        };
        xhr.send();
    });
}

function displayImages(images) {
  root.innerHTML = "";
  images.forEach((image) => {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = image.cover_photo.urls.regular;
    li.append(img);
    root.append(li);
  });
}

function handleInput(event) {
  if ((event.keyCode === 13 || event.type === "click") && input.value) {
    let searchQuery = input.value;
    let url = `https://api.unsplash.com/search/collections?pages=1&query=${searchQuery}&client_id=CXhethHMEnhUcr5YqFZ7pYjBzhoPNcHu5bDtg-vEHf8`;
    fetch(url).then((searchResult) => {
        displayImages(searchResult.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    input.value = "";
  }
}

input.addEventListener("keydown", handleInput);
button.addEventListener("click", handleInput);
