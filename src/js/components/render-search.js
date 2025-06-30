







export const renderSearchInput = (searchTerm) => {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) {
    console.error('Search input element not found');
    return;
  }

  searchInput.value = searchTerm.trim()
  console.log(`Search input updated with term: ${searchTerm}`);
    // Trigger the input event to notify any listeners of the change
    const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true
    });
    searchInput.dispatchEvent(inputEvent);
    console.log('Input event dispatched');
    if (typeof handleSearchTerm === 'function') {
      handleSearchTerm(searchTerm);
    }

}