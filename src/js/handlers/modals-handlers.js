import { renderExerciseModal } from '../components/exercise-modal.js';
import { refs } from '../const/refs.js';
import { modalsClasses } from '../const/modals-classes.js';
import { toaster } from '../utils/utils.js';
import { exercisesApi } from '../api/exercises.api.js';
import {
  isFavorite,
  addToFavorites,
  removeFromFavorites,
  updateFavoritesDisplay,
} from '../components/favorites.js';
import iconsPath from '../../img/sprite.svg';

async function handleOpenExerciseModal(id) {
  try {
    refs.exerciseModal.classList.add(modalsClasses.IS_OPEN);

    const exercise = await exercisesApi.getExerciseById(id);

    const modal = renderExerciseModal(exercise);
    refs.exerciseModal.innerHTML = modal;
  } catch (error) {
    toaster.showErrorToast(error.message);
  }
}

function updateButtonsBlock(id) {
  const isInFavorites = isFavorite(id);

  const favBtn = isInFavorites
    ? `<button id="remove-from-favorites" class="btn btn-primary">
         Remove favorite
         <svg class="exercise-modal-btn-icon">
           <use href="${iconsPath}#trash"></use>
         </svg>
       </button>`
    : `<button id="add-to-favorites" class="btn btn-primary">
         Add to favorites
         <svg class="exercise-modal-btn-icon">
           <use href="${iconsPath}#icon-heart"></use>
         </svg>
       </button>`;

  const buttonContainer = document.querySelector(
    '.exercise-modal-buttons-block'
  );
  if (buttonContainer) {
    buttonContainer.innerHTML = `
      ${favBtn}
      <button id="give-rating" class="btn btn-secondary">Give a rating</button>
    `;
  }
}

const handleToggleFavorite = async (id, onFavoritesUpdated) => {
  try {
    const isCurrentlyFavorite = isFavorite(id);
    let success = false;

    if (isCurrentlyFavorite) {
      success = removeFromFavorites(id);
      if (success) {
        toaster.showSuccessToast('Exercise removed from favorites!');
      }
    } else {
      // Отримуємо дані вправи для збереження
      try {
        const exerciseData = await exercisesApi.getExerciseById(id);
        success = addToFavorites(id, exerciseData);
        if (success) {
          toaster.showSuccessToast('Exercise added to favorites!');
        }
      } catch (apiError) {
        // Якщо не вдалося отримати дані з API, додаємо тільки ID
        success = addToFavorites(id);
        if (success) {
          toaster.showSuccessToast('Exercise added to favorites!');
        }
      }
    }

    if (success) {
      updateButtonsBlock(id);

      // Оновлюємо відображення favorites якщо знаходимося на сторінці favorites
      if (window.location.pathname.includes('favorites.html')) {
        updateFavoritesDisplay();
      }

      onFavoritesUpdated();
    }
  } catch (error) {
    toaster.showErrorToast(error.message);
  }
};

export { handleOpenExerciseModal, handleToggleFavorite };
