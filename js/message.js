import { ClassName, isEscapeKey } from './utils.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let currentMessage = null;

const isMessageShown = () => Boolean(currentMessage);

const closeMessage = () => {
  currentMessage.remove();
  currentMessage = null;
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showMessage = (className, template) => {
  const message = template.cloneNode(true);
  document.body.append(message);
  const overlay = document.querySelector(`.${className}`);
  const closeButton = overlay.querySelector(`.${className}__button`);
  currentMessage = overlay;

  document.addEventListener('keydown', onDocumentKeydown);
  overlay.addEventListener('click', (evt) => {
    if (evt.target === currentMessage) {
      closeMessage();
    }
  });

  closeButton.addEventListener('click', () => {
    closeMessage();
  });
};

const showSuccess = () => {
  showMessage(ClassName.SUCCESS, successTemplate);
};

const showError = () => {
  showMessage(ClassName.ERROR, errorTemplate);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && isMessageShown()) {
    evt.preventDefault();
    closeMessage();
  }
}

export { showSuccess, showError, isMessageShown };

