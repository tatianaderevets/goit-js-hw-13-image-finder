const API_KEY = '21313596-53d18e4a7f22f2d08b7d5fbe5'
const BASE_URL = 'https://pixabay.com/api'
export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }


    fetchImages() {
    console.log('До запроса',this);
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
  return fetch(url)
    .then(response => response.json())
      .then(data => {
          console.log(data);
          this.incrementPage();
          return data.hits;
    });
    }
    incrementPage() {
        this.page += 1;
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