import { doc } from 'prettier';
import { exercisesApi } from '../api';
import { renderFilteredExercises } from '../components/render-filtered-exercises';

const hideShow = (toHide, toShow) => {
  if (toHide) {
    toHide.classList.add('hide');
  }
  if (toShow) {
    toShow.classList.remove('hide');
  }
};
const breadcrumbState = {
  currentFilter: null,
};

const updateBreadcrumbUI = () => {
  const current = document.querySelector('.breadcrumb-current');
  const divider = document.querySelector('.breadcrumb-divider');

  if (breadcrumbState.currentFilter) {
    current.textContent = breadcrumbState.currentFilter;
    current.style.display = 'inline';
    divider.style.display = 'inline';
  } else {
    current.textContent = '';
    current.style.display = 'none';
    divider.style.display = 'none';
  }
};

export const handleFilterClick = (category, filterName, page, limit) => {
  const params = {
    filters: {
      muscles: category === 'Muscles' ? filterName : '',
      bodypart: category === 'Body parts' ? filterName : '',
      equipment: category === 'Equipment' ? filterName : '',
    },
    page,
    limit,
  };
  return async () => {
    try {
      const res = await exercisesApi.getExercisesFilteredOrSearched(params);
      if (!res || !res.results || res.results.length === 0) {
        console.error('No exercises found for the selected filters.');
        return;
      }
      hideShow(
        document.querySelector('.exercises-content'),
        document.querySelector('.filtered-exercises-cards-wrapper')
      );
      breadcrumbState.currentFilter = filterName;
      const exercises = res.results;

      renderFilteredExercises(exercises);
      renderFilteredExercisesPagination(
        res.totalPages,
        res.page,
        category,
        filterName
      );
    } catch (error) {
      console.error('Error fetching filtered exercises:', error);
    }
  };
};

async function renderFilteredExercisesPagination(
  totalPages,
  currentPage,
  category,
  filterName
) {
  const paginationContainer = document.querySelector('.filtered-pagination');
  if (!paginationContainer) return;

  paginationContainer.innerHTML = '';
  if (totalPages <= 1) {
    paginationContainer.style.display = 'none';
    return;
  }
  paginationContainer.style.display = 'flex';

  const createBtn = (
    page,
    label = null,
    disabled = false
  ) => {
    const btn = document.createElement('button');
    btn.className = `page-item ${page === currentPage ? 'active' : ''}`;
    btn.textContent = label || page;
    btn.disabled = disabled;
    btn.style.cursor = disabled ? 'not-allowed' : 'pointer';
    btn.setAttribute('data-page', page);
    btn.setAttribute('data-category', category);
    btn.setAttribute('data-filter-name', filterName);
    btn.addEventListener('click', async e => {
      const page = Number(e.target.getAttribute('data-page'));
      const category = e.target.getAttribute('data-category');
      const filterName = e.target.getAttribute('data-filter-name');

      const run = handleFilterClick(category, filterName, page, 10);
      await run();
    });
    return btn;
  };

  const createEllipsis = () => {
    const span = document.createElement('span');
    span.textContent = '...';
    span.className = 'pagination-ellipsis';
    return span;
  };
  paginationContainer.appendChild(createBtn(1, '<<', currentPage === 1));
  paginationContainer.appendChild(
    createBtn(currentPage - 1, '<', currentPage === 1)
  );

  const maxVisible = 3;
  const half = Math.floor(maxVisible / 2);
  const start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, currentPage + half);

  if (start > 1) {
    paginationContainer.appendChild(createBtn(1));
    if (start > 2) paginationContainer.appendChild(createEllipsis());
  }

  for (let i = start; i <= end; i++) {
    paginationContainer.appendChild(createBtn(i));
  }

  if (end < totalPages) {
    if (end < totalPages - 1) paginationContainer.appendChild(createEllipsis());
    paginationContainer.appendChild(createBtn(totalPages));
  }
  paginationContainer.appendChild(
    createBtn(currentPage + 1, '>', currentPage === totalPages)
  );
  paginationContainer.appendChild(
    createBtn(totalPages, '>>', currentPage === totalPages)
  );
}
document
  .querySelector('.exercises-list')
  ?.addEventListener('click', async e => {
    const item = e.target.closest('.filter-item');
    if (!item) return;
    const name = item.querySelector('.filter-label')?.textContent;
    const category = document.querySelector(
      '.exercises-category-item.active-category'
    )?.textContent;
    const page = 1;

    if (name && category) {
      breadcrumbState.currentFilter = name;

      const run = handleFilterClick(category, name, page);
      await run();
      updateBreadcrumbUI();
    }
  });


  document
    .querySelector('.breadcrumb-home')
    ?.addEventListener('click', async () => {
 
      hideShow(
        document.querySelector('.filtered-exercises-cards-wrapper'),
        document.querySelector('.exercises-content')
      );
      breadcrumbState.currentFilter = null;
      updateBreadcrumbUI();
    });

