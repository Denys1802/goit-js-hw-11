const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '?key=33053445-8e719516e42e334ba5c285b92';

export default class CardImageApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchPhoto() {
    const params = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`;
    try {
      const response = await axios.get(
        `${BASE_URL}${KEY}&q=${this.searchQuery}${params}`
      );
      this.page += 1;
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
