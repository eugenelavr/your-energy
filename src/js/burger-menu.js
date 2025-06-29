export function initBurgerMenu() {
  const burgerBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = document.querySelector('.close-btn');

  if (!burgerBtn) return;

  burgerBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
  document.addEventListener('click', event => {
    const isClickInside =
      sidebar.contains(event.target) || burgerBtn.contains(event.target);
    if (!isClickInside) {
      sidebar.classList.remove('active');
    }
  });
}
