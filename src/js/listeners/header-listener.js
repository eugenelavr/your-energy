import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
gsap.registerPlugin(Observer);

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.menu-item');
  let activeNavItemIndex = Number(sessionStorage.getItem('activeNavItemIndex'));

  if (isNaN(activeNavItemIndex)) {
    activeNavItemIndex = 0;
  }

  if (navItems[activeNavItemIndex]) {
    navItems[activeNavItemIndex].classList.add('active');
  }

  navItems.forEach((nav, index) => {
    const navLink = nav.querySelector('.menu-item-link'); 

    navLink?.addEventListener('click', () => {
      navItems.forEach(navItem => navItem.classList.remove('active'));
      nav.classList.add('active');
      sessionStorage.setItem('activeNavItemIndex', index);
    });
  });
});
