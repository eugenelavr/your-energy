import { handleFilterClick } from "../handlers/exercises-filtered-handler";


export const renderExerciseList = exercises => {
  const list = document.querySelector('.exercises-list');
  list.innerHTML = '';

  exercises.forEach(ex => {
    const li = document.createElement('li');

    li.className = 'exercise-card';
    li.innerHTML = `
            <div class="exercise-header">
              <span class="badge">Workout</span>
              <span class="rating">${ex.rating.toFixed(1)}</span>
              <button class="start-btn">Start ➤</button>
            </div>
            <div class="exercise-content">
              <h3 class="exercise-title">${ex.name}</h3>
              <span class="exercise-icon">
                <img src="${ex.gifUrl}" alt="${ex.name}" width="48" height="48" />
              </span>
            </div>
            <p class="exercise-meta">
              Burned calories: <strong>${ex.burnedCalories} / ${ex.time} min</strong><br />
              Body part: <strong>${ex.bodyPart}</strong><br />
              Target: <strong>${ex.target}</strong>
            </p>
          `;
    list.appendChild(li);
  });
};