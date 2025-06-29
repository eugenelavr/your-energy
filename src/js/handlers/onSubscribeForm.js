import { subscribeEmail } from '../api/subscribeApi';
import iziToast from 'izitoast';
import { emailPatern } from '../const/patterns';

export function onSubscribeForm(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const input = form.querySelector('input[type="email"]');
  const email = input.value.trim();

  if (!emailPatern.test(email)) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid email.',
      position: 'topRight',
    });

    return;
  }

  subscribeEmail(email)
    .then(() => {
      iziToast.success({
        title: 'Success',
        message: 'Subscription successful!',
        position: 'topRight',
      });

      form.reset();
    })

    .catch(error => {
      iziToast.info({
        title: 'Info',
        message: error.message,
        position: 'topRight',
      });
    });
}
