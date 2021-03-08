const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

// Show Loading Spinner
function loading() {
    loader.hidden  = false;
    quoteContainer.hidden = true;
}
// Hide Loading Spinner
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Show new quote
function newQuote() {
    loading();
// Pick random quote for apiQuates array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// Check if author field is blank and replace it with unkown
if (!quote.author) {
    authorText.textContent = 'Unkown';
} else {
    authorText.textContent = quote.author;
}
// Check Quote lenght to determain font size
    
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
// Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}
// Get quote from API
async function getQuote() {
    loading();
   
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        } catch (error) {
        // Catch Error Here
    }
}
// Tweet Quote
    function tweetQuote() {
        const twitterUrl = `
        https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
        window.open(twitterUrl, '_blank');
    }
// Event Listeners
    newQuoteBtn.addEventListener('click', newQuote);
    twitterBtn.addEventListener('click', tweetQuote);
// On Load
getQuote();
