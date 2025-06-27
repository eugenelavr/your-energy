
// <!-- <li class="exercise-card">
// <div class="exercise-header">
// <span class="badge">Workout</span>
// <span class="rating">4.5</span>
// <button class="start-btn">Start ➤</button>
// </div>
// <div class="exercise-content">
// <h3 class="exercise-title">Exercise Title</h3>
// <span class="exercise-icon">icon</span>
// </div>
// <p class="exercise-meta">
// Burned calories: <strong>312 / 3 min</strong><br />
// Body part: <strong>Waist</strong><br />
// Target: <strong>Abs</strong></p>
// </li> -->


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

export const renderPagination = (currentPage, totalPages, action) => {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  if (totalPages <= 1) {
    pagination.style.display = 'none';
    return;
  }
  pagination.style.display = 'flex';

  const pagesToShow = [];

  if (currentPage > 1) pagesToShow.push(currentPage - 1);
  pagesToShow.push(currentPage);
  if (currentPage < totalPages) pagesToShow.push(currentPage + 1);

  pagesToShow.forEach(page => {
    const pageItem = document.createElement('span');
    pageItem.className = 'page-item';
    pageItem.textContent = page;

    if (page === currentPage) {
      pageItem.classList.add('active');
    }

    pageItem.addEventListener('click', () => {
      if (page === currentPage) return;
      action(page);
    });

    pagination.appendChild(pageItem);
  });
};

