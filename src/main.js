import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    form: document.querySelector('#form'),
    input: document.querySelector('.input'),
    container: document.querySelector('.container'),
    loading: document.querySelector('.loading')
}

const lightbox = new SimpleLightbox('.container a', { /* options */ });

refs.form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    const query = form.elements.query.value;

    if (!query.trim()) {
        return;
    }

    refs.loading.style.display = 'block';

    getPhotos(query).then(handlePhotos).catch(onFetchError).finally(() => {
        form.reset();

        refs.loading.style.display = 'none';
    });

})
    
const API_KEY = "42114323-50c2b50fedad4076dc7ba42b5";
const BASE_URL = "https://pixabay.com/api/"; 


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
        refs.container.innerHTML = ''
        return onEmptyResults();
    } 

    renderPhotos(photos);

    lightbox.refresh()
}

function renderPhotos(photos) {
    const photosHtml = photos.map((photo) =>
        getPhotoHtml(photo)
    ).join(" ");

    console.log(photosHtml);

    refs.container.innerHTML = photosHtml;
}

function getPhotoHtml({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
    return `
    <a href="${largeImageURL}">
    <div class="card">
    <img src="${webformatURL}" alt="${tags}">
<ul class="photo_details">
<li>
<span class="photo_details_paragraph">Likes</span><br>
<span>${likes}</span>
</li>
<li>
<span class="photo_details_paragraph">Views</span><br>
<span>${views}</span>
</li>
<li>
<span class="photo_details_paragraph">Comments</span><br>
<span>${comments}</span>
</li>
<li>
<span class="photo_details_paragraph">Downloads</span><br>
<span>${downloads}</span>
</li>
</ul>
    </div>
    </a>
    `
}

