
const submitHandler = e => {
    e.preventDefault();
  
    const form = e.currentTarget;
    const searchInput = form.querySelector('.search-input');
    const trimmed = searchInput?.value.trim();
  
    if (trimmed && typeof handleSearchTerm === 'function') {
      handleSearchTerm(trimmed);
    }
  
    form.reset();
    searchInput.blur();
    searchInput.value = '';
  };
  
  export const renderSearchInput = (searchTerm) => {
    const form = document.getElementById('search-form');
    const searchInput = form?.querySelector('.search-input');
  
    if (!form || !searchInput) {
      console.error('Search form or input not found');
      return;
    }
  
    searchInput.value = searchTerm.trim();
    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    searchInput.dispatchEvent(inputEvent);
  
    form.removeEventListener('submit', submitHandler);
    form.addEventListener('submit', submitHandler);
  };
  