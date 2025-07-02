function renderQuote({ quote, author }) {
  const quoteElement = document.querySelector('.js-quote');
  if (!quoteElement) return;

  quoteElement.innerHTML = `
    <p class="quote-text">"${quote}"</p>
    <p class="quote-signature">- ${author}</p>
  `;
}

export { renderQuote };
