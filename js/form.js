import { isEscapeKey, toggleClass, ClassName, updateWindowSize } from './utils.js';
import { pristineInit, validateInput, hashtagInput, descriptionInput } from './validation.js';
import { imageEffectLevel, sliderEffectLevel, resetImageStyle } from './image.js';

const form = document.querySelector('.img-upload__form');
const cancelFormButton = form.querySelector('.img-upload__cancel');
const imageInput = form.querySelector('.img-upload__input');
const windowOverlay = form.querySelector('.img-upload__overlay');

const pristine = pristineInit();
validateInput(pristine);

const onDocumentKeydown = (evt) => {
  if (document.activeElement === hashtagInput || document.activeElement === descriptionInput) {
    evt.stopPropagation();
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
  sliderEffectLevel.value = null;
  pristine.reset();
  resetImageStyle();
};

const openForm = () => {
  updateWindowSize({isResize: true});
  toggleClass(windowOverlay, ClassName.HIDDEN, false);
  toggleClass(document.body, ClassName.MODAL, true);
  toggleClass(imageEffectLevel, ClassName.HIDDEN, true);
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeForm() {
  updateWindowSize();
  toggleClass(windowOverlay, ClassName.HIDDEN, true);
  toggleClass(document.body, ClassName.MODAL, false);
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
}

imageInput.addEventListener('change', () => {
  openForm();
});

cancelFormButton.addEventListener('click', () => {
  closeForm();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
