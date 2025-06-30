export function initBurgerMenu() {
  const burgerBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = document.querySelector('.close-btn');
  const overlay = document.querySelector('.modal-overlay');

  // if (!burgerBtn || !sidebar || !closeBtn || !overlay) return;

  const openMenu = () => {
    sidebar.classList.add('active');
    document.body.classList.add('no-scroll');
    overlay.classList.add('is-open');
  };

  const closeMenu = () => {
    sidebar.classList.remove('active');
    document.body.classList.remove('no-scroll');
    overlay.classList.remove('is-open');
  };

  burgerBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  document.addEventListener('click', event => {
    const isClickInside =
      sidebar.contains(event.target) || burgerBtn.contains(event.target);
    if (!isClickInside) {
      sidebar.classList.remove('active');
      document.body.classList.remove('no-scroll');
      overlay.classList.remove('is-open');
    }
  });
}
