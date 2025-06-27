export const renderPagination = (currentPage, totalPages, action) => {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  if (totalPages <= 1) {
    pagination.style.display = 'none';
    return;
  }

  pagination.style.display = 'flex';

  const pagesToShow = [];

  if (currentPage > 1) pagesToShow.push(currentPage - 1);
  pagesToShow.push(currentPage);
  if (currentPage < totalPages) pagesToShow.push(currentPage + 1);

  pagesToShow.forEach(page => {
    const pageItem = document.createElement('span');
    pageItem.className = 'page-item';
    pageItem.textContent = page;

    if (page === currentPage) {
      pageItem.classList.add('active');
    }

    pageItem.addEventListener('click', () => {
      if (page === currentPage) return;
      action(page);
    });

    pagination.appendChild(pageItem);
  });
};
