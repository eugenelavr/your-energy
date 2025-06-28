
import { exercisesApi } from "../api";
import { renderFilteredExercises } from "../components/render-filtered-exercises";

export const handleFilterClick = (category, filterName) => {
    const filters = {
        muscles: category === 'Muscles' ? filterName : '',
        bodypart: category === 'Body parts' ? filterName : '',
        equipment: category === 'Equipment' ? filterName : '',
      };

return async()=>{
  try {
    const res = await exercisesApi.getExercisesFilteredOrSearched({ filters });
    if (!res || !res.results || res.results.length === 0) {
      console.error('No exercises found for the selected filters.');
      return;
    }
    const exercises = res.results;
    console.log('Filtered exercises:', exercises);
    renderFilteredExercises(
      exercises,
      'filtered-exercises-cards-wrapper',
      'exercises-content'
    );
} catch (error) {
    console.error('Error fetching exercises:', error);
  }
}
}


document
  .querySelector('.exercises-list')
  ?.addEventListener('click', async e => {
    const item = e.target.closest('.filter-item');
    if (!item) return;

    const name = item.querySelector('.filter-label')?.textContent;
    const category = document.querySelector('.active-category')?.textContent;

    if (name && category) {
      const run = handleFilterClick(category, name);
      await run(); // ✅ CALL the returned async function
    }
  });


