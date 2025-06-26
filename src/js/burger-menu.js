const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');

document.addEventListener('click', event => {
  const svgIcon = event.target.closest('svg');
  if (!svgIcon) return;
  const use = svgIcon.querySelector('use[href$="#burger-menu"]');
  if (use) {
    sidebar.classList.add('active');
  }
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
});