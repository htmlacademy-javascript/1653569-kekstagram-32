const ALERT_SHOW_TIME = 5000;
const TIMEOUT_DELAY = 500;

const ClassName = {
  'HIDDEN': 'hidden',
  'MODAL': 'modal-open'
};

const alertTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const isEscapeKey = (evt) => evt.key === 'Escape';

const toggleClass = (element, className, force) => {
  element.classList.toggle(className, force);
};

const updateWindowSize = ({isResize = false} = {}) => {
  const scrollbarWidth = isResize ? window.innerWidth - document.body.clientWidth : null;
  document.body.style.marginRight = scrollbarWidth ? `${scrollbarWidth}px` : null;
};

const showAlert = () => {
  document.body.append(alertTemplate);
  setTimeout(() => {
    alertTemplate.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), TIMEOUT_DELAY);
  };
}

export { ClassName, updateWindowSize, isEscapeKey, toggleClass, showAlert, debounce };
