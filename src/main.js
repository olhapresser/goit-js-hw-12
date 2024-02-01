import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    form: document.querySelector('#form'),
    input: document.querySelector('.input'),
    container: document.querySelector('.container'),
}

refs.form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    const query = form.elements.query.value;

    getPhotos(query).then(handlePhotos).catch(onFetchError).finally(() => form.reset());

})
    
const API_KEY = "42114323-50c2b50fedad4076dc7ba42b5";
const BASE_URL = "https://pixabay.com/api"; 


function getPixabayPhotoUrl(query) {
    return `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${query}` 
}

function getPhotos(query) {
    const url = getPixabayPhotoUrl(query);
    return fetch(url).then((resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    }
    ).then(({ hits }) => hits);
}

function onFetchError() {
    iziToast.error({
    title: 'Sorry, something went wrong.',
});
}

function onEmptyResults() {
    iziToast.error({
        title: 'Sorry, there are no images matching your search query. Please try again!',
    })
}

function handlePhotos(photos) {
    if (photos.length === 0) {
        return onEmptyResults();
    } 

    renderPhotos(photos);
}

function renderPhotos(photos) {
  const photosHtml =  photos.map((photo) => 
        getPhotoHtml(photo)
    ).join(" ")

    refs.container.innerHTML(photosHtml)
}

function getPhotoHtml({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
    return `
    <div>
    <img src="${webformatURL}" alt="${tags}">
<ul>
<li>
<span>Likes</span><br>
<span>${likes}</span>
</li>
<li>
<span>Views</span><br>
<span>${views}</span>
</li>
<li>
<span>Comments</span><br>
<span>${comments}</span>
</li>
<li>
<span>Downloads</span><br>
<span>${downloads}</span>
</li>
</ul>
    </div>
    `
}