import { exercisesApi } from '../api-services/exercises-api.js';
import { toaster } from '../utils/utils.js';
import { renderCategoryCards, renderPagination } from '../components/categories-component.js';

// Стан для зберігання поточної категорії та пагінації
let currentFilter = 'Muscles';
let currentPage = 1;
let totalPages = 1;
let isLoading = false;

// Функція для оновлення активного стану кнопок категорій
function updateActiveCategory(filter) {
  const categoryButtons = document.querySelectorAll('.category');
  categoryButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === filter) {
      btn.classList.add('active');
    }
  });
}

// Функція для завантаження категорій з API
async function loadCategories(filter = currentFilter, page = 1) {
  if (isLoading) return;
  
  isLoading = true;
  
  try {
    // Показуємо індикатор завантаження
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
    
    // Показуємо повідомлення про помилку
    const categoriesList = document.querySelector('.categories__list');
    if (categoriesList) {
      categoriesList.innerHTML = '<div class="error">Помилка завантаження категорій</div>';
    }
  } finally {
    isLoading = false;
  }
}

// Функція для обробки кліків по кнопках категорій
function handleCategoryClick(event) {
  const button = event.target.closest('.category');
  if (!button || button.classList.contains('active')) return;
  
  const filter = button.textContent;
  loadCategories(filter, 1);
}

// Функція для обробки кліків по пагінації
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
}

// Функція для ініціалізації обробників подій
function initializeEventListeners() {
  // Обробник для кнопок категорій
  const categoriesContainer = document.querySelector('.categories');
  if (categoriesContainer) {
    categoriesContainer.addEventListener('click', handleCategoryClick);
  }
  
  // Обробник для пагінації (делегування подій)
  document.addEventListener('click', handlePaginationClick);
}

// Основна функція для рендерингу категорій
async function renderCategories() {
  try {
    // Ініціалізуємо обробники подій
    initializeEventListeners();
    
    // Завантажуємо початкові категорії
    await loadCategories('Muscles', 1);
    
  } catch (error) {
    console.error('Error initializing categories:', error);
    toaster.showErrorToast('Помилка ініціалізації категорій');
  }
}

export { renderCategories };
