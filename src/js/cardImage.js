const galleryEl = document.querySelector('.gallery');

export default function cardImage(hit) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = hit;
  const imageCard = `<div class="photo-card" height="290">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
		${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
		${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
		${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
		${downloads}
    </p>
  </div>
</div>`;
  galleryEl.insertAdjacentHTML('beforeend', imageCard);
}
