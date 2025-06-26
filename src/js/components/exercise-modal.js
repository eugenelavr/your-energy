import iconsPath from '../../img/sprite.svg';

function renderExerciseModal({
  _id,
  name,
  target,
  bodyPart,
  popularity,
  time,
  burnedCalories,
  rating,
  description,
  gifUrl,
  equipment,
}) {
  const maxStars = 5;
  const stars = Array.from({ length: maxStars }, (_, index) => {
    const isRated = index < Math.floor(rating);
    const ratedClass = isRated ? 'rated' : '';
    return `<svg class="exercise-modal-rating-icon ${ratedClass}">
              <use href="${iconsPath}#icon-star"></use>
            </svg>`;
  }).join('');

  const isInFavorites = localStorage.getItem('favorites')?.includes(_id);

  return `<div data-id=${_id} class="exercise-modal-card">
            <button class="close-modal-btn">
              <svg class="close-modal-icon">
                <use href="${iconsPath}#icon-close"></use>
              </svg>
            </button>
            <div class="exercise-gif-wrapper">
              <img
                class="exercise-gif"
                src=${gifUrl}
                alt="alt text from backend here"
              />
            </div>
            <div class="exercise-modal-overview">
              <div>
                <h2 class="exercise-modal-title">${name}</h2>
                <div class="exercise-modal-rating-block">
                  <p class="exercise-modal-rating">${rating}</p>
                  ${stars}
                </div>
              </div>
              <div class="exercise-modal-info-block">
                <div class="exercise-modal-info">
                  <p class="exercise-modal-info-title">Target</p>
                  <p class="exercise-modal-info-descr">${target}</p>
                </div>
                <div class="exercise-modal-info">
                  <p class="exercise-modal-info-title">Body Part</p>
                  <p class="exercise-modal-info-descr">${bodyPart}</p>
                </div>
                <div class="exercise-modal-info">
                  <p class="exercise-modal-info-title">Equipment</p>
                  <p class="exercise-modal-info-descr">${equipment}</p>
                </div>
                <div class="exercise-modal-info">
                  <p class="exercise-modal-info-title">Popular</p>
                  <p class="exercise-modal-info-descr">${popularity}</p>
                </div>
                <div class="exercise-modal-info">
                  <p class="exercise-modal-info-title">Burned Calories</p>
                  <p class="exercise-modal-info-descr">${burnedCalories}/${time} min</p>
                </div>
              </div>
              <div class="exercise-modal-descr">${description}</div>
              <div class="exercise-modal-buttons-block">
              ${
                isInFavorites
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
                    </button>`
              }
                <button id="give-rating" class="btn btn-secondary">Give a rating</button>
              </div>
            </div>
          </div>
          `;
}

export { renderExerciseModal };
