import { ClassName, toggleClass } from './utils.js';

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const Effect = {
  CHROME: 'effect-chrome',
  SEPIA: 'effect-sepia',
  MARVIN: 'effect-marvin',
  FOBOS: 'effect-phobos',
  HEAT: 'effect-heat',
  DEFAULT: 'effect-none'
};

const Filter = {
  GRAYSCALE: 'grayscale',
  SEPIA: 'sepia',
  INVERT: 'invert',
  BLUR: 'blur',
  BRIGHTNESS: 'brightness',
  DEFAULT: 'none'
};

const Option = {
  [Effect.CHROME]: [0, 1, 0.1],
  [Effect.SEPIA]: [0, 1, 0.1],
  [Effect.MARVIN]: [0, 100, 1],
  [Effect.FOBOS]: [0, 3, 0.1],
  [Effect.HEAT]: [1, 3, 0.1],
  [Effect.DEFAULT]: [0, 100, 1],
};

const modalContainer = document.querySelector('.img-upload');
const imagePreview = modalContainer.querySelector('.img-upload__preview > img');
const imageScale = modalContainer.querySelector('.scale__control--value');
const imageEffectLevel = modalContainer.querySelector('.img-upload__effect-level');
const scaleBiggerButton = modalContainer.querySelector('.scale__control--bigger');
const scaleSmallerButton = modalContainer.querySelector('.scale__control--smaller');
const slider = modalContainer.querySelector('.effect-level__slider');
const sliderEffectList = modalContainer.querySelector('.effects__list');
const sliderEffectLevel = modalContainer.querySelector('.effect-level__value');
const defaultEffect = modalContainer.querySelector('#effect-none');

let currentEffect = Effect.DEFAULT;
let currentFilter = Filter.DEFAULT;
let currentScale = SCALE_DEFAULT;

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number(value),
    from: (value) => Number(value)
  }
});

const changeScalePreview = ({isSmaller = false, isBigger = false} = {}) => {
  if (isSmaller === isBigger) {
    return;
  }
  if (isSmaller && currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
  }
  if (isBigger && currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
  }
  imagePreview.style.transform = `scale(${currentScale / 100})`;
  imageScale.value = `${currentScale}%`;
};

const setFilterValue = ({unit = ''} = {}) => {
  imagePreview.style.filter = `${currentFilter}(${sliderEffectLevel.value}${unit})`;
};

const changeFilterValue = () => {
  switch (currentFilter) {
    case Filter.GRAYSCALE:
      setFilterValue();
      break;
    case Filter.SEPIA:
      setFilterValue();
      break;
    case Filter.INVERT:
      setFilterValue({unit: '%'});
      break;
    case Filter.BLUR:
      setFilterValue({unit: 'px'});
      break;
    case Filter.BRIGHTNESS:
      setFilterValue();
      break;
    default:
      imagePreview.style.filter = Filter.DEFAULT;
  }
};

const getCurrentOptions = () => {
  const [min, max, step] = Option[currentEffect];
  return ({
    range: {
      min,
      max,
    },
    start: max,
    step
  });
};

const setCurrentEffect = () => {
  switch(currentEffect) {
    case Effect.CHROME:
      currentFilter = Filter.GRAYSCALE;
      slider.noUiSlider.updateOptions(getCurrentOptions());
      break;
    case Effect.SEPIA:
      currentFilter = Filter.SEPIA;
      slider.noUiSlider.updateOptions(getCurrentOptions());
      break;
    case Effect.MARVIN:
      currentFilter = Filter.INVERT;
      slider.noUiSlider.updateOptions(getCurrentOptions());
      break;
    case Effect.FOBOS:
      currentFilter = Filter.BLUR;
      slider.noUiSlider.updateOptions(getCurrentOptions());
      break;
    case Effect.HEAT:
      currentFilter = Filter.BRIGHTNESS;
      slider.noUiSlider.updateOptions(getCurrentOptions());
      break;
    default: currentFilter = Filter.DEFAULT;
      slider.noUiSlider.updateOptions(getCurrentOptions());
  }
};

const resetImageStyle = () => {
  currentEffect = Effect.DEFAULT;
  currentFilter = Filter.DEFAULT;
  currentScale = SCALE_DEFAULT;
  imagePreview.style.filter = Filter.DEFAULT;
  imagePreview.style.transform = Filter.DEFAULT;
  imageScale.value = `${SCALE_DEFAULT}%`;
  sliderEffectLevel.value = null;
  defaultEffect.checked = true;
};

slider.noUiSlider.on('update', () => {
  sliderEffectLevel.value = slider.noUiSlider.get();
  changeFilterValue();
});

scaleBiggerButton.addEventListener('click', () => {
  changeScalePreview({isBigger: true});
});

scaleSmallerButton.addEventListener('click', () => {
  changeScalePreview({isSmaller: true});
});

sliderEffectList.addEventListener('change', (evt) => {
  evt.preventDefault();
  const effectItem = evt.target
    .closest('.effects__item')
    .querySelector('input[type="radio"]');

  if (effectItem.checked) {
    currentEffect = effectItem.id;
  }

  if (currentEffect === Effect.DEFAULT) {
    toggleClass(imageEffectLevel, ClassName.HIDDEN, true);
  } else {
    toggleClass(imageEffectLevel, ClassName.HIDDEN, false);
  }

  setCurrentEffect();
});

export { Filter, imagePreview, imageEffectLevel, resetImageStyle };
