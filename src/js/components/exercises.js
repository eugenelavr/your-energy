import { exercisesApi } from '../api';

const MUSCLES_CATEGORY = 'Muscles';
const BODY_PARTS_CATEGORY = 'Body parts';
const EQUIPMENT_CATEGORY = 'Equipment';

const DEFAULT_CATEGORY = MUSCLES_CATEGORY;
const CATEGORIES = [MUSCLES_CATEGORY, BODY_PARTS_CATEGORY, EQUIPMENT_CATEGORY];

let selectedCategory = DEFAULT_CATEGORY;

const categoriesEl = document.querySelector('.exercises-categories');
const exercisesEl = document.querySelector('.exercises-list');
const exercisesPaginationEl = document.querySelector('.exercises-pagination');

const renderCategories = activeCategory => {
  const categoryElements = CATEGORIES.map(category => {
    const categoryItemEl = document.createElement('li');
    categoryItemEl.classList.add('exercises-category-item');
    category === activeCategory &&
      categoryItemEl.classList.add('active-category');

    const categoryLinkEl = document.createElement('a');
    categoryLinkEl.classList.add('exercises-category-link');
    categoryLinkEl.textContent = category;

    categoryItemEl.append(categoryLinkEl);

    return categoryItemEl;
  });

  categoriesEl.replaceChildren(...categoryElements);
};

const renderFilters = async (category, page) => {
  const filtersResponse = await exercisesApi.fetchFilters({
    filter: category,
    page,
    limit: 12,
  });

  const filterElements = filtersResponse.results.map(filter => {
    const filterEl = document.createElement('div');
    filterEl.classList.add('filter-item');

    const filterBgEl = document.createElement('div');
    filterBgEl.classList.add('filter-bg');
    filterBgEl.style.backgroundImage = `linear-gradient(0deg, rgba(17, 17, 17, 0.50) 0%, rgba(17, 17, 17, 0.50) 100%), url(${filter.imgURL})`;

    const filterLabelEl = document.createElement('span');
    filterLabelEl.classList.add('filter-label');
    filterLabelEl.textContent = filter.name;

    const filterCategoryEl = document.createElement('span');
    filterCategoryEl.classList.add('filter-category');
    filterCategoryEl.textContent = filter.filter;

    filterEl.append(filterLabelEl, filterCategoryEl, filterBgEl);

    return filterEl;
  });

  exercisesEl.replaceChildren(...filterElements);

  const paginationElements = Array.from(
    { length: filtersResponse.totalPages },
    (_, i) => i + 1
  ).map(v => {
    const pageEl = document.createElement('li');

    page === v && pageEl.classList.add('page-active');

    const pageLinkEl = document.createElement('a');
    pageLinkEl.textContent = v;

    pageEl.append(pageLinkEl);

    return pageEl;
  });

  exercisesPaginationEl.replaceChildren(...paginationElements);
};

export const handleExercises = () => {
  renderCategories(selectedCategory);
  renderFilters(selectedCategory, 1);

  exercisesPaginationEl.addEventListener('click', e => {
    e.preventDefault();
    const targetEl = e.target;

    if (targetEl.nodeName === 'A') {
      const page = e.target.textContent;
      renderFilters(selectedCategory, +page);
    }
  });

  categoriesEl.addEventListener('click', e => {
    e.preventDefault();

    // ***Hide the filtered exercises cards
    document
      .querySelector('.filtered-exercises-cards-wrapper')
      .classList.add('hide');
      // ***Breadcrumbs
      const breadcrumbsEl = document.querySelector('.breadcrumb-current');
      const breadcrumbsDividerEl = document.querySelector('.breadcrumb-divider');
      // 


    const targetEl = e.target;

    if (targetEl.nodeName === 'A') {
      selectedCategory = e.target.textContent;
      const selectedCategoryEl = document.querySelector('.active-category');
      selectedCategoryEl.classList.remove('active-category');

      targetEl.parentElement.classList.add('active-category');
      renderFilters(selectedCategory, 1);

      // ***breadcrumbs reset
      breadcrumbsEl.textContent = '';
      breadcrumbsDividerEl.style.display = 'none';
      // ***Show this layout
      document.querySelector('.exercises-content').classList.remove('hide');

    }
  });
};
