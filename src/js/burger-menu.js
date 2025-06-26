const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');

document.addEventListener('click', event => {
  const svgIcon = event.target.closest('svg');
  if (!svgIcon) return;
  const nodeUse = svgIcon.querySelector('use[href$="#burger-menu"]');
  if (nodeUse) {
    sidebar.classList.add('active');
  }
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
});