import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const infoEl = document.querySelector('.cat-info');
const loaderText = document.querySelector('.loader');

// loaderText.classList.add("invisible");

fillList(); 

function fillList() {
  
  // loaderText.classList.remove("invisible");
  fetchBreeds()
    .then((data) => {
      const breedList = data.map((item) => ({ name: item.name, id: item.id }));
      selectEl.insertAdjacentHTML('afterbegin', breedList.map(({ id, name }) =>
        `<option value = "${id}">${name}</option>`)
        .join(''));
      selectEl.classList.remove('invisible');
       loaderText.classList.add('invisible');
    })
    .catch(() =>
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
  );
};


selectEl.addEventListener('change', () => {

  loaderText.classList.remove("invisible");

  clearCatCard();
    const value = selectEl.options[selectEl.selectedIndex].value;
    const name = selectEl.options[selectEl.selectedIndex].text;
    
  fetchCatByBreed(value)
    .then(catData => {
      loaderText.classList.add("invisible");
      createCatCard(catData, name); 
  })
    .catch(() => {
      loaderText.classList.add("invisible");
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
    })
    
});

function createCatCard(cats, title) {
  
  const cat = cats[0];

  const markup = `
    <div>
    <img src="${cat.url}" class = "cat-img" alt="cat" width="600">
    </div>
    <div>
    <h2>${title}</h2>
    <p> ${cat.breeds[0].description}</p>
    <h3>Temperamnet</h3>
    <p class ="cat-temp"> ${cat.breeds[0].temperament}</p> 
    </div> 
    `;
    infoEl.insertAdjacentHTML('afterbegin', markup);
  };

function clearCatCard() {
  infoEl.innerHTML = '';
};

