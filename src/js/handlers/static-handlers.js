import { renderQuote } from '../components/quote.js';

const handleQuoteOfDay = async () => {
  const storedQuote = JSON.parse(localStorage.getItem('quoteDay'));
  const currentDate = new Date().toISOString().split('T')[0];
  if (storedQuote?.currentDate === currentDate) {
    renderQuote(storedQuote.data);
    return;
  }
  try {
    const { data } = await exercisesApi.quoteOfDay();
    const newQuoteData = {
      data: data,
      currentDate: currentDate,
    };
    localStorage.setItem('quoteDay', JSON.stringify(newQuoteData));
    renderQuote(data);
  } catch (error) {
    console.error('Error fetching the quote:', error);
  }
};

export { handleQuoteOfDay };
