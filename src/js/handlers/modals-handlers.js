import { renderExerciseModal } from '../components/exercise-modal.js';
import { refs } from '../const/refs.js';
import { modalsClasses } from '../const/modals-classes.js';
import { toaster } from '../utils/utils.js';
import { exercisesApi } from '../api/exercises.api.js';
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
  const isInFavorites = localStorage.getItem('favorites')?.includes(id);

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

const handleToggleFavorite = (id, onFavoritesUpdated) => {
  try {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.includes(id);

    const updatedFavorites = isFavorite
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    toaster.showSuccessToast(
      `Exercise ${isFavorite ? 'removed from' : 'added to'} favorites!`
    );

    updateButtonsBlock(id);
    onFavoritesUpdated();
  } catch (error) {
    toaster.showErrorToast(error.message);
  }
};

export { handleOpenExerciseModal, handleToggleFavorite };
