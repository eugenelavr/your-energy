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
