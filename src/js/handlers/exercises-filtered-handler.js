import { exercisesApi } from '../api';
import { renderFilteredExercises } from '../components/render-filtered-exercises';

export const handleFilterClick = (category, filterName, page, limit = 10) => {
  const filters = {
    muscles: category === 'Muscles' ? filterName : '',
    bodypart: category === 'Body parts' ? filterName : '',
    equipment: category === 'Equipment' ? filterName : '',
  };

  const toHide = document.querySelector('.exercises-content');
  const toShow = document.querySelector('.filtered-exercises-cards-wrapper');

  return async () => {
    try {
      const res = await exercisesApi.getExercisesFilteredOrSearched({
        filters,
        page,
        limit,
      });
      if (!res || !res.results || res.results.length === 0) {
        console.error('No exercises found for the selected filters.');
        return;
      }

      toShow?.classList.remove('hide');
      toHide?.classList.add('hide');

      const exercises = res.results;
      console.log('Filtered exercises:', exercises, { filters, page, limit });

      renderFilteredExercises(exercises);

      renderFilteredExercisesPagination(
        res.totalPages,
        page,
        category,
        filterName
      );
    } catch (error) {
      console.error('Error fetching filtered exercises:', error);
    }
  };
};

function renderFilteredExercisesPagination(
  totalPages,
  currentPage,
  category,
  filterName
) {
  const paginationContainer = document.querySelector('.filtered-pagination');
  if (!paginationContainer) return;

  paginationContainer.innerHTML = '';
  paginationContainer.style.display = totalPages > 1 ? 'flex' : 'none';

  console.log('pagination:', { totalPages, currentPage });
  const maxVisible = 5;
  if (totalPages <= 1) {
    paginationContainer.style.display = 'none';
    return;
  }
  const createBtn = page => {
    const btn = document.createElement('button');
    btn.className = `page-item ${page === currentPage ? 'active' : ''}`;
    btn.textContent = page;
    btn.setAttribute('data-page', page);
    btn.setAttribute('data-category', category);
    btn.setAttribute('data-filter-name', filterName);
    btn.addEventListener('click', async e => {
      const page = Number(e.target.getAttribute('data-page'));
      const category = e.target.getAttribute('data-category');
      const filterName = e.target.getAttribute('data-filter-name');

      if (isNaN(page) || !category || !filterName) return;

      const run = handleFilterClick(category, filterName, page);
      await run();
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
    const page = 1;

    if (name && category) {
      const run = handleFilterClick(category, name, page);
      await run();
    }
  });

//     const searchInput = e.target.querySelector('.search-input');
//     const query = searchInput.value.trim();
//
//     if (query) {
//       const run = handleFilterClick('Search', query);
//       await run(); // ✅ CALL the returned async function
//     }
//   });
