import { isEscapeKey, toggleClass, ClassName, updateWindowSize } from './utils.js';
import { pristine, hashtagInput, descriptionInput } from './validation.js';
import { imageEffectLevel, loadPreview, resetImageStyle } from './image.js';
import { sendData } from './api.js';

const form = document.querySelector('.img-upload__form');
const cancelFormButton = form.querySelector('.img-upload__cancel');
const imageInput = form.querySelector('.img-upload__input');
const formOverlay = form.querySelector('.img-upload__overlay');
const submitButton = form.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let currentOverlay = null;

const onDocumentKeydown = (evt) => {
  if (document.activeElement === hashtagInput || document.activeElement === descriptionInput) {
    evt.stopPropagation();
    return;
  }

  if (isEscapeKey(evt) && currentOverlay?.classList.contains('success')) {
    evt.preventDefault();
    currentOverlay.remove();
    currentOverlay = null;
    document.removeEventListener('keydown', onDocumentKeydown);
    return;
  }

  if (isEscapeKey(evt) && currentOverlay?.classList.contains('error')) {
    evt.preventDefault();
    currentOverlay.remove();
    currentOverlay = null;
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

const resetForm = () => {
  imageInput.value = null;
  hashtagInput.value = null;
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

function closeForm({isRemoveListener = true} = {}) {
  updateWindowSize();
  toggleClass(formOverlay, ClassName.HIDDEN, true);
  toggleClass(document.body, ClassName.MODAL, false);
  resetForm();
  if (isRemoveListener) {
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

const closeFormAfterSubmit = () => {
  closeForm({isRemoveListener: false});
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const showMessage = (type, template) => {
  document.body.append(template);
  const overlay = document.querySelector(`.${type}`);
  const overlayButton = overlay.querySelector(`.${type}__button`);
  currentOverlay = overlay;

  overlay.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target === currentOverlay) {
      overlay.remove();
    }
  });

  overlayButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    overlay.remove();
  });
};

const showSuccess = () => {
  showMessage('success', successTemplate);
};

const showError = () => {
  showMessage('error', errorTemplate);
};

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
        .then(closeFormAfterSubmit)
        .catch(showError)
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFromSubmit, closeForm, showSuccess };
