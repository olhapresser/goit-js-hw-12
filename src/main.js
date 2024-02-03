import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const PIXABAY_API_KEY = '42114323-50c2b50fedad4076dc7ba42b5';
const BASE_URL = 'https://pixabay.com';
const DEFAULT_PER_PAGE = 15;

const PIXABAY_BASE_API = axios.create({
    baseURL: BASE_URL,
});

const refs = {
    form: document.querySelector('#form'),
    input: document.querySelector('.input'),
    container: document.querySelector('.container'),
    loading: document.querySelector('.loading'),
    loadMore: document.querySelector('#load-more'),
};

const lightbox = new SimpleLightbox('.container a');

let page = 1;
let lastQuery = '';
let allPhotos = [];

refs.form.addEventListener('submit', e => {
    e.preventDefault(e);

    const query = getCurrentQuery();

    if (!query.trim()) {
        return;
    }

    resetQueryState();
    clearContainer();

    lastQuery = query;

    handleQuerySearch(query, page);
});

refs.loadMore.addEventListener('click', () => {
    if (!lastQuery.trim()) {
        return;
    }

    page = page + 1;

    handleQuerySearch(lastQuery, page);
});

async function handleQuerySearch(query, page) {
    setLoadingVisibility(true);
    setLoadMoreVisibility(false);

    let showMore = true;

    try {
        showMore = await handlePhotos(query, page);
    } catch (e) {
        onFetchError();
    }

    setLoadingVisibility(false);
    setLoadMoreVisibility(showMore);

    form.reset();
}

async function handlePhotos(query, page) {
    const { photos, total } = await getPhotos(query, page);

    allPhotos.push(...photos);

    if (photos.length === 0) {
        clearContainer();
        onEmptyResults();
        return false;
    }

    appendPhotos(photos);

    if (page !== 1) {
        const height = getPhotoHeight();
        window.scrollBy({
            top: height * 2,
            behavior: 'smooth',
        });
    }

    if (total === allPhotos.length) {
        if (page !== 1) {
            onLastCollection();
        }

        return false;
    }

    lightbox.refresh();

    return true;
}

async function getPhotos(query, page) {
    const config = getPixabayPhotosQueryConfig(query, page);

    const response = await PIXABAY_BASE_API.get('api/', config);

    return {
        photos: response.data.hits,
        total: response.data.totalHits,
    };
}

function getPixabayPhotosQueryConfig(query, page = 1) {
    return {
        params: {
            key: PIXABAY_API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            q: query,
            per_page: DEFAULT_PER_PAGE,
            page,
        },
    };
}

function onFetchError() {
    iziToast.error({
        title: 'Sorry, something went wrong.',
    });
}

function onLastCollection() {
    iziToast.info({
        title: "We're sorry, but you've reached the end of search results.",
    });
}

function onEmptyResults() {
    iziToast.error({
        title: 'Sorry, there are no images matching your search query. Please try again!',
    });
}

function appendPhotos(photos) {
    const photoNodes = photos.map(getPhotoNode);

    refs.container.append(...photoNodes);
}

function getPhotoNode({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
}) {
    const photoNode = document.createElement('a');

    photoNode.href = largeImageURL;

    photoNode.innerHTML = `
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
    `;

    return photoNode;
}

function setLoadingVisibility(isLoading) {
    setNodeVisibility(refs.loading, isLoading);
}

function setLoadMoreVisibility(showLoadMore) {
    setNodeVisibility(refs.loadMore, showLoadMore);
}

function setNodeVisibility(node, visibility) {
    if (visibility) {
        node.style.display = 'block';
        return;
    }

    node.style.display = 'none';
}

function getPhotoHeight() {
    const photoNode = document.querySelector('.card');

    return photoNode.getBoundingClientRect().height;
}

function getCurrentQuery() {
    return form.elements.query.value;
}

function clearContainer() {
    refs.container.innerHTML = '';
}

function resetQueryState() {
    lastQuery = '';
    page = 1;
    allPhotos = [];
}
