

export const renderFilteredExercises= (exercises, classToShow, classToHide) => {
// @param {Array} exercises - Array of exercise objects to render
// @param {string} classToShow - Class to show the filtered exercises (e.g., 'filtered-exercises-cards-wrapper')
// @param {string} classToHide - Class to hide the original exercises content (e.g., 'exercises-content')
 
  const contentToShow = document.querySelector(`.${classToShow}`);
  const contentToHide = document.querySelector(`.${classToHide}`);

  console.log(contentToHide, contentToShow);

  contentToHide.classList.add('hide');
  contentToShow.classList.remove('hide');

  const list = document.querySelector(`.${classToShow} .filtered-exercises-list`);
  list.innerHTML = '';

  exercises.forEach(ex => {
    const li = document.createElement('li');

    li.className = 'filtered-exercise-card';
    li.innerHTML = `
            <div class="exercise-header">
              <span class="badge">Workout</span>
              <span class="rating">${ex.rating.toFixed(1)}</span>
              <button class="start-btn">Start ➤</button>
            </div>
            <div class="exercise-content">
            
              <span class="exercise-icon">
                <img src="${ex.gifUrl}" alt="${ex.name}" width="48" height="48" />
              </span>  
              <h3 class="exercise-title">${ex.name}</h3>
            </div>
            <div class="exercise-meta">
              <p >Burned calories: <span class="meta-span">${ex.burnedCalories} / ${ex.time} min</span>
              </p>
              <p>Body part: <span class="meta-span">${ex.bodyPart}</span></p>
              <p>Target: <span class="meta-span">${ex.target}</span></p>
            </div>
          `;
    list.appendChild(li);
  });
};


//   const item = e.target.closest('.filter-item');
//   if (!item) return;
// 
//   const name = item.querySelector('.filter-label')?.textContent;
//   const category = document.querySelector('.active-category')?.textContent;
// 
//   if (name && category) {
//     const filters = {
//       muscles: category === 'Muscles' ? name : '',
//       bodypart: category === 'Body parts' ? name : '',
//       equipment: category === 'Equipment' ? name : '',
//     };
// 
//     exercisesApi.getExercises({ filters }).then(res => {
//       renderExerciseList(res.results);
//     });
//   }
// });