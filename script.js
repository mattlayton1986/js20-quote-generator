// Page element selectors
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Quotes
let apiQuotes = [];

async function fetchQuotesFromAPI() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    throw new Error("oops");
  } catch(error) {
    // Catch error
    console.error(error);
    displayErrorMessage();
  }
}

function newQuote() {
  // Get random quote from apiQuotes array
  const random = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[random];

  // Reduce font size for longer quotes
  quote.text.length > 120
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote');
  
  // Update UI with new quote info
  quoteText.textContent = quote.text;
  authorText.textContent = quote.author || 'Unknown';
  
  removeLoadingSpinner();
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

function displayErrorMessage() {
  // Remove all child nodes from quote container
  while (quoteContainer.firstChild) {
    quoteContainer.removeChild(quoteContainer.firstChild);
  }

  // Create error content
  let errorContainer = document.createElement('div');
  errorContainer.appendChild( document.createTextNode(
    `An error occurred while fetching data. Please refresh the page or try again later. Sorry for the inconvenience!`
  ) );
  errorContainer.setAttribute('id', 'error');

  // Add error content to quote container
  quoteContainer.appendChild(errorContainer);
}

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
fetchQuotesFromAPI();