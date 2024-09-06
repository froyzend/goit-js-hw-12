import axios from 'axios';

const apiKey = '45704413-78352b289562c0261d4e7c072';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const perPage = 15; // кількість об'єктів на сторінку

export async function getGalleryData(queryValue, page = 1) {
  try {
    const response = await axios.get('', {
      params: {
        key: apiKey,
        q: queryValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page, // параметр сторінки
        per_page: perPage, // кількість об'єктів на сторінку
      }
    });
    console.log('Response data:', response.data); // Для отладки
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    iziToast.error({
      title: 'Error',
      message: `Ошибка: ${error.message}`,
      position: 'topRight',
    });
    throw error;
  }
}
