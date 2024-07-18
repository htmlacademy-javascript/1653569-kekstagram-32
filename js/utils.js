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
const isEnterKey = (evt) => evt.key === 'Enter';

export { getRandomArrayElement, createNumberGenerator, isEscapeKey, isEnterKey };
