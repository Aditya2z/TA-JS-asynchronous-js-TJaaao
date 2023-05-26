let root = document.querySelector(".root");
let userImage = document.querySelector(".root img");
let userName = document.querySelector(".root h3");
let userLogin = document.querySelector(".root p");
let followersUL = document.querySelector(".followers");
let followingUL = document.querySelector(".following");
let input = document.querySelector("input");
input.value = "Aditya2z";

function handleDisplay(userInfo) {
  userImage.src = userInfo.avatar_url;
  userImage.alt = userInfo.name;
  userName.innerText = userInfo.name;
  userLogin.innerText = "@" + userInfo.login;
  displayInfo(`https://api.github.com/users/${userInfo.login}/followers`, followersUL);
  displayInfo(`https://api.github.com/users/${userInfo.login}/following`, followingUL);
}

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));
  xhr.onerror = function () {
    console.log("Something went wrong");
  };
  xhr.send();
}

function displayInfo(url, rootElement) {
    fetch(url, function(followersList) {
        let topFive = followersList.slice(0, 5);
        topFive.forEach(info => {
            let li =  document.createElement("li");
            let img = document.createElement("img");
            li.append(img);
            img.src = info.avatar_url;
            rootElement.append(li);
        })
    })

}

function handleInput(event) {
  if (event.keyCode === 13 && input.value) {
    let username = input.value;
    const url = `https://api.github.com/users/`;
    fetch(url + username, handleDisplay);

    input.value = "Aditya2z";
  }
}

input.addEventListener("keyup", handleInput);
