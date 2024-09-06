export function addLoader(gallery) {
  const loaderHTML = '<span class="loader">Loading...</span>';
  gallery.insertAdjacentHTML('afterbegin', loaderHTML);
}
removeLoader();

export function removeLoader() {
  try {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.remove();
    }
  } catch (error) {
    console.error('Ошибка при удалении загрузчика:', error);
    iziToast.error({
      title: 'Error',
      message: `Ошибка: ${error.message}`,
      position: 'topRight',
    });
  }
}

export function markup(data) {
  return data.hits
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item hvr-grow">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
              loading="lazy"
            />
          </a>
          <ul class="img-content-wrapper">
            <li class="img-content-descr">Likes<span>${likes}</span></li>
            <li class="img-content-descr">Views<span>${views}</span></li>
            <li class="img-content-descr">Comments<span>${comments}</span></li>
            <li class="img-content-descr">Downloads<span>${downloads}</span></li>
          </ul>
        </li>
      `
    )
    .join(''); 

}


