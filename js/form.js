import { loadImagePreview, resetImageStyle, setSliderShown } from './image.js';
import { isValid, isFocusedField, resetValidation } from './validation.js';
import { isEscapeKey, ClassName, updateWindowSize, resetScroll } from './utils.js';
import { showSuccess, showError, isMessageShown } from './message.js';
import { resetImageScale } from './scale.js';
import { sendData } from './api.js';

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

const form = document.querySelector('.img-upload__form');
const formOverlay = form.querySelector('.img-upload__overlay');
const cancelFormButton = form.querySelector('.img-upload__cancel');
const imageInput = form.querySelector('.img-upload__input');
const submitButton = form.querySelector('.img-upload__submit');

const resetForm = () => {
  resetValidation();
  resetImageScale();
  resetImageStyle();
  imageInput.value = null;
};

const openForm = () => {
  updateWindowSize({isResize: true});
  formOverlay.classList.remove(ClassName.HIDDEN);
  document.body.classList.add(ClassName.MODAL);
  document.addEventListener('keydown', onDocumentKeydown);
  resetScroll(formOverlay);
  setSliderShown();
};

const closeForm = () => {
  updateWindowSize();
  formOverlay.classList.add(ClassName.HIDDEN);
  document.body.classList.remove(ClassName.MODAL);
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SUBMITTING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.DEFAULT;
};

function onDocumentKeydown (evt) {
  if (isFocusedField()) {
    evt.stopPropagation();
    return;
  }

  if (isEscapeKey(evt) && !isMessageShown()) {
    evt.preventDefault();
    closeForm();
  }
}

imageInput.addEventListener('change', () => {
  loadImagePreview(imageInput);
  openForm();
});

cancelFormButton.addEventListener('click', () => {
  closeForm();
});

const setUserFromSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (isValid()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccess)
        .catch(showError)
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFromSubmit, closeForm };
