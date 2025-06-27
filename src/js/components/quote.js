function renderQuote({ quote, author }) {
  document.querySelector('.js-quote').innerHTML = `
    <p class="quote-text">"${quote}"</p>
    <p class="quote-signature">- ${author}</p>
  `;
}

export { renderQuote };
