import { exercisesApi } from '../api';
import { refs } from '../const/refs.js';
import { modalsClasses } from '../const/modals-classes.js';
import { renderGiveRatingModal } from '../components/rating-modal';
import { formRatingValidation, toaster } from '../utils/utils.js';
import {
  handleToggleFavorite,
  handleOpenExerciseModal,
} from '../handlers/modals-handlers.js';

const handleFavoriteAction = event => {
  const id = event.target.closest(modalsClasses.EXERCISE_MODAL_CARD).dataset.id;
  handleToggleFavorite(id, () => {
    if (window.location.pathname.includes('favorite.html')) {
      // need add favorite render function for update
    }
  });
};

const handleModalClose = modal => {
  modal.classList.remove(modalsClasses.IS_OPEN);
  document.documentElement.classList.remove('modal-open'); 
  document.body.classList.remove('modal-open');
};

const handleRatingModalOpen = event => {
  const id = event.target.closest(modalsClasses.EXERCISE_MODAL_CARD).dataset.id;
  refs.exerciseModal.classList.remove(modalsClasses.IS_OPEN);
  refs.ratingModal.classList.add(modalsClasses.IS_OPEN);
  refs.ratingModal.innerHTML = renderGiveRatingModal(id);

  refs.ratingBlock = document.querySelector(
    modalsClasses.RATING_MODAL_RATING_BLOCK
  );
  refs.ratingDisplay = document.querySelector(
    modalsClasses.RATING_MODAL_RATING
  );
  initializeRatingBlockListener();
};

const handleExerciseModalEvents = event => {
  if (
    event.target === refs.exerciseModal ||
    event.target.closest(modalsClasses.CLOSE_MODAL_BTN)
  ) {
    handleModalClose(refs.exerciseModal);
    return;
  }

  if (
    event.target.closest(modalsClasses.ADD_TO_FAVORITES) ||
    event.target.closest(modalsClasses.REMOVE_FROM_FAVORITES)
  ) {
    handleFavoriteAction(event);
    return;
  }

  if (event.target.closest(modalsClasses.GIVE_RATING)) {
    handleRatingModalOpen(event);
  }
};

const handleRatingModalEvents = event => {
  if (
    event.target === refs.ratingModal ||
    event.target.closest(modalsClasses.CLOSE_MODAL_BTN)
  ) {
    handleModalClose(refs.ratingModal);
    refs.exerciseModal.classList.add(modalsClasses.IS_OPEN);
  }
};

const setupModalsListeners = () => {
  document.addEventListener('click', event => {
    if (refs.exerciseModal.classList.contains(modalsClasses.IS_OPEN)) {
      handleExerciseModalEvents(event);
    }

    if (refs.ratingModal.classList.contains(modalsClasses.IS_OPEN)) {
      handleRatingModalEvents(event);
    }
  });
};

const updateStarRating = (stars, ratingValue) => {
  stars.forEach((star, index) => {
    const isActive = index < ratingValue;
    star.style.fill = `rgba(var(--rgba-${isActive ? 'orange' : 'light'}), ${isActive ? 1 : 0.2})`;
  });
};
const initializeRatingBlockListener = () => {
  refs.ratingBlock.addEventListener('change', ({ target }) => {
    if (target.name !== 'rating') return;

    const ratingValue = parseInt(target.value, 10);
    refs.ratingDisplay.textContent = ratingValue.toFixed(1);

    const stars = refs.ratingBlock.querySelectorAll(
      modalsClasses.RATING_MODAL_RATING_ICON
    );
    updateStarRating(stars, ratingValue);
  });
};

function setupOpenExerciseModalLister() {
  document.addEventListener('click', event => {

    if (event.target.closest(modalsClasses.OPEN_EXERCISE_MODAL)) {
      const id = event.target.closest(modalsClasses.EXERCISE_ITEM_FOR_DATA_ID)
        .dataset.id;

      handleOpenExerciseModal(id);
    }
  });
}

const handleRatingSubmit = async form => {
  const formData = new FormData(form);
  const ratingSelected = form.querySelector('input[name="rating"]:checked');
  const email = formData.get('email');
  const comment = formData.get('comment');

  if (!formRatingValidation(ratingSelected, email, comment)) return;

  const ratingData = {
    rate: Number(ratingSelected.value),
    email,
    review: comment,
  };

  try {
    await exercisesApi.updateRating(form.dataset.id, ratingData);
    refs.ratingModal.classList.remove(modalsClasses.IS_OPEN);
    toaster.showSuccessToast('Rating submitted successfully!');
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'An unknown error occurred';
    toaster.showErrorToast(errorMessage);
  }
};

const setupGiveRatingListener = () => {
  document.addEventListener('submit', async event => {
    event.preventDefault();
    if (event.target.classList.contains(modalsClasses.RATING_MODAL_FORM)) {
      await handleRatingSubmit(event.target);
    }
  });
};
export {
  setupModalsListeners,
  setupOpenExerciseModalLister,
  setupGiveRatingListener,
};
