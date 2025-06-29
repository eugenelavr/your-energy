import iconsPath from '../../img/sprite.svg';
import { handleOpenExerciseModal } from '../handlers/modals-handlers';

const iconsConfig = {
  runningStickFigure: {
    svgClass: 'exercise-icon',
    path: `${iconsPath}#running-stick-figure-border`,
    fill: 'var(--primary)',
  },
  arrow: {
    svgClass: 'start-exercise-icon',
    path: `${iconsPath}#arrow`,
    fill: 'var(--primary)',
  },
  star: {
    svgClass: 'rating-icon',
    path: `${iconsPath}#icon-star`,
    fill: 'var(--gold)',
  },
};

export const renderFilteredExercises = exercises => {
  const list = document.querySelector(`.filtered-exercises-list`);
  if (!list) {
    console.error('List element not found');
    return;
  }

  list.innerHTML = '';

  const newlist = exercises.forEach(ex => {
    const li = document.createElement('li');
    li.className = 'filtered-exercise-card';
    li.innerHTML = `
            <div class="exercise-header">
              <span class="badge">Workout</span>
              <p class="rating">${ex.rating.toFixed(1)}</p>
            <span class="rating">
  <svg class="${iconsConfig.star.svgClass}" fill="${iconsConfig.star.fill}" width="16" height="16">
    <use href="${iconsConfig.star.path}"></use>
  </svg>
</span>
  <button class="start-btn">Start
              <span class='start-exercise-icon'>
              <svg class="${iconsConfig.arrow.svgClass}" fill="${iconsConfig.arrow.fill}" width="16" height="16">
              <use href="${iconsConfig.arrow.path}"></use>
              </svg></span>
              </button>
            </div>
            <div class="exercise-content">
            
              <span >
             <svg class="${iconsConfig.runningStickFigure.svgClass}" width="24" height="24">
              <use href="${iconsPath}#running-stick-figure-border"></use>
              </svg>
              </span>
              <h3 class="exercise-title">${ex.name}</h3>
            </div>
            <div class="exercise-meta">
              <p >Burned calories: <span class="meta-span">${ex.burnedCalories}/${ex.time} min</span>
              </p>
              <p>Body part: <span class="meta-span">${ex.bodyPart}</span></p>
              <p>Target: <span class="meta-span">${ex.target}</span></p>
            </div>
          `;
    li.addEventListener('click', () => handleOpenExerciseModal(ex._id));
    list.appendChild(li);
  });
};
