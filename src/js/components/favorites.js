// Утиліти для управління обраними вправами
import iconsPath from '../../img/sprite.svg';

/**
 * Отримує список ID обраних вправ з localStorage
 */
export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  } catch (error) {
    console.error('Error parsing favorites from localStorage:', error);
    return [];
  }
}

/**
 * Зберігає список ID обраних вправ в localStorage
 */
export function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

/**
 * Перевіряє чи вправа є в обраних
 */
export function isFavorite(exerciseId) {
  const favorites = getFavorites();
  return favorites.includes(exerciseId);
}

/**
 * Додає вправу до обраних
 */
export function addToFavorites(exerciseId, exerciseData = null) {
  const favorites = getFavorites();

  if (!favorites.includes(exerciseId)) {
    favorites.push(exerciseId);
    saveFavorites(favorites);

    // Якщо передані дані вправи, зберігаємо їх окремо для швидкого доступу
    if (exerciseData) {
      localStorage.setItem(
        `exercise_${exerciseId}`,
        JSON.stringify({
          ...exerciseData,
          favorite: true,
        })
      );
    }

    return true;
  }
  return false;
}

/**
 * Видаляє вправу з обраних
 */
export function removeFromFavorites(exerciseId) {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(id => id !== exerciseId);

  if (updatedFavorites.length !== favorites.length) {
    saveFavorites(updatedFavorites);

    // Видаляємо збережені дані вправи
    localStorage.removeItem(`exercise_${exerciseId}`);

    return true;
  }
  return false;
}

/**
 * Отримує дані обраної вправи з localStorage
 */
export function getFavoriteExerciseData(exerciseId) {
  try {
    const data = localStorage.getItem(`exercise_${exerciseId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error parsing exercise data from localStorage:', error);
    return null;
  }
}

/**
 * Оновлює відображення обраних на сторінці favorites
 */
export function updateFavoritesDisplay() {
  const favoritesList = document.querySelector('.favorites__list');
  const emptyMessage = document.querySelector('.favorites__empty');

  if (!favoritesList || !emptyMessage) return;

  const favBody = emptyMessage.closest('.favorites__body');
  const favorites = getFavorites();

  // Очищуємо поточний список
  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    emptyMessage.classList.remove('is-hidden');
    favoritesList.classList.add('is-hidden');
    favBody.classList.add('center');
    return;
  }

  emptyMessage.classList.add('is-hidden');
  favoritesList.classList.remove('is-hidden');
  favBody.classList.remove('center');

  // Відображаємо кожну обрану вправу
  favorites.forEach(exerciseId => {
    const exerciseData = getFavoriteExerciseData(exerciseId);
    if (exerciseData) {
      renderFavoriteExercise(exerciseData, favoritesList);
    }
  });
}

/**
 * Рендерить одну обрану вправу в списку
 */
function renderFavoriteExercise(exercise, container) {
  const li = document.createElement('li');
  li.className = 'favorites__item';
  li.innerHTML = `
      <div class="favorites__card card exercise-item" data-id="${exercise._id}">
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
            <svg class="card__exercise-logo">
              <use href="${iconsPath}#running-stick-figure-border"></use>
            </svg>
            <p>${exercise.name}</p>
          </div>
          <ul class="card__list">
            <li class="card__list-item">
              <p>Burned calories:</p>
              <span>${exercise.burnedCalories} / ${exercise.time} min</span>
            </li>
            <li class="card__list-item">
              <p>Body part:</p>
              <span>${exercise.bodyPart}</span>
            </li>
            <li class="card__list-item">
              <p>Target</p>
              <span>${exercise.target}</span>
            </li>
          </ul>
        </div>
      </div>
    `;

  container.appendChild(li);

  // Додаємо listener для кнопки видалення
  li.querySelector('.card__delete').addEventListener('click', function () {
    removeFromFavorites(exercise._id);
    updateFavoritesDisplay();
  });
}
