// API Documentation: https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1


//Submit form (Search Bar)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        searchAPI(e.target.text_search.value)
    })
})
//Fetch request and innerHTML for the results after submit form is submitted
function searchAPI (search) {
    let p = document.createElement('p')
    p.textContent = search

    const BASE_URL = "https://itunes.apple.com/search?"
    let SEARCH_PATH = search
    let FINAL_URL = `${BASE_URL}term=${SEARCH_PATH}&media=music&limit=20`

   fetch(FINAL_URL)
    
    .then(res => {
     return res.json(); 
    })
   .then(data => {
        const html = data.results      
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
        
    document.querySelector('#result-list').innerHTML = html.join('');
    
//To toggle the 'like' button 
const allLikeButtons = document.querySelectorAll('#like')

allLikeButtons.forEach((button) => {
   button.addEventListener('click', function() {
       button.classList.toggle('second')
   }) 
})
})
}
