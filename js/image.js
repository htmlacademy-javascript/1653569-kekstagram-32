import { ClassName, toggleClass } from './utils';

const MIN_IMAGE_ZOOM_IN = 100;
const MAX_IMAGE_ZOOM_OUT = 25;
const IMAGE_ZOOM_STEP = 25;
const IMAGE_ZOOM_DEFAULT = 100;

const Effect = {
  'CHROME': 'effect-chrome',
  'SEPIA': 'effect-sepia',
  'MARVIN': 'effect-marvin',
  'FOBOS': 'effect-phobos',
  'HEAT': 'effect-heat',
  'DEFAULT': 'effect-none'
};

const Filter = {
  'GRAYSCALE': 'grayscale',
  'SEPIA': 'sepia',
  'INVERT': 'invert',
  'BLUR': 'blur',
  'BRIGHTNESS': 'brightness',
  'DEFAULT': 'none'
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
const imageZoomInButton = modalContainer.querySelector('.scale__control--bigger');
const imageZoomOutButton = modalContainer.querySelector('.scale__control--smaller');
const slider = modalContainer.querySelector('.effect-level__slider');
const sliderEffectList = modalContainer.querySelector('.effects__list');
const sliderEffectLevel = modalContainer.querySelector('.effect-level__value');

let currentEffect = Effect.DEFAULT;
let currentFilter = Filter.DEFAULT;
let currentScale = IMAGE_ZOOM_DEFAULT;

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

const changeZoomPreview = ({isZoomIn = false, isZoomOut = false} = {}) => {
  currentScale = parseInt(imageScale.value, 10);
  if (isZoomIn && currentScale < MIN_IMAGE_ZOOM_IN) {
    imageScale.value = `${currentScale + IMAGE_ZOOM_STEP}%`;
  }
  if (isZoomOut && currentScale > MAX_IMAGE_ZOOM_OUT) {
    imageScale.value = `${currentScale - IMAGE_ZOOM_STEP}%`;
  }
  imagePreview.style.transform = `scale(${parseInt(imageScale.value, 10) / 100})`;
};

const changeFilterValue = () => {
  switch (currentFilter) {
    case Filter.GRAYSCALE:
      imagePreview.style.filter = `${currentFilter}(${sliderEffectLevel.value})`;
      break;
    case Filter.SEPIA:
      imagePreview.style.filter = `${currentFilter}(${sliderEffectLevel.value})`;
      break;
    case Filter.INVERT:
      imagePreview.style.filter = `${currentFilter}(${sliderEffectLevel.value}%)`;
      break;
    case Filter.BLUR:
      imagePreview.style.filter = `${currentFilter}(${sliderEffectLevel.value}px)`;
      break;
    case Filter.BRIGHTNESS:
      imagePreview.style.filter = `${currentFilter}(${sliderEffectLevel.value})`;
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

const resetScale = () => {
  imageScale.value = IMAGE_ZOOM_DEFAULT;
};

slider.noUiSlider.on('update', () => {
  sliderEffectLevel.value = slider.noUiSlider.get();
  changeFilterValue();
});

imageZoomInButton.addEventListener('click', () => {
  changeZoomPreview({isZoomIn: true});
});

imageZoomOutButton.addEventListener('click', () => {
  changeZoomPreview({isZoomOut: true});
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
});

export { Filter, imagePreview, imageEffectLevel, sliderEffectLevel, resetScale };
