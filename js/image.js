import { ClassName } from './utils.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const PREVIEW_DEFAULT = 'img/upload-default-image.jpg';

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

const effectOption = {
  [Effect.CHROME]: [0, 1, 0.1],
  [Effect.SEPIA]: [0, 1, 0.1],
  [Effect.MARVIN]: [0, 100, 1],
  [Effect.FOBOS]: [0, 3, 0.1],
  [Effect.HEAT]: [1, 3, 0.1],
  [Effect.DEFAULT]: [0, 100, 1],
};

const effectSetting = {
  [Effect.CHROME]: {style: Filter.GRAYSCALE, unit: ''},
  [Effect.SEPIA]: {style: Filter.SEPIA, unit: ''},
  [Effect.MARVIN]: {style: Filter.INVERT, unit: '%'},
  [Effect.FOBOS]: {style: Filter.BLUR, unit: 'px'},
  [Effect.HEAT]: {style: Filter.BRIGHTNESS, unit: ''},
  [Effect.DEFAULT]: {style: Filter.DEFAULT, unit: ''},
};

const modalContainer = document.querySelector('.img-upload');
const imagePreview = modalContainer.querySelector('.img-upload__preview > img');
const imageEffectLevel = modalContainer.querySelector('.img-upload__effect-level');
const slider = modalContainer.querySelector('.effect-level__slider');
const sliderEffectList = modalContainer.querySelector('.effects__list');
const sliderEffectLevel = modalContainer.querySelector('.effect-level__value');
const effectsPreview = modalContainer.querySelectorAll('.effects__preview');
const defaultEffect = modalContainer.querySelector('#effect-none');

let currentEffect = Effect.DEFAULT;
let currentFilter = Filter.DEFAULT;

noUiSlider.create(slider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number(value),
    from: (value) => Number(value)
  }
});

const setEffectsPreview = () => {
  effectsPreview.forEach((effect) => {
    effect.style.backgroundImage = `url('${imagePreview.src}')`;
  });
};

const loadImagePreview = (imageInput) => {
  const imageFile = imageInput.files[0];
  const imageFileName = imageFile.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => imageFileName.endsWith(item));
  if (matches) {
    imagePreview.src = URL.createObjectURL(imageFile);
  } else {
    imagePreview.src = PREVIEW_DEFAULT;
  }
  setEffectsPreview();
};

const getCurrentOptions = () => {
  const [min, max, step] = effectOption[currentEffect];
  return ({ range: { min, max }, start: max, step });
};

const setCurrentFilter = () => {
  currentFilter = effectSetting[currentEffect].style;
  slider.noUiSlider.updateOptions(getCurrentOptions());
};

const setSliderShown = () => {
  if (currentEffect === Effect.DEFAULT) {
    imagePreview.style.filter = Filter.DEFAULT;
    imageEffectLevel.classList.add(ClassName.HIDDEN);
  } else {
    imageEffectLevel.classList.remove(ClassName.HIDDEN);
  }
};

const resetImageStyle = () => {
  currentEffect = Effect.DEFAULT;
  currentFilter = Filter.DEFAULT;
  imagePreview.style.filter = Filter.DEFAULT;
  imagePreview.style.transform = Filter.DEFAULT;
  sliderEffectLevel.value = null;
  defaultEffect.checked = true;
};

slider.noUiSlider.on('update', () => {
  sliderEffectLevel.value = slider.noUiSlider.get();
  imagePreview.style.filter = `${currentFilter}(${sliderEffectLevel.value}${effectSetting[currentEffect].unit})`;
});

sliderEffectList.addEventListener('change', (evt) => {
  const effectItem = evt.target.closest('input[type="radio"]');
  if (effectItem.checked) {
    currentEffect = effectItem.id;
  }
  setSliderShown();
  setCurrentFilter();
});

export { setSliderShown, resetImageStyle, loadImagePreview };
