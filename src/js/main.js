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
import { updateFavoritesDisplay } from './components/favorites.js';

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

// Додатковий listener для оновлення favorites на сторінці favorites
document.addEventListener('DOMContentLoaded', function () {
  // Оновлюємо відображення favorites якщо знаходимося на сторінці favorites
  if (window.location.pathname.includes('favorites.html')) {
    updateFavoritesDisplay();
  }
});
