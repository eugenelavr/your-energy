import { doc } from 'prettier';
import { exercisesApi } from '../api';
import { renderFilteredExercises } from '../components/render-filtered-exercises';

const breadcrumbState = {
  currentFilter: null,
  currentCategory: null,
};



const hide=(el) => {
  if (el) {
    el.classList.add('hide');
  }
};
const show=(el) => {
  if (el) {
    el.classList.remove('hide');
  }
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

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
const handleSearchTerm = debounce(async (searchTerm, page = 1, limit = 10) => {
  const keyword = searchTerm.trim();
  if (!keyword) return;
  const category=breadcrumbState.currentCategory || '';
  const filter = breadcrumbState.currentFilter || '';
  if (!filter && !keyword && !category) {
    return;
  }

  console.log(`Searching for exercises with keyword: "${keyword}" in category: "${category}" and filter: "${filter}"`);

  const filters = {
    ...(category === 'Muscles' && { muscles: filter }),
    ...(category === 'Body parts' && { bodypart: filter }),
    ...(category === 'Equipment' && { equipment: filter }),
  };

  const hasFilter = filters.muscles || filters.bodypart || filters.equipment;

  const params = {
    filters: {
      muscles: category === 'Muscles' ? filter : '' ,
      bodypart: category === 'Body parts' ? filter : '',
      equipment: category === 'Equipment' ? filter : '',
    },
    search: hasFilter ? keyword : '',
    page,
    limit,
  };
  const res = await exercisesApi.getExercisesFilteredOrSearched(params);
  console.log(`Search results for "${keyword}":`, res);
  renderFilteredExercises(res.results);
  renderFilteredExercisesPagination(
    res.totalPages,
    res.page,
    'Keyword',
    keyword
  );

}, 500);

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
      hide(document.querySelector('.exercises-content'));
      show(document.querySelector('.filtered-exercises-cards-wrapper'));
      show(document.querySelector('.form-search'));

      breadcrumbState.currentFilter = filterName;
      breadcrumbState.currentCategory = category;
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
 
      hide(document.querySelector('.filtered-exercises-cards-wrapper'));
      hide(document.querySelector('.form-search'));
      show(document.querySelector('.exercises-content'));
      
      breadcrumbState.currentFilter = null;
      updateBreadcrumbUI();
    });

const searchInput = document.querySelector('.search-input');

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        const searchTerm = e.target.value.trim();
        console.log(`Search term updated: ${searchTerm}`);
        handleSearchTerm(searchTerm);
      });
    } else {
      console.error('Search input not found');
    }
