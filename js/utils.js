const ALERT_SHOW_TIME = 5000;
const TIMEOUT_DELAY = 500;

const ClassName = {
  HIDDEN: 'hidden',
  MODAL: 'modal-open',
  SUCCESS: 'success',
  ERROR: 'error'
};

const alertTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomSortList = (elements) => {
  let count = elements.length, random;
  while (count) {
    random = Math.floor(Math.random() * count--);
    [elements[count], elements[random]] = [elements[random], elements[count]];
  }
  return elements;
};

const updateWindowSize = ({isResize = false} = {}) => {
  const scrollbarWidth = isResize ? window.innerWidth - document.body.clientWidth : null;
  document.body.style.marginRight = scrollbarWidth ? `${scrollbarWidth}px` : null;
};

const resetScroll = (container) => {
  container.scrollTop = 0;
};

const showAlert = () => {
  const alert = alertTemplate.cloneNode(true);
  document.body.append(alert);
  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), TIMEOUT_DELAY);
  };
}

export { ClassName, updateWindowSize, resetScroll, isEscapeKey, getRandomSortList, showAlert, debounce };
