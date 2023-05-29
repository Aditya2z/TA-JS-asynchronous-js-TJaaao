let root = document.querySelector(".root");

let input = document.querySelector("input");

function fetch(url, handleSuccess) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = () => handleSuccess(JSON.parse(xhr.response));
  xhr.onerror = function () {
    console.error("Something went wrong!");
  };
  xhr.send();
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
  if (event.keyCode === 13 && input.value) {
    let searchQuery = input.value;
    let url = `https://api.unsplash.com/search/collections?pages=1&query=${searchQuery}&client_id=CXhethHMEnhUcr5YqFZ7pYjBzhoPNcHu5bDtg-vEHf8`;
    fetch(url, (searchResult) => {
      displayImages(searchResult.results);
    });
    input.value = "";
  }
}

input.addEventListener("keydown", handleInput);
