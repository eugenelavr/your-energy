import { refs } from './const/refs';
import { modalsClasses } from './const/modals-classes.js';
import {
  setupModalsListeners,
  setupOpenExerciseModalLister,
  setupGiveRatingListener,
} from './listeners/modals-listeners.js';

import { handleQuoteOfDay } from './handlers/static-handlers.js';

document.addEventListener('DOMContentLoaded', () => {
  setupModalsListeners();
  setupOpenExerciseModalLister();
  setupGiveRatingListener();
  handleQuoteOfDay();
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
