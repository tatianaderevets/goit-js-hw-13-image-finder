import './styles.css';
import ApiService from './apiService';
import ImageTpl from './templates/image-list.hbs';

const apiService = new ApiService();


const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  showMoreBtn:document.querySelector('.show-more-btn'),
  clearBtn:document.querySelector('.clear-btn'),
}

refs.showMoreBtn.style.display = "none";
refs.clearBtn.style.display = "none";

refs.searchForm.addEventListener('submit', onSearch);
refs.showMoreBtn.addEventListener('click', OnshowMoreBtn);
refs.clearBtn.addEventListener('click', clearGallery)


function onSearch(e) {
    e.preventDefault();
    
    apiService.query = e.currentTarget.elements.query.value;
    if (apiService.query === '') {
        return alert("Please, enter your request");
    }
    apiService.resetPage();
    apiService.fetchImages().then(hits => {
        clearGallery();
        appendImagesMarkup(hits);
        refs.showMoreBtn.style.display = "block";
        refs.clearBtn.style.display = "block";


    });
}
        
function OnshowMoreBtn() {
    apiService.fetchImages().then(appendImagesMarkup);
}

function appendImagesMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', ImageTpl(hits));
}

function clearGallery() {
    refs.showMoreBtn.style.display = "none";
    refs.clearBtn.style.display = "none";
    refs.gallery.innerHTML = '';
    refs.searchForm.elements[0].value = ''
}


