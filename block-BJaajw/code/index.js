let body = document.querySelector("body");
let root = document.querySelector(".root");
let select = document.querySelector("select");
let optionsArray = [];
let loadingIndicator = document.querySelector(".loadingIndicator");

function createOptionUI(data) {
  let option = document.createElement("option");
  option.value = data;
  option.innerText = data;
  select.append(option);
}

function createUI(data) {
  if (!optionsArray.includes(data.newsSite)) {
    optionsArray.push(data.newsSite);
    createOptionUI(data.newsSite); // Add option to the select element
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

function fetchArticles() {
  if (!navigator.onLine) {
    return Promise.reject(new Error("No network connection available."));
  }

  return fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error occurred while fetching articles.");
      }
      return response.json();
    });
}

// Event listener to handle sorting when an option is selected
select.addEventListener("change", handleChange);

function handleChange(event) {
  showLoadingIndicator();
  let selectedOption = event.target.value;

  // Clear existing articles
  root.innerHTML = "";

  fetchArticles()
    .then((articles) => {
      if (selectedOption === "All") {
        articles.forEach((element) => {
          createUI(element);
        });
      } else {
        let filteredArticles = articles.filter(
          (element) => element.newsSite === selectedOption
        );
        filteredArticles.forEach((element) => {
          createUI(element);
        });
      }
    })
    .catch((error) => {
      console.error(error);
      hideLoadingIndicator();
      body.innerHTML = `<p>${error.message}</p>`; // Display the error message in the body
    })
    .finally(() => {
      hideLoadingIndicator();
    });
}

function showLoadingIndicator() {
  loadingIndicator.classList.remove("hidden");
}

function hideLoadingIndicator() {
  loadingIndicator.classList.add("hidden");
}

// Initial load
if (navigator.onLine) {
  fetchArticles()
    .then((articles) => {
      showLoadingIndicator();
      articles.forEach((element) => {
        createUI(element);
      });
    })
    .finally(() => {
      hideLoadingIndicator();
    });
} else {
  body.innerHTML = `<p>Check Network Connection</p>`;
}