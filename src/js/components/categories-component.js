export function renderCategoryCards(categories) {
  const categoriesList = document.querySelector('.categories__list');
  if (!categoriesList) return;

  categoriesList.innerHTML = categories
    .map(
      category => `
    <div class="category-card">
      <img src="${category.imgURL}" alt="${category.name}" class="category-card__img" />
      <div class="category-card__overlay">
        <p class="category-card__title">${category.name}</p>
        <p class="category-card__subtitle">${category.filter}</p>
      </div>
    </div>
  `
    )
    .join('');
}

function generatePageNumbers(currentPage, totalPages) {
  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
  }

  return pages
    .map(page => {
      if (page === '...') {
        return '<span class="pagination__dots">...</span>';
      }
      return `<button class="pagination__page ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`;
    })
    .join('');
}

export function renderPagination(currentPage, totalPages) {
  const categoriesSection = document.querySelector('.categories');
  if (!categoriesSection) return;

  const existingPagination = categoriesSection.querySelector('.pagination');
  if (existingPagination) {
    existingPagination.remove();
  }

  if (totalPages <= 1) return;

  const paginationHTML = `
    <div class="pagination">
      <div class="pagination__pages">
        ${generatePageNumbers(currentPage, totalPages)}
      </div>
    </div>
  `;

  categoriesSection.insertAdjacentHTML('beforeend', paginationHTML);
}
