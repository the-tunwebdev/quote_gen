// Dom 
const quoteContainer= document.getElementById('quote-container')
const quoteText= document.getElementById('quote')
const authorText= document.getElementById('author')

const twitterBtn= document.getElementById('twitter')
const newQuoteBtn= document.getElementById('new-quote')
const loader_bar = document.getElementById('loader')
// loading bar 
function loading(){
    loader_bar.hidden = false;
    quoteContainer.hidden= true;
}
// hide loading 
function complete(){
    if(!loader_bar.hidden){
        quoteContainer.hidden= false;
        loader_bar.hidden = true;

    }
}
// get quote from  api 
async function getQuote(){
    loading()
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl)
        const data =  await response.json();
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        if(data.quoteText.length>120){
            quoteContainer.classList.add('long-quote')
        }else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText= data.quoteText;
        // stop loader, show quote
        complete()
        

    }catch(err){
        getQuote()
    }
}
function tweet(){
    const quote= quoteText.innerText;
    const author = authorText.innerText;
    const twitter = `https://twitter.com/intent/twee?text=${quote} -${author}`
    window.open(twitter,'_blank')
}
// event listenter for tweeting 
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweet)
// on load 
getQuote()
