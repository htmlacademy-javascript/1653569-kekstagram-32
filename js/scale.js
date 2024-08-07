const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

let currentScale = SCALE_DEFAULT;

const modalContainer = document.querySelector('.img-upload');
const imagePreview = modalContainer.querySelector('.img-upload__preview > img');
const imageScale = modalContainer.querySelector('.scale__control--value');
const scaleSmallerButton = modalContainer.querySelector('.scale__control--smaller');
const scaleBiggerButton = modalContainer.querySelector('.scale__control--bigger');

const resetImageScale = () => {
  currentScale = SCALE_DEFAULT;
  imageScale.value = `${SCALE_DEFAULT}%`;
};

const changeScalePreview = () => {
  imagePreview.style.transform = `scale(${currentScale / 100})`;
  imageScale.value = `${currentScale}%`;
};

const onScaleSmallerButtonClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    changeScalePreview();
  }
};

const onScaleBiggerButtonClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    changeScalePreview();
  }
};

scaleSmallerButton.addEventListener('click', onScaleSmallerButtonClick);
scaleBiggerButton.addEventListener('click', onScaleBiggerButtonClick);

export { resetImageScale };
