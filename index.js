// API Documentation: https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1

//DOMContentLoaded for the submit form from index.html
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        searchAPI(e.target.text_search.value)
    })
})
//Add user input to the DOM
function searchAPI (search) {
    let p = document.createElement('p')
    p.textContent = search

//API URL 
    const BASE_URL = "https://itunes.apple.com/search?"
    let SEARCH_PATH = search
    let FINAL_URL = `${BASE_URL}term=${SEARCH_PATH}&media=music&limit=20`

//Fetch Request
   fetch(FINAL_URL)
    .then(res => {
     return res.json(); 
    })
   .then(json => {
        const html = json.results      
        .map(searchTerm => {
            return `
            <div class="musician">
                <p>${searchTerm.artistName}</p>
                <p><a target="_blank" rel="noopener noreferrer" href=${searchTerm.artistViewUrl}>Artist Profile</a></p>
                <p><a target="_blank" rel="noopener noreferrer" href=${searchTerm.trackViewUrl}>${searchTerm.trackName}</a></p>
                <p><a target="_blank" rel="noopener noreferrer" href=${searchTerm.collectionViewUrl}>${searchTerm.collectionName}</a></p>
                <audio controls src=${searchTerm.previewUrl}> Your browser does not support the <code>audio</code> element.</audio>
                <p><img src=${searchTerm.artworkUrl100}></img></p>
                <button id="like" type="button">Like</button>
            </div>
            `
        })
//Add search results to the DOM
document.querySelector('#result-list').innerHTML = html.join('');

//Add like button to the DOM
const allLikeButtons = document.querySelectorAll('#like')

//To toggle the 'like' button on every search result
allLikeButtons.forEach((button) => {
   button.addEventListener('click', function() {
       button.classList.toggle('second')
   }) 
})
})
}
