import { exercisesApi } from '../api/exercises.api.js';
import { toaster } from '../utils/utils.js';
import { renderCategoryCards, renderPagination } from '../components/categories-component.js';

let currentFilter = 'Muscles';
let currentPage = 1;
let totalPages = 1;
let isLoading = false;

function updateActiveCategory(filter) {
  const categoryButtons = document.querySelectorAll('.category');
  categoryButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === filter) {
      btn.classList.add('active');
    }
  });
}

async function loadCategories(filter = currentFilter, page = 1) {
  if (isLoading) return;

  isLoading = true;

  try {
    const categoriesList = document.querySelector('.categories__list');
    if (categoriesList) {
      categoriesList.innerHTML = '<div class="loading">Завантаження...</div>';
    }

    const response = await exercisesApi.getFilters({ filter, page, limit: 12 });

    currentFilter = filter;
    currentPage = parseInt(response.page);
    totalPages = parseInt(response.totalPages);

    renderCategoryCards(response.results);
    renderPagination(currentPage, totalPages);
    updateActiveCategory(filter);

  } catch (error) {
    console.error('Error loading categories:', error);
    toaster.showErrorToast('Помилка завантаження категорій');

    const categoriesList = document.querySelector('.categories__list');
    if (categoriesList) {
      categoriesList.innerHTML = '<div class="error">Помилка завантаження категорій</div>';
    }
  } finally {
    isLoading = false;
  }
}

function handleCategoryClick(event) {
  const button = event.target.closest('.category');
  if (!button || button.classList.contains('active')) return;

  const filter = button.textContent;
  loadCategories(filter, 1);
}

function handlePaginationClick(event) {
  const target = event.target;

  if (target.classList.contains('pagination__prev')) {
    if (currentPage > 1) {
      loadCategories(currentFilter, currentPage - 1);
    }
  } else if (target.classList.contains('pagination__next')) {
    if (currentPage < totalPages) {
      loadCategories(currentFilter, currentPage + 1);
    }
  } else if (target.classList.contains('pagination__page')) {
    const page = parseInt(target.dataset.page);
    if (page && page !== currentPage) {
      loadCategories(currentFilter, page);
    }
  }

  const targetElement = document.querySelector('.categories');
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

function initializeEventListeners() {
  const categoriesContainer = document.querySelector('.categories');
  if (categoriesContainer) {
    categoriesContainer.addEventListener('click', handleCategoryClick);
  }

  document.addEventListener('click', handlePaginationClick);
}

async function renderCategories() {
  try {
    initializeEventListeners();

    await loadCategories('Muscles', 1);

  } catch (error) {
    console.error('Error initializing categories:', error);
    toaster.showErrorToast('Помилка ініціалізації категорій');
  }
}

export { renderCategories };
