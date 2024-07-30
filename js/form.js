import { isEscapeKey, toggleClass, ClassName, updateWindowSize } from './utils.js';
import { pristineInit, validateInput, hashtagInput, descriptionInput } from './validation.js';
import { imageEffectLevel, resetImageStyle } from './image.js';
import { sendData } from './api.js';

const form = document.querySelector('.img-upload__form');
const cancelFormButton = form.querySelector('.img-upload__cancel');
const imageInput = form.querySelector('.img-upload__input');
const formOverlay = form.querySelector('.img-upload__overlay');
const submitButton = form.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let errorOverlay = null;
let successOverlay = null;

const pristine = pristineInit();
validateInput(pristine);

const onDocumentKeydown = (evt) => {
  if (document.activeElement === hashtagInput || document.activeElement === descriptionInput) {
    evt.stopPropagation();
    return;
  }

  if (isEscapeKey(evt) && successOverlay) {
    evt.preventDefault();
    successOverlay.remove();
    successOverlay = null;
    document.removeEventListener('keydown', onDocumentKeydown);
    return;
  }

  if (isEscapeKey(evt) && errorOverlay) {
    evt.preventDefault();
    errorOverlay.remove();
    errorOverlay = null;
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

const resetForm = () => {
  hashtagInput.value = null;
  imageInput.value = null;
  descriptionInput.value = null;
  pristine.reset();
  resetImageStyle();
};

const openForm = () => {
  updateWindowSize({isResize: true});
  toggleClass(formOverlay, ClassName.HIDDEN, false);
  toggleClass(document.body, ClassName.MODAL, true);
  toggleClass(imageEffectLevel, ClassName.HIDDEN, true);
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeForm({isSuccess = false} = {}) {
  updateWindowSize();
  toggleClass(formOverlay, ClassName.HIDDEN, true);
  toggleClass(document.body, ClassName.MODAL, false);
  resetForm();
  if (!isSuccess) {
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

const closeFormSuccess = () => {
  closeForm({isSuccess: true});
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const showSuccess = () => {
  document.body.append(successTemplate);
  successOverlay = document.querySelector('.success');
  const successLoadButton = successOverlay.querySelector('.success__button');

  successLoadButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    successOverlay.remove();
  });

  successOverlay.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target === successOverlay) {
      successOverlay.remove();
    }
  });
};

const showError = () => {
  document.body.append(errorTemplate);
  errorOverlay = document.querySelector('.error');
  const errorLoadButton = errorOverlay.querySelector('.error__button');

  errorLoadButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    errorOverlay.remove();
  });

  errorOverlay.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target === errorOverlay) {
      errorOverlay.remove();
    }
  });
};

imageInput.addEventListener('change', () => {
  openForm();
});

cancelFormButton.addEventListener('click', () => {
  closeForm();
});

const setUserFromSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(closeFormSuccess)
        .catch(showError)
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFromSubmit, closeForm, showSuccess };
