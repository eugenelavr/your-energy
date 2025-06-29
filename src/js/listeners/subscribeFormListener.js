import { onSubscribeForm } from '../handlers/onSubscribeForm';

export function subscribeFormListener() {
  const form = document.querySelector('.js-footer-form');

  if (form) {
    form.addEventListener('submit', onSubscribeForm);
  }
}
