import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import CardImageApi from './js/fetchPhoto';
import cardImage from './js/cardImage';

const form = document.getElementById('search-form');
const searchQuery = document.querySelector('[name="searchQuery"]');
const loadMore = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

form.addEventListener('submit', onSearch);

loadMore.addEventListener('click', onLoadMore);
loadMore.style.display = 'none';

const cardImageApi = new CardImageApi();

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

window.scrollBy({
  top: 290,
  behavior: 'smooth',
});

function onSearch(e) {
  e.preventDefault();

  if (cardImageApi === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  cardImageApi.query = searchQuery.value;
  cardImageApi.resetPage();
  cardImageApi
    .fetchPhoto()
    .then(data => {
      clearGallery();
      renderCardList(data.hits);
      lightbox.refresh();
      if (data.totalHits > cardImageApi.perPage) {
        loadMore.style.display = 'block';
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      if (data.totalHits > 0 && data.totalHits < cardImageApi.perPage) {
        loadMore.style.display = 'none';
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      if (data.hits.length === 0) {
        loadMore.style.display = 'none';
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(error => console.log(error));
}

function onLoadMore() {
  cardImageApi
    .fetchPhoto()
    .then(data => {
      renderCardList(data.hits);
      lightbox.refresh();
      if (data.hits.length > 0 && data.hits.length < cardImageApi.perPage) {
        loadMore.style.display = 'none';
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}

function renderCardList(hits) {
  return hits.map(hit => {
    cardImage(hit);
  });
}

function clearGallery() {
  galleryEl.innerHTML = '';
}
