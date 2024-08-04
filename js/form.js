import { isEscapeKey, ClassName, updateWindowSize } from './utils.js';
import { pristine, hashtagInput, descriptionInput } from './validation.js';
import { imageEffectLevel, loadPreview, resetImageStyle } from './image.js';
import { sendData } from './api.js';

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

const form = document.querySelector('.img-upload__form');
const cancelFormButton = form.querySelector('.img-upload__cancel');
const imageInput = form.querySelector('.img-upload__input');
const formOverlay = form.querySelector('.img-upload__overlay');
const submitButton = form.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let currentMessage = null;

const resetForm = () => {
  imageInput.value = null;
  hashtagInput.value = null;
  descriptionInput.value = null;
  pristine.reset();
  resetImageStyle();
};

const openForm = () => {
  updateWindowSize({isResize: true});
  formOverlay.classList.remove(ClassName.HIDDEN);
  document.body.classList.add(ClassName.MODAL);
  imageEffectLevel.classList.add(ClassName.HIDDEN);
  document.addEventListener('keydown', onDocumentKeydownForm);
};

const closeForm = () => {
  updateWindowSize();
  formOverlay.classList.add(ClassName.HIDDEN);
  document.body.classList.remove(ClassName.MODAL);
  resetForm();
  document.removeEventListener('keydown', onDocumentKeydownForm);
};

const closeMessage = () => {
  currentMessage.remove();
  currentMessage = null;
  document.removeEventListener('keydown', onDocumentKeydownMessage);
};

const showMessage = (className, template) => {
  const message = template.cloneNode(true);
  document.body.append(message);
  const overlay = document.querySelector(`.${className}`);
  const overlayButton = overlay.querySelector(`.${className}__button`);
  currentMessage = overlay;

  document.addEventListener('keydown', onDocumentKeydownMessage);
  overlay.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target === currentMessage) {
      closeMessage();
    }
  });

  overlayButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeMessage();
  });
};

const showSuccess = () => {
  showMessage('success', successTemplate);
};

const showError = () => {
  showMessage('error', errorTemplate);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SUBMITTING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.DEFAULT;
};

function onDocumentKeydownMessage (evt) {
  if (isEscapeKey(evt) && currentMessage) {
    evt.preventDefault();
    closeMessage();
  }
}

function onDocumentKeydownForm (evt) {
  if (document.activeElement === hashtagInput || document.activeElement === descriptionInput) {
    evt.stopPropagation();
    return;
  }

  if (isEscapeKey(evt) && !currentMessage) {
    evt.preventDefault();
    closeForm();
  }
}

imageInput.addEventListener('change', () => {
  loadPreview(imageInput);
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
        .then(showSuccess)
        .catch(showError)
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFromSubmit, closeForm, showSuccess };
