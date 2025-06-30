import { refs } from './const/refs';
import { modalsClasses } from './const/modals-classes.js';
import {
  setupModalsListeners,
  setupOpenExerciseModalLister,
  setupGiveRatingListener,
} from './listeners/modals-listeners.js';
import { subscribeFormListener } from './listeners/subscribeFormListener.js';

import { handleExercises } from './components/exercises.js';
import { handleQuoteOfDay } from './handlers/static-handlers.js';
import { initBurgerMenu } from './burger-menu.js';
import { handleFilterClick } from './handlers/exercises-filtered-handler.js';
import { headerInit } from './listeners/header-listener.js';

document.addEventListener('DOMContentLoaded', () => {
  setupModalsListeners();
  setupOpenExerciseModalLister();
  setupGiveRatingListener();
  subscribeFormListener();
  handleQuoteOfDay();
  handleExercises();
  handleFilterClick();
  // renderCategories();
  initBurgerMenu();
  headerInit();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (refs.exerciseModal.classList.contains(modalsClasses.IS_OPEN)) {
      refs.exerciseModal.classList.remove(modalsClasses.IS_OPEN);
    }

    if (refs.ratingModal.classList.contains(modalsClasses.IS_OPEN)) {
      refs.ratingModal.classList.remove(modalsClasses.IS_OPEN);
      refs.exerciseModal.classList.add(modalsClasses.IS_OPEN);
    }
  }
});

const favoriteExercises = [
  {
    _id: '64f389465ae26083f39b17a2',
    title: 'Air bike',
    burnedCalories: 312,
    time: '3 min',
    bodyPart: 'Waist',
    target: 'Abs',
    favorite: true,
  },
  {
    _id: '64f389465ae26083f39b17a3',
    title: '3/4 sit-up',
    burnedCalories: 220,
    time: '3 min',
    bodyPart: 'Waist',
    target: 'Abs',
    favorite: true,
  },
  {
    _id: '64f389465ae26083f39b17a4',
    title: '45° side ben',
    burnedCalories: 323,
    time: '3 min',
    bodyPart: 'Waist',
    target: 'Abs',
    favorite: true,
  },
  {
    _id: '64f389465ae26083f39b17a5',
    title: 'Barbell reverse preacher curl',
    burnedCalories: 153,
    time: '3 min',
    bodyPart: 'Waist',
    target: 'Biceps',
    favorite: true,
  },
  {
    _id: '64f389465ae26083f39b17a6',
    title: 'Barbell rollerout',
    burnedCalories: 87,
    time: '3 min',
    bodyPart: 'Waist',
    target: 'Abs',
    favorite: true,
  },
  {
    _id: '64f389465ae26083f39b17a7',
    title: 'Barbell side split squat v. 2',
    burnedCalories: 60,
    time: '3 min',
    bodyPart: 'Waist',
    target: 'Quads',
    favorite: true,
  },
];


favoriteExercises.forEach(ex => {
  localStorage.setItem(ex.title, JSON.stringify(ex));
});


const favoriteIds = favoriteExercises.map(ex => ex._id);
localStorage.setItem('favorites', JSON.stringify(favoriteIds));

document.addEventListener('DOMContentLoaded', function () {
  const favoritesList = document.querySelector('.favorites__list');
  const emptyMessage = document.querySelector( '.favorites__empty' );
  const favBody = emptyMessage.closest( '.favorites__body' );
  

  const favorites = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    try {
      const item = JSON.parse(localStorage.getItem(key));
      if (item && item.favorite === true) {
        favorites.push(item);
      }
    } catch (err) {
      console.error(err.message);
      
    }
  }

  if (favorites.length === 0) {
    emptyMessage.classList.remove('is-hidden');
    favoritesList.classList.add( 'is-hidden' );
    favBody.classList.remove('center');
    return;
  }

  emptyMessage.classList.add('is-hidden');
  favoritesList.classList.remove( 'is-hidden' );
  

  favorites.forEach(item => {
    const li = document.createElement('li');
    li.className = 'favorites__item';
    li.innerHTML = `
      <div class="favorites__card card exercise-item" data-id="${item._id}">
        <div class="card__header">
          <div class="card__workout">
            <div class="card__label">WORKOUT</div>
            <button type="button" class="card__delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="M10.6667 4.00004V3.46671C10.6667 2.71997 10.6667 2.3466 10.5213 2.06139C10.3935 1.8105 10.1895 1.60653 9.93865 1.4787C9.65344 1.33337 9.28007 1.33337 8.53333 1.33337H7.46667C6.71993 1.33337 6.34656 1.33337 6.06135 1.4787C5.81046 1.60653 5.60649 1.8105 5.47866 2.06139C5.33333 2.3466 5.33333 2.71997 5.33333 3.46671V4.00004M6.66667 7.66671V11M9.33333 7.66671V11M2 4.00004H14M12.6667 4.00004V11.4667C12.6667 12.5868 12.6667 13.1469 12.4487 13.5747C12.2569 13.951 11.951 14.257 11.5746 14.4487C11.1468 14.6667 10.5868 14.6667 9.46667 14.6667H6.53333C5.41323 14.6667 4.85318 14.6667 4.42535 14.4487C4.04903 14.257 3.74307 13.951 3.55132 13.5747C3.33333 13.1469 3.33333 12.5868 3.33333 11.4667V4.00004"
                      stroke="#242424" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <button type="button" class="card__start">
            Start
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="M7.5 14L14 7.5M14 7.5L7.5 1M14 7.5H1" stroke="#242424" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </i>
          </button>
        </div>
        <div class="card__body">
          <div class="card__exercise">
            <div class="card__exercise-logo">
              <img src="img/favorites/quote.svg" alt="logo" />
            </div>
            <p>${item.title}</p>
          </div>
          <ul class="card__list">
            <li class="card__list-item">
              <p>Burned calories:</p>
              <span>${item.burnedCalories} / ${item.time}</span>
            </li>
            <li class="card__list-item">
              <p>Body part:</p>
              <span>${item.bodyPart}</span>
            </li>
            <li class="card__list-item">
              <p>Target</p>
              <span>${item.target}</span>
            </li>
          </ul>
        </div>
      </div>
    `;
    favoritesList.appendChild(li);
    li.querySelector('.card__delete').addEventListener('click', function () {
       
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const updatedFavorites = favorites.filter(favId => favId !== item._id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
 
      localStorage.removeItem(item.title);

      li.remove();

      if (favoritesList.children.length === 0) {
        favoritesList.classList.add('is-hidden');
        emptyMessage.classList.remove( 'is-hidden' );
        favBody.classList.add('center')
      }
    });
  });
});