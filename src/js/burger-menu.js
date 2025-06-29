export const burgerMenu = () => {
  if (!burgerBtn || !sidebar || !closeBtn) return;

  const burgerBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = document.querySelector('.close-btn');

  burgerBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
};
