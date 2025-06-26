import iziToast from 'izitoast';

function formRatingValidation(ratingSelected, email, comment) {
  const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (!ratingSelected) {
    toaster.showErrorToast('Please select a rating before submitting.');
    return false;
  }
  if (!email || !emailPattern.test(email)) {
    toaster.showErrorToast('Please enter a valid email address.');
    return false;
  }
  if (!comment) {
    toaster.showErrorToast('Please enter a comment.');
    return false;
  }
  return true;
}

const toaster = {
  showErrorToast: function (message) {
    return iziToast.error({
      title: 'Error',
      message: message,
      position: 'topRight',
      transitionIn: 'fadeInDown',
      timeout: 3000,
      close: true,
    });
  },

  showSuccessToast: function (message) {
    return iziToast.success({
      title: 'Success',
      message: message,
      position: 'topRight',
      transitionIn: 'fadeInDown',
      timeout: 3000,
      close: true,
    });
  },
};

export { toaster, formRatingValidation };
