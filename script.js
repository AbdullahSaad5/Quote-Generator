const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const authorName = document.getElementById("author-name");
const newQuote = document.getElementById("new-quote");
const twitterButton = document.getElementById("twitter-button");
const loader = document.getElementById("loader");

newQuote.addEventListener("click", getQuotes);
twitterButton.addEventListener("click", tweet);
async function getQuotes() {
  loading();
  // const apiURL = "https://goquotes-api.herokuapp.com/api/v1/random?count=1";
  try {
    const response = await fetch("https://api.quotable.io/random");
    const quote = await response.json();
    quoteText.innerHTML = quote.content;
    authorName.innerHTML = quote.author;
    if (quote.content.length > 120) {
      quoteText.classList.add("smaller-quote-text");
    } else {
      quoteText.classList.remove("smaller-quote-text");
    }
    loaded();
  } catch (err) {
    console.log(err);
  }
}

function loading() {
  loader.style.display = "block";
  quoteContainer.style.display = "none";
}

function loaded() {
  loader.style.display = "none";
  quoteContainer.style.display = "flex";
}

function tweet() {
  const url = `https://twitter.com/intent/tweet?text=${
    quoteText.textContent + " - " + authorName.textContent
  }`;
  window.open(url, "_blank");
}

getQuotes();
