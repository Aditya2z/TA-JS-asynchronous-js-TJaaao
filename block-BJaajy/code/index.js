const usernames = ['Vishalgoswami12', 'anish979828', 'ashwanig3', 'Aditya2z', 'anupkumar222'];

function getUserData(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching data for user ${username}: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => {
      throw new Error(`Error fetching data for user ${username}: ${error.message}`);
    });
}

const promises = usernames.map(username => getUserData(username));

Promise.all(promises)
  .then(userDatas => {
    userDatas.forEach(userData => {
      const { login, followers } = userData;
      let card = document.createElement("div");
      card.classList.add("card");

      let img = document.createElement("img");
      img.src = userData.avatar_url;
      img.alt = userData.name;
      img.classList.add("avatar");

      let name = document.createElement("h2");
      name.innerText = userData.name;
      name.classList.add("name");

      let userName = document.createElement("h4");
      userName.innerText = `Username: ${login}`;
      userName.classList.add("username");

      let p = document.createElement("p");
      p.innerText = `${login} has ${followers} followers.`;
      p.classList.add("followers");

      card.append(img, name, userName, p);
      document.querySelector(".root").appendChild(card);
    });
  })
  .catch(error => {
    console.error(error);
  });
