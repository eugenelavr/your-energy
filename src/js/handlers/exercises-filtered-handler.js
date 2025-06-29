
import { exercisesApi } from "../api";
import { renderFilteredExercises } from "../components/render-filtered-exercises";

export const handleFilterClick = (category, filterName, page, limit = 10) => {
    const filters = {
        muscles: category === 'Muscles' ? filterName : '',
        bodypart: category === 'Body parts' ? filterName : '',
        equipment: category === 'Equipment' ? filterName : '',
      };

return async()=>{
  try {
    const res = await exercisesApi.getExercisesFilteredOrSearched({ filters, page, limit });
    if (!res || !res.results || res.results.length === 0) {
      console.error('No exercises found for the selected filters.');
      return;
    }
    const exercises = res.results;
    renderFilteredExercises(
      exercises,
      'filtered-exercises-cards-wrapper',
      'exercises-content'
    );
    renderFilteredExercisesPagination(
      res.totalPages,
        res.currentPage,
        category,
        filterName
    );
  } catch (error) {
    console.error('Error fetching filtered exercises:', error);
}
}};;




function renderFilteredExercisesPagination(
  totalPages,
  currentPage,
  category,
  filterName
) {
  const paginationContainer = document.querySelector('.filtered-pagination');
  if (!paginationContainer) return;

  paginationContainer.innerHTML = '';
  const maxVisible = 5;
  if (totalPages <= 1) {
    paginationContainer.style.display = 'none';
    return;
  }
  const createBtn = page => {
    const btn = document.createElement('button');
    btn.className = `page-item ${page === currentPage ? 'active' : ''}`;
    btn.textContent = page;
    btn.addEventListener('click', async () => {
      const run = handleFilterClick(category, filterName, page);
      await run();
      paginationContainer.scrollIntoView({ behavior: 'smooth' }); // 👈 smooth scroll
    });
    return btn;
  };
  if (currentPage > maxVisible) {
    paginationContainer.appendChild(createBtn(1));
    paginationContainer.appendChild(createEllipsis());
  }

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) {
    paginationContainer.appendChild(createBtn(i));
  }

  if (currentPage < totalPages - 3) {
    paginationContainer.appendChild(createEllipsis());
    paginationContainer.appendChild(createBtn(totalPages));
  }
}

function createEllipsis() {
  const span = document.createElement('span');
  span.textContent = '...';
  span.className = 'pagination-ellipsis';
  return span;
}



document
  .querySelector('.exercises-list')
  ?.addEventListener('click', async e => {
    const item = e.target.closest('.filter-item');
    if (!item) return;

    const name = item.querySelector('.filter-label')?.textContent;
    const category = document.querySelector('.active-category')?.textContent;

    if (name && category) {
      const run = handleFilterClick(category, name, 1);
      await run();
    }
  });


//   document
//   .querySelector('.search-form')
//   ?.addEventListener('submit', async e => {
//     e.preventDefault();
//     const searchInput = e.target.querySelector('.search-input');
//     const query = searchInput.value.trim();
// 
//     if (query) {
//       const run = handleFilterClick('Search', query);
//       await run(); // ✅ CALL the returned async function
//     }
//   });

