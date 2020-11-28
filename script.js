const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

/*************************************
 * - get quote from api
 * how the access-control-allow-origin
 * {@link} proxyUrl :  TODO!!!  https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
 * {@link} apiUrl : forismatic api - get quote from api
 ********************************/
async function getQuote() {
    showLoadingSpinner();

    // we need proxy url to make our api call in order to avoid
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //console.log(data);

        //checl if author is blank, add 'unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        //dynamically reduce font size for long quotes with class long-quote from css
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        //stop oder show quote
        removeLoadingSpinner();
        //throw new Error('oops');
    } catch (error) {
        // console.log('no quote' , error);
        getQuote(); //better try to find a new quote
    }
}

/******
    * tweet quote
    * aad twitter functionality
    * Tweet button with parameter text
    * {@link} https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
    * {@link} https://twitter.com/intent/tweet
    */
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;  //template -string 
    window.open(twitterUrl, "_blank");
}

//event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuote();

