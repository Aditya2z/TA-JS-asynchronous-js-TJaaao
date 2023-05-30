let root = document.querySelector(".root");
let select = document.querySelector("select");
let optionsArray = [];

function createOptionUI(data) {
  let option = document.createElement("option");
  option.value = data;
  option.innerText = data;
  select.append(option);
}

function createUI(data) {
  if (!optionsArray.includes(data.newsSite)) {
    optionsArray.push(data.newsSite);
  }

  let article = document.createElement("article");
  article.classList.add("article");

  let image = document.createElement("img");
  image.src = data.imageUrl;
  image.alt = data.title;

  let div = document.createElement("div");
  div.classList.add("heading");
  let tag = document.createElement("button");
  tag.innerText = data.newsSite;
  let heading = document.createElement("h3");
  heading.innerText = data.title;
  let readmore = document.createElement("a");
  readmore.innerText = "Read More";
  readmore.href = data.url;
  readmore.target = "_blank";
  div.append(tag, heading, readmore);

  article.append(image, div);

  root.append(article);
}

let rawdata = fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`)
  .then((response) => response.json())
  .then((articles) => {
    articles.forEach((element) => {
      createUI(element);
    });
    return articles;
  })
  .then((value) => {
    optionsArray.forEach((option) => {
      createOptionUI(option);
    });
    return value;
  });

// Event listener to handle sorting when an option is selected
select.addEventListener("change", handleChange);

function handleChange(event) {
  let selectedOption = event.target.value;

  // Clear existing articles
  root.innerHTML = "";

  // Filter and create UI for articles based on the selected option
  if (selectedOption === "All") {
    rawdata.then((articles) => {
      articles.forEach((element) => {
        createUI(element);
      });
    });
  } else {
    rawdata.then((articles) => {
      let filteredArticles = articles.filter(
        (element) => element.newsSite === selectedOption
      );
      filteredArticles.forEach((element) => {
        createUI(element);
      });
    });
  }
}
