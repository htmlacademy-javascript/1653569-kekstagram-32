const ALERT_SHOW_TIME = 5000;

const ClassName = {
  'HIDDEN': 'hidden',
  'MODAL': 'modal-open'
};

const alertTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createNumberGenerator = (min, max, {isUniqueId = false} = {}) => {
  const prevValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (isUniqueId) {
      if (prevValues.length >= (max - min + 1)) {
        return;
      }
      while (prevValues.includes(currentValue)) {
        currentValue = getRandomInteger(min, max);
      }
      prevValues.push(currentValue);
    }
    return currentValue;
  };
};

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

export { ClassName, updateWindowSize, getRandomArrayElement, createNumberGenerator, isEscapeKey, toggleClass, showAlert };
