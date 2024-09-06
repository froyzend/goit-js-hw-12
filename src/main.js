import { getGalleryData } from './js/pixabay-api';
import { addLoader, removeLoader, markup } from './js/render-functions';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = '';
let searchValue = '';
let currentPage = 1;

form.addEventListener('submit', onSubmitForm);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmitForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { searchQuery } = Object.fromEntries(formData.entries());
  searchValue = searchQuery.trim();

  if (!searchValue) {
    iziToast.error({
      title: 'Error',
      message: 'The search query is empty.',
      position: 'topRight',
    });
    return;
  }

  gallery.innerHTML = '';
  currentPage = 1; 
  addLoader(gallery); 
  loadMoreBtn.classList.add('is-hidden'); 

  // Проверяем и уничтожаем lightbox, только если он был инициализирован
  if (lightbox && lightbox instanceof SimpleLightbox) {
    lightbox.destroy();
    lightbox = null; // Сбрасываем значение
  }

  fetchGalleryData();
}

async function fetchGalleryData() {
  try {
    const data = await getGalleryData(searchValue, currentPage);
    if (data.hits.length === 0) {
      iziToast.info({
        position: 'topRight',
        title: 'Info',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    const galleryMarkup = markup(data);
    gallery.insertAdjacentHTML('beforeend', galleryMarkup);

   
   if (!lightbox) {
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
} else {
  lightbox.refresh();
}

    // 15 img отображается показываем кнопку Load More
    if (data.hits.length === 15) {
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      loadMoreBtn.classList.add('is-hidden'); // прячем кнопку
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Error: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    removeLoader(); 
  }
 

}

function onLoadMore() {
  currentPage += 1; 
  addLoader(gallery); 
  fetchGalleryData().then(() => {
    const galleryItem = document.querySelector('.gallery-item');
    
    if (galleryItem) {
      const cardHeight = galleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 3,
        behavior: 'smooth' 
      });
    }
  });
}
