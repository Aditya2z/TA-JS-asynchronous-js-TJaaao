const bookList = document.querySelector(".booklist");
const characterList = document.querySelector(".characterlist");

const url = `https://www.anapioficeandfire.com/api/books`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    createBooklistUI(data);
    return data;
  })
  .catch((error) => {
    console.log("Error fetching book data:", error);
  });

function createBooklistUI(dataArray) {
  dataArray.forEach(({ name, authors, characters }) => {
    const div = document.createElement("div");
    div.classList.add("card");
    const title = document.createElement("h2");
    title.innerText = name;
    const writer = document.createElement("h3");
    writer.innerText = authors;
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerText = `Show Characters (${characters.length})`;
    div.append(title, writer, btn);

    btn.addEventListener("click", () => {
      toggleCharacterList(characters, btn);
    });

    bookList.append(div);
  });
}

function toggleCharacterList(characters, button) {
  characterList.innerHTML = "";

  if (characterList.style.display === "none") {
    showCharacterList(characters, button);
  } else {
    hideCharacterList();
  }
}

function showCharacterList(characters, button) {
  characterList.style.display = "block";
  createCloseButton();

  const characterRequests = characters.map((characterUrl) =>
    fetch(characterUrl).then((response) => response.json())
  );

  Promise.all(characterRequests)
    .then((characterDataArrayOfObjects) => {
      createCharacterList(characterDataArrayOfObjects);
    })
    .catch((error) => {
      console.log("Error fetching character data:", error);
    })
    .finally(() => {
      button.innerText = `Show Characters (${characters.length})`;
    });

  button.innerText = "Loading...";
}

function hideCharacterList() {
  characterList.style.display = "none";
}

function createCloseButton() {
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-btn");
  closeButton.innerText = "Close";
  characterList.appendChild(closeButton);

  closeButton.addEventListener("click", () => {
    hideCharacterList();
  });
}

function createCharacterList(characterDataArrayOfObjects) {
    const ul = document.createElement("ul");
  
    characterDataArrayOfObjects.forEach((characterData) => {
      const { name, gender, aliases, tvSeries } = characterData;
  
      const listItem = document.createElement("li");
  
      const card = document.createElement("div");
      card.classList.add("card");
  
      const characterName = document.createElement("h2");
      characterName.innerText = name;
  
      const characterGender = document.createElement("p");
      characterGender.innerText = `Gender: ${gender}`;
  
      const characterAliases = document.createElement("p");
      characterAliases.innerText = `Aliases: ${aliases.join(", ")}`;
  
      const characterTVSeries = document.createElement("p");
      characterTVSeries.innerText = `TV Series: ${tvSeries.join(", ")}`;
  
      card.append(characterName, characterGender, characterAliases, characterTVSeries);
      listItem.appendChild(card);
      ul.appendChild(listItem);
    });
  
    characterList.appendChild(ul);
  }
  
